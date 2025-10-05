-- EthosLens Supabase Database Schema
-- This migration creates all necessary tables for the AI governance platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- POLICIES TABLE
-- Stores governance policies that agents must comply with
-- ============================================
CREATE TABLE IF NOT EXISTS policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  category VARCHAR(100) NOT NULL, -- safety, privacy, quality, fairness, transparency
  rules JSONB NOT NULL DEFAULT '{}',
  severity VARCHAR(50) NOT NULL DEFAULT 'medium', -- low, medium, high, critical
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  version INTEGER DEFAULT 1
);

CREATE INDEX idx_policies_category ON policies(category);
CREATE INDEX idx_policies_severity ON policies(severity);
CREATE INDEX idx_policies_active ON policies(is_active);
CREATE INDEX idx_policies_rules_gin ON policies USING gin(rules);

-- ============================================
-- AGENTS TABLE
-- Stores AI agents and their configurations
-- ============================================
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL, -- response, verifier, enforcer, logger, feedback
  description TEXT,
  config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  performance_score DECIMAL(3,2) DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_agents_type ON agents(type);
CREATE INDEX idx_agents_active ON agents(is_active);
CREATE INDEX idx_agents_performance ON agents(performance_score DESC);

-- ============================================
-- INTERACTIONS TABLE
-- Stores all AI interactions with prompts and responses
-- ============================================
CREATE TABLE IF NOT EXISTS interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt TEXT NOT NULL,
  response TEXT,
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  user_id UUID, -- Future: link to auth.users
  session_id VARCHAR(255),
  safety_score DECIMAL(3,2) DEFAULT 0.00,
  compliance_status VARCHAR(50) DEFAULT 'pending', -- compliant, flagged, blocked, reviewing
  processing_time_ms INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_interactions_agent ON interactions(agent_id);
CREATE INDEX idx_interactions_user ON interactions(user_id);
CREATE INDEX idx_interactions_status ON interactions(compliance_status);
CREATE INDEX idx_interactions_created ON interactions(created_at DESC);
CREATE INDEX idx_interactions_safety ON interactions(safety_score);
CREATE INDEX idx_interactions_session ON interactions(session_id);
CREATE INDEX idx_interactions_prompt_trgm ON interactions USING gin(prompt gin_trgm_ops);

-- ============================================
-- VIOLATIONS TABLE
-- Stores policy violations detected in interactions
-- ============================================
CREATE TABLE IF NOT EXISTS violations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  interaction_id UUID NOT NULL REFERENCES interactions(id) ON DELETE CASCADE,
  policy_id UUID NOT NULL REFERENCES policies(id) ON DELETE CASCADE,
  severity VARCHAR(50) NOT NULL, -- low, medium, high, critical
  description TEXT,
  detected_by_agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  is_resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID,
  resolution_notes TEXT,
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_violations_interaction ON violations(interaction_id);
CREATE INDEX idx_violations_policy ON violations(policy_id);
CREATE INDEX idx_violations_severity ON violations(severity);
CREATE INDEX idx_violations_resolved ON violations(is_resolved);
CREATE INDEX idx_violations_detected ON violations(detected_at DESC);
CREATE INDEX idx_violations_agent ON violations(detected_by_agent_id);

