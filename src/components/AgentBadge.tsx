import React from 'react';
import { motion } from 'framer-motion';
import { getAgentIcon, getAgentActionConfig } from '../utils/badgeUtils';

interface AgentBadgeProps {
  agentName: string;
  action: 'flag' | 'approve' | 'suggest' | 'log' | 'block';
  details: string;
  timestamp: Date;
  animated?: boolean;
}

const AgentBadge: React.FC<AgentBadgeProps> = ({ 
  agentName, 
  action, 
  details, 
  timestamp, 
  animated = true 
}) => {
  const AgentIcon = getAgentIcon(agentName);
  const actionConfig = getAgentActionConfig(action);
  const ActionIcon = actionConfig.icon;

  const formatAgentName = (name: string) => {
    return name.replace('Agent', '').replace(/([A-Z])/g, ' $1').trim();
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <motion.div
      initial={animated ? { opacity: 0, scale: 0.9, y: 10 } : false}
      animate={animated ? { opacity: 1, scale: 1, y: 0 } : false}
      whileHover={{ scale: 1.02 }}
      className={`inline-flex items-center space-x-3 px-4 py-3 rounded-xl border ${actionConfig.color} font-medium text-sm backdrop-blur-sm transition-all duration-200`}
    >
      {/* Agent Icon */}
      <div className="flex items-center space-x-2">
        <div className="bg-white/60 p-1.5 rounded-lg shadow-sm">
          <AgentIcon className="h-4 w-4 text-gray-700" />
        </div>
        <div className="bg-white/40 p-1 rounded-full">
          <ActionIcon className={`h-3 w-3 ${actionConfig.iconColor}`} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-xs">
            {formatAgentName(agentName)}
          </span>
          <span className="text-lg leading-none">{actionConfig.emoji}</span>
        </div>
        <p className="text-xs opacity-90 truncate mt-0.5" title={details}>
          {details}
        </p>
        <p className="text-xs opacity-70 mt-1">
          {formatTime(timestamp)}
        </p>
      </div>
    </motion.div>
  );
};

export default AgentBadge;