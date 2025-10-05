import React from 'react';
import { motion } from 'framer-motion';
import { LLMInteraction } from '../types';
import InteractionCardHeader from './InteractionCardHeader';
import InteractionContent from './InteractionContent';
import AgentActionList from './AgentActionList';
import FeedbackControls from './FeedbackControls';

interface InteractionCardProps {
  interaction: LLMInteraction;
  onAction: (id: string, action: 'approve' | 'block' | 'feedback', rating?: 'positive' | 'negative' | 'flag') => void;
}

const InteractionCard: React.FC<InteractionCardProps> = ({ interaction, onAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <InteractionCardHeader interaction={interaction} />
      
      <InteractionContent 
        input={interaction.input}
        output={interaction.output}
        violations={interaction.violations}
      />
      
      {interaction.agentActions && interaction.agentActions.length > 0 && (
        <div className="mt-4">
          <AgentActionList agentActions={interaction.agentActions} />
        </div>
      )}
      
      <FeedbackControls 
        interactionId={interaction.id}
        status={interaction.status}
        onAction={onAction}
      />
    </motion.div>
  );
};

export default InteractionCard;
