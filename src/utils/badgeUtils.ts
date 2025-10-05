import { CheckCircle, XCircle, AlertTriangle, Clock, Shield, Eye, FileText, MessageSquare, Activity } from 'lucide-react';

// Agent badge configurations
export const getAgentIcon = (name: string) => {
  switch (name) {
    case 'PolicyEnforcerAgent':
      return Shield;
    case 'VerifierAgent':
      return Eye;
    case 'AuditLoggerAgent':
      return FileText;
    case 'ResponseAgent':
      return MessageSquare;
    case 'FeedbackAgent':
      return Activity;
    default:
      return Shield;
  }
};

export const getAgentActionConfig = (action: string) => {
  switch (action) {
    case 'flag':
      return {
        icon: AlertTriangle,
        color: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-900 border-yellow-400 shadow-md',
        iconColor: 'text-yellow-600',
        emoji: '⚠️'
      };
    case 'block':
      return {
        icon: XCircle,
        color: 'bg-gradient-to-r from-red-100 to-red-200 text-red-900 border-red-400 shadow-md',
        iconColor: 'text-red-600',
        emoji: '🚫'
      };
    case 'approve':
      return {
        icon: CheckCircle,
        color: 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-300 shadow-sm',
        iconColor: 'text-green-600',
        emoji: '✅'
      };
    case 'suggest':
      return {
        icon: AlertTriangle,
        color: 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-300 shadow-sm',
        iconColor: 'text-yellow-600',
        emoji: '💡'
      };
    case 'log':
      return {
        icon: FileText,
        color: 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-300 shadow-sm',
        iconColor: 'text-blue-600',
        emoji: '📝'
      };
    default:
      return {
        icon: Clock,
        color: 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-300 shadow-sm',
        iconColor: 'text-gray-600',
        emoji: '⏳'
      };
  }
};

// Safety badge configurations
export const getSafetyStatusConfig = (status: 'safe' | 'flagged' | 'blocked', violationCount: number = 0) => {
  switch (status) {
    case 'safe':
      return {
        icon: CheckCircle,
        color: 'bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-800 border-emerald-300 shadow-lg',
        iconColor: 'text-green-600',
        label: '✅ SAFE',
        description: 'No violations detected'
      };
    case 'flagged':
      return {
        icon: AlertTriangle,
        color: 'bg-gradient-to-r from-amber-50 to-yellow-100 text-amber-800 border-amber-300 shadow-lg',
        iconColor: 'text-amber-600',
        label: '⚠️ FLAGGED',
        description: `${violationCount} violation${violationCount !== 1 ? 's' : ''} detected`
      };
    case 'blocked':
      return {
        icon: XCircle,
        color: 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-300 shadow-lg',
        iconColor: 'text-red-600',
        label: '❌ BLOCKED',
        description: `${violationCount} violation${violationCount !== 1 ? 's' : ''} detected`
      };
  }
};
