import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Flag, CheckCircle, XCircle } from 'lucide-react';

interface FeedbackControlsProps {
  interactionId: string;
  status: 'approved' | 'blocked' | 'pending';
  onAction: (id: string, action: 'approve' | 'block' | 'feedback', rating?: 'positive' | 'negative' | 'flag') => void;
}

const FeedbackControls: React.FC<FeedbackControlsProps> = ({ 
  interactionId, 
  status, 
  onAction 
}) => {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        {status === 'pending' && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAction(interactionId, 'approve')}
              className="flex items-center space-x-2 px-3 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition-colors text-sm font-medium"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Approve</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAction(interactionId, 'block')}
              className="flex items-center space-x-2 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors text-sm font-medium"
            >
              <XCircle className="h-4 w-4" />
              <span>Block</span>
            </motion.button>
          </>
        )}
      </div>

      {/* Feedback Buttons */}
      <div className="flex items-center space-x-1">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onAction(interactionId, 'feedback', 'positive')}
          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          title="Helpful"
        >
          <ThumbsUp className="h-4 w-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onAction(interactionId, 'feedback', 'negative')}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Not Helpful"
        >
          <ThumbsDown className="h-4 w-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onAction(interactionId, 'feedback', 'flag')}
          className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
          title="Report"
        >
          <Flag className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default FeedbackControls;
