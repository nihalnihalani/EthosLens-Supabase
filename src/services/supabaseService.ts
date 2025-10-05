import { supabase } from '../config/supabase';
import type { 
  Interaction, 
  Violation, 
  AuditLog, 
  Policy, 
  Agent,
  Feedback 
} from '../types';

/**
 * Supabase Service Layer
 * Provides methods to interact with Supabase database
 */

// ============================================
// INTERACTIONS
// ============================================

export async function createInteraction(data: {
  prompt: string;
  response?: string;
  agent_id?: string;
  user_id?: string;
  session_id?: string;
  safety_score?: number;
  compliance_status?: string;
  processing_time_ms?: number;
  metadata?: any;
}): Promise<Interaction | null> {
  const { data: interaction, error } = await supabase
    .from('interactions')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error creating interaction:', error);
    return null;
  }

  return interaction as Interaction;
}

export async function getInteractions(limit = 50, offset = 0): Promise<Interaction[]> {
  const { data, error } = await supabase
    .from('interactions')
    .select(`
      *,
      agents(id, name, type)
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching interactions:', error);
    return [];
  }

  return data as Interaction[];
}

export async function getInteractionById(id: string): Promise<Interaction | null> {
  const { data, error } = await supabase
    .from('interactions')
    .select(`
      *,
      agents(id, name, type),
      violations(*),
      policy_checks(*),
      feedback(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching interaction:', error);
    return null;
  }

  return data as Interaction;
}

export async function updateInteraction(
  id: string,
  updates: Partial<Interaction>
): Promise<Interaction | null> {
  const { data, error } = await supabase
    .from('interactions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating interaction:', error);
    return null;
  }

  return data as Interaction;
}

// ============================================
// VIOLATIONS
// ============================================

export async function createViolation(data: {
  interaction_id: string;
  policy_id: string;
  severity: string;
  description?: string;
  detected_by_agent_id?: string;
  metadata?: any;
}): Promise<Violation | null> {
  const { data: violation, error } = await supabase
    .from('violations')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error creating violation:', error);
    return null;
  }

  return violation as Violation;
}

export async function getViolations(
  filters?: {
    is_resolved?: boolean;
    severity?: string;
    limit?: number;
  }
): Promise<Violation[]> {
  let query = supabase
    .from('violations')
    .select(`
      *,
      interactions(id, prompt, response),
      policies(id, name, severity),
      agents:detected_by_agent_id(id, name, type)
    `)
    .order('detected_at', { ascending: false });

  if (filters?.is_resolved !== undefined) {
    query = query.eq('is_resolved', filters.is_resolved);
  }

  if (filters?.severity) {
    query = query.eq('severity', filters.severity);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching violations:', error);
    return [];
  }

  return data as Violation[];
}

export async function resolveViolation(
  id: string,
  resolved_by: string,
  resolution_notes?: string
): Promise<Violation | null> {
  const { data, error } = await supabase
    .from('violations')
    .update({
      is_resolved: true,
      resolved_at: new Date().toISOString(),
      resolved_by,
      resolution_notes
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error resolving violation:', error);
    return null;
  }

  return data as Violation;
}

// ============================================
// AUDIT LOGS
// ============================================

export async function createAuditLog(data: {
  interaction_id?: string;
  agent_id?: string;
  action: string;
  details?: any;
  level?: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
}): Promise<AuditLog | null> {
  const { data: log, error } = await supabase
    .from('audit_logs')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error creating audit log:', error);
    return null;
  }

  return log as AuditLog;
}

export async function getAuditLogs(
  filters?: {
    level?: string;
    action?: string;
    limit?: number;
    offset?: number;
  }
): Promise<AuditLog[]> {
  let query = supabase
    .from('audit_logs')
    .select(`
      *,
      interactions(id, prompt),
      agents(id, name, type)
    `)
    .order('created_at', { ascending: false });

  if (filters?.level) {
    query = query.eq('level', filters.level);
  }

  if (filters?.action) {
    query = query.eq('action', filters.action);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching audit logs:', error);
    return [];
  }

  return data as AuditLog[];
}

// ============================================
// POLICIES
// ============================================

export async function getPolicies(active_only = true): Promise<Policy[]> {
  let query = supabase
    .from('policies')
    .select('*')
    .order('severity', { ascending: false });

  if (active_only) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching policies:', error);
    return [];
  }

  return data as Policy[];
}

export async function createPolicy(data: {
  name: string;
  description?: string;
  category: string;
  rules: any;
  severity: string;
  is_active?: boolean;
}): Promise<Policy | null> {
  const { data: policy, error } = await supabase
    .from('policies')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error creating policy:', error);
    return null;
  }

  return policy as Policy;
}

export async function updatePolicy(
  id: string,
  updates: Partial<Policy>
): Promise<Policy | null> {
  const { data, error } = await supabase
    .from('policies')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating policy:', error);
    return null;
  }

  return data as Policy;
}

