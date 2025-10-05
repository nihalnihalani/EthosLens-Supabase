import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      policies: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          category: string;
          rules: any;
          severity: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
          created_by: string | null;
          version: number;
        };
        Insert: Omit<Database['public']['Tables']['policies']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['policies']['Insert']>;
      };
      agents: {
        Row: {
          id: string;
          name: string;
          type: string;
          description: string | null;
          config: any;
          is_active: boolean;
          performance_score: number;
          created_at: string;
          updated_at: string;
          last_active_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['agents']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['agents']['Insert']>;
      };
      interactions: {
        Row: {
          id: string;
          prompt: string;
          response: string | null;
          agent_id: string | null;
          user_id: string | null;
          session_id: string | null;
          safety_score: number;
          compliance_status: string;
          processing_time_ms: number | null;
          metadata: any;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['interactions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['interactions']['Insert']>;
      };
      violations: {
        Row: {
          id: string;
          interaction_id: string;
          policy_id: string;
          severity: string;
          description: string | null;
          detected_by_agent_id: string | null;
          is_resolved: boolean;
          resolved_at: string | null;
          resolved_by: string | null;
          resolution_notes: string | null;
          detected_at: string;
          metadata: any;
        };
        Insert: Omit<Database['public']['Tables']['violations']['Row'], 'id' | 'detected_at'>;
        Update: Partial<Database['public']['Tables']['violations']['Insert']>;
      };
      audit_logs: {
        Row: {
          id: string;
          interaction_id: string | null;
          agent_id: string | null;
          action: string;
          details: any;
          level: string;
          user_id: string | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['audit_logs']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['audit_logs']['Insert']>;
      };
      feedback: {
        Row: {
          id: string;
          interaction_id: string;
          user_id: string | null;
          rating: number | null;
          comment: string | null;
          feedback_type: string | null;
          is_helpful: boolean | null;
          metadata: any;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['feedback']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['feedback']['Insert']>;
      };
      policy_checks: {
        Row: {
          id: string;
          interaction_id: string;
          policy_id: string;
          passed: boolean;
          score: number | null;
          details: any;
          checked_at: string;
        };
        Insert: Omit<Database['public']['Tables']['policy_checks']['Row'], 'id' | 'checked_at'>;
        Update: Partial<Database['public']['Tables']['policy_checks']['Insert']>;
      };
      agent_metrics: {
        Row: {
          id: string;
          agent_id: string;
          metric_type: string;
          value: number;
          metadata: any;
          recorded_at: string;
        };
        Insert: Omit<Database['public']['Tables']['agent_metrics']['Row'], 'id' | 'recorded_at'>;
        Update: Partial<Database['public']['Tables']['agent_metrics']['Insert']>;
      };
    };
  };
}

// Helper function to check Supabase connection
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('policies').select('count').limit(1);
    return !error;
  } catch {
    return false;
  }
}

// Helper function to get connection status
export async function getSupabaseStatus() {
  const isConnected = await checkSupabaseConnection();
  return {
    connected: isConnected,
    url: supabaseUrl,
    timestamp: new Date().toISOString()
  };
}

export default supabase;
