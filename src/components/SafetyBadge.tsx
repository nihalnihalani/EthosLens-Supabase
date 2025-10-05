import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { getSafetyStatusConfig } from '../utils/badgeUtils';

interface SafetyBadgeProps {
  status: 'safe' | 'flagged' | 'blocked';
  violationCount?: number;
  animated?: boolean;
}

const SafetyBadge: React.FC<SafetyBadgeProps> = ({ 
  status, 
  violationCount = 0, 
  animated = true 
}) => {
  const config = getSafetyStatusConfig(status, violationCount);
  const Icon = config.icon;

  return (
    <motion.div
      initial={animated ? { opacity: 0, scale: 0.8 } : false}
      animate={animated ? { opacity: 1, scale: 1 } : false}
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${config.color} font-semibold text-sm backdrop-blur-sm`}
    >
      <div className="flex items-center space-x-1 bg-white/40 rounded-full px-2 py-1">
        <Shield className={`h-4 w-4 ${config.iconColor}`} />
        <Icon className={`h-4 w-4 ${config.iconColor}`} />
      </div>
      <span>{config.label}</span>
      {violationCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white/60 px-2 py-1 rounded-full text-xs font-bold shadow-sm"
        >
          {violationCount}
        </motion.span>
      )}
    </motion.div>
  );
};

export default SafetyBadge;