// ============================================
// AGENTS
// ============================================

export async function getAgents(active_only = true): Promise<Agent[]> {
  let query = supabase
    .from('agents')
    .select('*')
    .order('performance_score', { ascending: false });

  if (active_only) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching agents:', error);
    return [];
  }

  return data as Agent[];
}

export async function updateAgentStatus(
  id: string,
  is_active: boolean
): Promise<Agent | null> {
  const { data, error } = await supabase
    .from('agents')
    .update({ 
      is_active,
      last_active_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating agent status:', error);
    return null;
  }

  return data as Agent;
}

// ============================================
// FEEDBACK
// ============================================

export async function createFeedback(data: {
  interaction_id: string;
  user_id?: string;
  rating?: number;
  comment?: string;
  feedback_type?: string;
  is_helpful?: boolean;
  metadata?: any;
}): Promise<Feedback | null> {
  const { data: feedback, error } = await supabase
    .from('feedback')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error creating feedback:', error);
    return null;
  }

  return feedback as Feedback;
}

// ============================================
// STATISTICS & ANALYTICS
// ============================================

export async function getStatistics(days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  // Get total interactions
  const { count: totalInteractions } = await supabase
    .from('interactions')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startDate.toISOString());

  // Get compliant interactions
  const { count: compliantInteractions } = await supabase
    .from('interactions')
    .select('*', { count: 'exact', head: true })
    .eq('compliance_status', 'compliant')
    .gte('created_at', startDate.toISOString());

  // Get active violations
  const { count: activeViolations } = await supabase
    .from('violations')
    .select('*', { count: 'exact', head: true })
    .eq('is_resolved', false)
    .gte('detected_at', startDate.toISOString());

  // Get average safety score
  const { data: safetyData } = await supabase
    .from('interactions')
    .select('safety_score')
    .gte('created_at', startDate.toISOString());

  const avgSafetyScore = safetyData && safetyData.length > 0
    ? safetyData.reduce((acc, curr) => acc + (curr.safety_score || 0), 0) / safetyData.length
    : 0;

  // Get average processing time
  const { data: timeData } = await supabase
    .from('interactions')
    .select('processing_time_ms')
    .gte('created_at', startDate.toISOString())
    .not('processing_time_ms', 'is', null);

  const avgProcessingTime = timeData && timeData.length > 0
    ? timeData.reduce((acc, curr) => acc + (curr.processing_time_ms || 0), 0) / timeData.length
    : 0;

  return {
    totalInteractions: totalInteractions || 0,
    compliantInteractions: compliantInteractions || 0,
    activeViolations: activeViolations || 0,
    complianceRate: totalInteractions 
      ? ((compliantInteractions || 0) / totalInteractions * 100)
      : 0,
    avgSafetyScore: parseFloat(avgSafetyScore.toFixed(2)),
    avgProcessingTime: parseFloat(avgProcessingTime.toFixed(2))
  };
}

export async function getViolationsByCategory(days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('violations')
    .select(`
      severity,
      policies(category)
    `)
    .gte('detected_at', startDate.toISOString());

  if (error) {
    console.error('Error fetching violation categories:', error);
    return [];
  }

  // Group by category
  const grouped = data.reduce((acc: any, violation: any) => {
    const category = violation.policies?.category || 'unknown';
    if (!acc[category]) {
      acc[category] = { category, count: 0, severity: {} };
    }
    acc[category].count++;
    acc[category].severity[violation.severity] = (acc[category].severity[violation.severity] || 0) + 1;
    return acc;
  }, {});

  return Object.values(grouped);
}

// ============================================
// REALTIME SUBSCRIPTIONS
// ============================================

export function subscribeToInteractions(callback: (payload: any) => void) {
  return supabase
    .channel('interactions')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'interactions' },
      callback
    )
    .subscribe();
}

export function subscribeToViolations(callback: (payload: any) => void) {
  return supabase
    .channel('violations')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'violations' },
      callback
    )
    .subscribe();
}

export function subscribeToAuditLogs(callback: (payload: any) => void) {
  return supabase
    .channel('audit_logs')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'audit_logs' },
      callback
    )
    .subscribe();
}

export default {
  // Interactions
  createInteraction,
  getInteractions,
  getInteractionById,
  updateInteraction,
  
  // Violations
  createViolation,
  getViolations,
  resolveViolation,
  
  // Audit Logs
  createAuditLog,
  getAuditLogs,
  
  // Policies
  getPolicies,
  createPolicy,
  updatePolicy,
  
  // Agents
  getAgents,
  updateAgentStatus,
  
  // Feedback
  createFeedback,
  
  // Statistics
  getStatistics,
  getViolationsByCategory,
  
  // Realtime
  subscribeToInteractions,
  subscribeToViolations,
  subscribeToAuditLogs
};
