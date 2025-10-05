import React from 'react';
import AgentBadge from './AgentBadge';
import { AgentAction } from '../types';

interface AgentActionListProps {
  agentActions: AgentAction[];
}

const AgentActionList: React.FC<AgentActionListProps> = ({ agentActions }) => {
  if (agentActions.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-3">
        Agent Actions ({agentActions.length})
      </h4>
      <div className="space-y-2">
        {agentActions.map((action, index) => (
          <AgentBadge
            key={index}
            agentName={action.agentName}
            action={action.action}
            details={action.details}
            timestamp={action.timestamp}
            animated={false}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentActionList;
