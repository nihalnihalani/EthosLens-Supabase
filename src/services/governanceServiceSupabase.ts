import { LLMInteraction, Violation } from '../types';
import { agents } from '../agents';
import { inkeepAgentsService } from './inkeepAgentsService';
import supabaseService from './supabaseService';
import { createAuditLog } from './supabaseService';
/**
 * Enhanced governance service with Supabase integration
 * Provides real-time data persistence and analytics
 */
export class GovernanceServiceSupabase {
  private static instance: GovernanceServiceSupabase;
  private useInkeepAgents: boolean;
  private inkeepAvailable: boolean = false;
  private useSupabase: boolean = true;

  constructor() {
    this.useInkeepAgents = import.meta.env.VITE_USE_INKEEP_AGENTS === 'true';
    this.useSupabase = import.meta.env.VITE_SUPABASE_URL ? true : false;
    this.checkInkeepAvailability();
    
    if (this.useSupabase) {
      console.log('✅ Supabase integration enabled');
    }
  }

  static getInstance(): GovernanceServiceSupabase {
    if (!GovernanceServiceSupabase.instance) {
      GovernanceServiceSupabase.instance = new GovernanceServiceSupabase();
    }
    return GovernanceServiceSupabase.instance;
  }

  private async checkInkeepAvailability() {
    this.inkeepAvailable = await inkeepAgentsService.isAvailable();
    console.log(`🤖 Inkeep agents ${this.inkeepAvailable ? 'available' : 'not available'}`);
  }

  private shouldUseInkeep(): boolean {
    return this.useInkeepAgents && this.inkeepAvailable;
  }

  /**
   * Process an AI interaction through the governance system with Supabase persistence
   */
  async processInteraction(input: string, output: string, context?: any): Promise<LLMInteraction> {
    const interactionId = `interaction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();
    
    console.log(`🛡️ Processing interaction ${interactionId} with ${this.shouldUseInkeep() ? 'Inkeep' : 'legacy'} agents`);

    const interaction: LLMInteraction = {
      id: interactionId,
      input,
      output,
      timestamp: new Date(),
      status: 'pending',
      severity: 'low',
      violations: [],
      agentActions: []
    };

    try {
      // Create interaction record in Supabase
      if (this.useSupabase) {
        const agentId = context?.agentId || (await supabaseService.getAgents(true))[0]?.id;
        
        await supabaseService.createInteraction({
          prompt: input,
          response: output,
          agent_id: agentId,
          session_id: context?.sessionId || `session_${Date.now()}`,
          compliance_status: 'pending',
          metadata: { context }
        });

        // Log the start of processing
        await createAuditLog({
          action: 'process_interaction_start',
          details: {
            interaction_id: interactionId,
            input_length: input.length,
            output_length: output.length
          },
          level: 'info'
        });
      }

      if (this.shouldUseInkeep()) {
        return await this.processWithInkeepAgents(interaction, context);
      } else {
        return await this.processWithLegacyAgents(interaction);
      }
    } catch (error) {
      console.error('Error processing interaction:', error);
      
      // Log error to Supabase
      if (this.useSupabase) {
        await createAuditLog({
          action: 'process_interaction_error',
          details: {
            interaction_id: interactionId,
            error: error instanceof Error ? error.message : 'Unknown error'
          },
          level: 'error'
        });
      }

      interaction.status = 'error';
      return interaction;
    } finally {
      const processingTime = Date.now() - startTime;
      
      // Update interaction with final results in Supabase
      if (this.useSupabase) {
        await this.persistInteractionResults(interaction, processingTime);
      }
    }
  }

  /**
   * Process with Inkeep agents
   */
  private async processWithInkeepAgents(
    interaction: LLMInteraction,
    context?: any
  ): Promise<LLMInteraction> {
    try {
      // Use the appropriate graph based on complexity
      const graphType = context?.complexity || 'basic';
      const result = await inkeepAgentsService.runGovernanceCheck(
        interaction.input,
        interaction.output,
        graphType
      );

      interaction.status = result.status;
      interaction.severity = result.severity;
      interaction.violations = result.violations;
      interaction.agentActions = result.agentActions;

      // Store violations in Supabase
      if (this.useSupabase && result.violations.length > 0) {
        for (const violation of result.violations) {
          await this.persistViolation(interaction.id, violation);
        }
      }

      return interaction;
    } catch (error) {
      console.error('Error processing with Inkeep agents:', error);
      return this.processWithLegacyAgents(interaction);
    }
  }

  /**
   * Process with legacy agents
   */
  private async processWithLegacyAgents(
    interaction: LLMInteraction
  ): Promise<LLMInteraction> {
    const agentPromises = agents.map(async (agent) => {
      try {
        const action = await agent.process(interaction);
        interaction.agentActions.push(action);

        // Log agent action to Supabase
        if (this.useSupabase) {
          const agentRecord = await supabaseService.getAgents();
          const agentId = agentRecord.find(a => a.name === agent.name)?.id;
          
          await createAuditLog({
            agent_id: agentId,
            action: `agent_${agent.type}_processed`,
            details: {
              interaction_id: interaction.id,
              agent_name: agent.name,
              action_type: action.type,
              severity: action.severity
            },
            level: this.getSeverityLogLevel(action.severity)
          });
        }

        if (action.type === 'violation') {
          const violation: Violation = {
            id: `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            policyId: action.policyId || 'unknown',
            description: action.reason,
            timestamp: new Date(),
            severity: action.severity,
            resolved: false
          };
          interaction.violations.push(violation);

