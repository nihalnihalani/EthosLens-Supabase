import React from 'react';
import { format } from 'date-fns';
import SafetyBadge from './SafetyBadge';
import { LLMInteraction } from '../types';

interface InteractionCardHeaderProps {
  interaction: LLMInteraction;
}

const InteractionCardHeader: React.FC<InteractionCardHeaderProps> = ({ interaction }) => {
  const getStatusIcon = () => {
    switch (interaction.status) {
      case 'approved':
        return <SafetyBadge status="safe" />;
      case 'blocked':
        return <SafetyBadge status="blocked" violationCount={interaction.violations.length} />;
      case 'pending':
        return <SafetyBadge status="flagged" violationCount={interaction.violations.length} />;
    }
  };

  const getSeverityColor = () => {
    switch (interaction.severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <span className="text-sm font-medium text-gray-900">
          #{interaction.id.slice(-8)}
        </span>
        <span className="text-xs text-gray-500">
          {format(new Date(interaction.timestamp), 'MMM dd, HH:mm:ss')}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor()}`}>
          {interaction.severity}
        </span>
      </div>
      {getStatusIcon()}
    </div>
  );
};

export default InteractionCardHeader;
