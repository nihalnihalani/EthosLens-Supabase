-- Seed data for EthosLens development

-- Insert sample policies
INSERT INTO policies (name, description, category, rules, severity, is_active) VALUES
  ('Content Safety Policy', 'Ensures all AI responses are safe and appropriate', 'safety', '{"prohibited_topics": ["violence", "hate_speech", "explicit_content"], "max_response_length": 5000}', 'critical', true),
  ('Data Privacy Policy', 'Protects user data and ensures GDPR compliance', 'privacy', '{"anonymize_pii": true, "data_retention_days": 90, "consent_required": true}', 'critical', true),
  ('Response Quality Policy', 'Maintains high quality in AI responses', 'quality', '{"min_confidence_score": 0.7, "require_sources": true, "max_response_time_ms": 5000}', 'high', true),
  ('Bias Detection Policy', 'Detects and prevents biased responses', 'fairness', '{"check_gender_bias": true, "check_racial_bias": true, "check_age_bias": true}', 'high', true),
  ('Transparency Policy', 'Ensures AI responses are transparent and explainable', 'transparency', '{"require_reasoning": true, "show_confidence": true, "cite_sources": true}', 'medium', true);

-- Insert sample agents
INSERT INTO agents (name, type, description, config, is_active, performance_score) VALUES
  ('Response Agent', 'response', 'Generates AI responses to user queries', '{"model": "gpt-4", "temperature": 0.7, "max_tokens": 2000}', true, 0.92),
  ('Verifier Agent', 'verifier', 'Verifies responses against governance policies', '{"strict_mode": true, "check_all_policies": true}', true, 0.88),
  ('Policy Enforcer', 'enforcer', 'Enforces governance policies and blocks violations', '{"auto_block": true, "threshold": 0.8}', true, 0.95),
  ('Audit Logger', 'logger', 'Logs all interactions and policy checks', '{"log_level": "detailed", "retention_days": 90}', true, 0.99),
  ('Feedback Agent', 'feedback', 'Collects and analyzes user feedback', '{"auto_improve": true, "sentiment_analysis": true}', true, 0.85);

-- Insert sample interactions (from last 7 days)
INSERT INTO interactions (prompt, response, agent_id, safety_score, compliance_status, processing_time_ms, metadata) 
SELECT 
  'Sample prompt ' || i,
  'Sample response ' || i,
  (SELECT id FROM agents ORDER BY RANDOM() LIMIT 1),
  0.7 + (RANDOM() * 0.3),
  CASE WHEN RANDOM() < 0.9 THEN 'compliant' ELSE 'flagged' END,
  50 + (RANDOM() * 450)::int,
  jsonb_build_object(
    'source', 'web',
    'user_id', 'user_' || (RANDOM() * 100)::int,
    'session_id', 'session_' || (RANDOM() * 50)::int
  )
FROM generate_series(1, 50) i;

-- Insert sample violations
INSERT INTO violations (interaction_id, policy_id, severity, description, detected_by_agent_id, is_resolved, resolution_notes)
SELECT 
  i.id,
  (SELECT id FROM policies ORDER BY RANDOM() LIMIT 1),
  (ARRAY['low', 'medium', 'high', 'critical'])[floor(random() * 4 + 1)],
  'Automated violation detection - ' || (ARRAY['Content safety check failed', 'Privacy concern detected', 'Bias detected in response', 'Quality threshold not met'])[floor(random() * 4 + 1)],
  (SELECT id FROM agents WHERE type = 'verifier' LIMIT 1),
  RANDOM() < 0.7,
  CASE WHEN RANDOM() < 0.7 THEN 'Violation reviewed and resolved' ELSE NULL END
FROM interactions i
WHERE i.compliance_status = 'flagged'
LIMIT 20;

-- Insert sample audit logs
INSERT INTO audit_logs (interaction_id, agent_id, action, details, level)
SELECT 
  i.id,
  (SELECT id FROM agents ORDER BY RANDOM() LIMIT 1),
  (ARRAY['check', 'verify', 'enforce', 'log', 'feedback'])[floor(random() * 5 + 1)],
  jsonb_build_object(
    'check_type', 'automated',
    'result', CASE WHEN RANDOM() < 0.9 THEN 'passed' ELSE 'failed' END,
    'duration_ms', (10 + RANDOM() * 90)::int
  ),
  (ARRAY['info', 'warning', 'error'])[floor(random() * 3 + 1)]
FROM interactions i
LIMIT 100;

-- Insert sample feedback
INSERT INTO feedback (interaction_id, rating, comment, feedback_type, is_helpful)
SELECT 
  i.id,
  1 + (RANDOM() * 4)::int,
  (ARRAY[
    'Great response, very helpful!',
    'Could be more detailed',
    'Exactly what I needed',
    'Not quite what I was looking for',
    'Excellent explanation'
  ])[floor(random() * 5 + 1)],
  (ARRAY['quality', 'accuracy', 'relevance', 'safety'])[floor(random() * 4 + 1)],
  RANDOM() < 0.8
FROM interactions i
WHERE RANDOM() < 0.3
LIMIT 30;

-- Update statistics
UPDATE interactions SET 
  created_at = NOW() - (RANDOM() * interval '7 days');

UPDATE violations SET 
  detected_at = (SELECT created_at FROM interactions WHERE id = interaction_id),
  resolved_at = CASE 
    WHEN is_resolved THEN (SELECT created_at FROM interactions WHERE id = interaction_id) + (RANDOM() * interval '24 hours')
    ELSE NULL 
  END;

UPDATE audit_logs SET 
  created_at = (SELECT created_at FROM interactions WHERE id = interaction_id);