          // Store violation in Supabase
          if (this.useSupabase) {
            await this.persistViolation(interaction.id, violation);
          }
        }

        return action;
      } catch (error) {
        console.error(`Error in agent ${agent.name}:`, error);
        return null;
      }
    });

    await Promise.all(agentPromises);

    // Determine final status
    if (interaction.violations.length > 0) {
      const maxSeverity = this.getMaxSeverity(
        interaction.violations.map(v => v.severity)
      );
      interaction.severity = maxSeverity;
      interaction.status = maxSeverity === 'critical' ? 'blocked' : 'flagged';
    } else {
      interaction.status = 'compliant';
    }

    return interaction;
  }

  /**
   * Persist interaction results to Supabase
   */
  private async persistInteractionResults(
    interaction: LLMInteraction,
    processingTimeMs: number
  ): Promise<void> {
    try {
      const safetyScore = this.calculateSafetyScore(interaction);
      
      await supabaseService.createInteraction({
        prompt: interaction.input,
        response: interaction.output,
        safety_score: safetyScore,
        compliance_status: interaction.status,
        processing_time_ms: processingTimeMs,
        metadata: {
          violations_count: interaction.violations.length,
          agent_actions_count: interaction.agentActions.length,
          severity: interaction.severity
        }
      });

      // Log completion
      await createAuditLog({
        action: 'process_interaction_complete',
        details: {
          interaction_id: interaction.id,
          status: interaction.status,
          violations: interaction.violations.length,
          processing_time_ms: processingTimeMs
        },
        level: interaction.status === 'compliant' ? 'info' : 'warning'
      });
    } catch (error) {
      console.error('Error persisting interaction results:', error);
    }
  }

  /**
   * Persist violation to Supabase
   */
  private async persistViolation(
    interactionId: string,
    violation: Violation
  ): Promise<void> {
    try {
      // Get policy ID from Supabase
      const policies = await supabaseService.getPolicies();
      const policy = policies.find(p => p.id === violation.policyId) || policies[0];

      if (!policy) {
        console.warn('No policies found in database');
        return;
      }

      // Get verifier agent
      const agents = await supabaseService.getAgents();
      const verifierAgent = agents.find(a => a.type === 'verifier');

      await supabaseService.createViolation({
        interaction_id: interactionId,
        policy_id: policy.id,
        severity: violation.severity,
        description: violation.description,
        detected_by_agent_id: verifierAgent?.id,
        metadata: {
          timestamp: violation.timestamp,
          resolved: violation.resolved
        }
      });
    } catch (error) {
      console.error('Error persisting violation:', error);
    }
  }

  /**
   * Calculate safety score based on violations and agent actions
   */
  private calculateSafetyScore(interaction: LLMInteraction): number {
    if (interaction.violations.length === 0) {
      return 1.0;
    }

    const severityWeights: Record<string, number> = {
      low: 0.1,
      medium: 0.3,
      high: 0.5,
      critical: 1.0
    };

    const totalPenalty = interaction.violations.reduce(
      (sum, v) => sum + (severityWeights[v.severity] || 0.3),
      0
    );

    return Math.max(0, 1.0 - (totalPenalty / 2));
  }

  /**
   * Get severity log level for audit logs
   */
  private getSeverityLogLevel(severity: string): string {
    switch (severity) {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      default:
        return 'info';
    }
  }

  /**
   * Get maximum severity from a list
   */
  private getMaxSeverity(severities: string[]): 'low' | 'medium' | 'high' | 'critical' {
    if (severities.includes('critical')) return 'critical';
    if (severities.includes('high')) return 'high';
    if (severities.includes('medium')) return 'medium';
    return 'low';
  }

  /**
   * Get recent interactions from Supabase
   */
  async getRecentInteractions(limit = 50): Promise<any[]> {
    if (!this.useSupabase) return [];
    return await supabaseService.getInteractions(limit);
  }

  /**
   * Get violations from Supabase
   */
  async getViolations(filters?: { is_resolved?: boolean; severity?: string }): Promise<any[]> {
    if (!this.useSupabase) return [];
    return await supabaseService.getViolations(filters);
  }

  /**
   * Get audit logs from Supabase
   */
  async getAuditLogs(filters?: { level?: string; action?: string }): Promise<any[]> {
    if (!this.useSupabase) return [];
    return await supabaseService.getAuditLogs(filters);
  }

  /**
   * Get statistics from Supabase
   */
  async getStatistics(days = 7): Promise<any> {
    if (!this.useSupabase) {
      return {
        totalInteractions: 0,
        complianceRate: 0,
        avgSafetyScore: 0,
        activeViolations: 0
      };
    }
    return await supabaseService.getStatistics(days);
  }
}

export const governanceService = GovernanceServiceSupabase.getInstance();