-- ============================================
-- AUDIT_LOGS TABLE
-- Comprehensive audit trail of all system actions
-- ============================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  interaction_id UUID REFERENCES interactions(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  details JSONB DEFAULT '{}',
  level VARCHAR(50) DEFAULT 'info', -- info, warning, error, critical
  user_id UUID,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_interaction ON audit_logs(interaction_id);
CREATE INDEX idx_audit_logs_agent ON audit_logs(agent_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_level ON audit_logs(level);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);

-- ============================================
-- FEEDBACK TABLE
-- Stores user feedback on AI interactions
-- ============================================
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  interaction_id UUID NOT NULL REFERENCES interactions(id) ON DELETE CASCADE,
  user_id UUID,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  feedback_type VARCHAR(100), -- quality, accuracy, relevance, safety
  is_helpful BOOLEAN,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_feedback_interaction ON feedback(interaction_id);
CREATE INDEX idx_feedback_user ON feedback(user_id);
CREATE INDEX idx_feedback_rating ON feedback(rating);
CREATE INDEX idx_feedback_type ON feedback(feedback_type);
CREATE INDEX idx_feedback_created ON feedback(created_at DESC);

-- ============================================
-- POLICY_CHECKS TABLE
-- Tracks individual policy checks performed on interactions
-- ============================================
CREATE TABLE IF NOT EXISTS policy_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  interaction_id UUID NOT NULL REFERENCES interactions(id) ON DELETE CASCADE,
  policy_id UUID NOT NULL REFERENCES policies(id) ON DELETE CASCADE,
  passed BOOLEAN NOT NULL,
  score DECIMAL(3,2),
  details JSONB DEFAULT '{}',
  checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_policy_checks_interaction ON policy_checks(interaction_id);
CREATE INDEX idx_policy_checks_policy ON policy_checks(policy_id);
CREATE INDEX idx_policy_checks_passed ON policy_checks(passed);
CREATE INDEX idx_policy_checks_checked ON policy_checks(checked_at DESC);

-- ============================================
-- AGENT_METRICS TABLE
-- Stores performance metrics for agents over time
-- ============================================
CREATE TABLE IF NOT EXISTS agent_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  metric_type VARCHAR(100) NOT NULL, -- response_time, accuracy, throughput, error_rate
  value DECIMAL(10,2) NOT NULL,
  metadata JSONB DEFAULT '{}',
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_agent_metrics_agent ON agent_metrics(agent_id);
CREATE INDEX idx_agent_metrics_type ON agent_metrics(metric_type);
CREATE INDEX idx_agent_metrics_recorded ON agent_metrics(recorded_at DESC);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Update updated_at timestamp automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_policies_updated_at BEFORE UPDATE ON policies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interactions_updated_at BEFORE UPDATE ON interactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate compliance rate
CREATE OR REPLACE FUNCTION calculate_compliance_rate(days INTEGER DEFAULT 7)
RETURNS DECIMAL AS $$
DECLARE
    total_interactions INTEGER;
    compliant_interactions INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_interactions
    FROM interactions
    WHERE created_at >= NOW() - (days || ' days')::INTERVAL;
    
    SELECT COUNT(*) INTO compliant_interactions
    FROM interactions
    WHERE created_at >= NOW() - (days || ' days')::INTERVAL
    AND compliance_status = 'compliant';
    
    IF total_interactions = 0 THEN
        RETURN 0;
    END IF;
    
    RETURN (compliant_interactions::DECIMAL / total_interactions::DECIMAL) * 100;
END;
$$ LANGUAGE plpgsql;

-- Function to get agent performance summary
CREATE OR REPLACE FUNCTION get_agent_performance(agent_uuid UUID)
RETURNS TABLE (
    total_interactions BIGINT,
    avg_processing_time DECIMAL,
    avg_safety_score DECIMAL,
    compliance_rate DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::BIGINT,
        AVG(processing_time_ms)::DECIMAL(10,2),
        AVG(safety_score)::DECIMAL(3,2),
        (COUNT(*) FILTER (WHERE compliance_status = 'compliant')::DECIMAL / COUNT(*)::DECIMAL * 100)::DECIMAL(5,2)
    FROM interactions
    WHERE agent_id = agent_uuid;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- Enable RLS on all tables (configure policies as needed)
-- ============================================

ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_metrics ENABLE ROW LEVEL SECURITY;

-- Public read access for policies (can be restricted later)
CREATE POLICY "Public policies are viewable by everyone"
ON policies FOR SELECT
USING (is_active = true);

-- Public read access for agents
CREATE POLICY "Active agents are viewable by everyone"
ON agents FOR SELECT
USING (is_active = true);

-- Users can view their own interactions
CREATE POLICY "Users can view own interactions"
ON interactions FOR SELECT
USING (true); -- Adjust based on auth.uid() when auth is implemented

-- Public read access for audit logs (can be restricted)
CREATE POLICY "Audit logs are viewable"
ON audit_logs FOR SELECT
USING (true);

-- ============================================
-- INITIAL DATA
-- ============================================

COMMENT ON TABLE policies IS 'Governance policies that define acceptable AI behavior';
COMMENT ON TABLE agents IS 'AI agents that perform various governance tasks';
COMMENT ON TABLE interactions IS 'All AI interactions including prompts and responses';
COMMENT ON TABLE violations IS 'Policy violations detected in interactions';
COMMENT ON TABLE audit_logs IS 'Comprehensive audit trail of all system actions';
COMMENT ON TABLE feedback IS 'User feedback on AI interactions';
COMMENT ON TABLE policy_checks IS 'Individual policy check results';
COMMENT ON TABLE agent_metrics IS 'Performance metrics for agents';
