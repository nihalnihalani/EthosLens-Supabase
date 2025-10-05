import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'neon'
  hover?: boolean
  children: React.ReactNode
  className?: string
}

const ModernCard = React.forwardRef<HTMLDivElement, ModernCardProps>(
  ({ variant = 'default', hover = true, children, className, ...props }, ref) => {
    const baseClasses = "rounded-2xl transition-all duration-300"
    
    const variants = {
      default: "bg-card border border-border shadow-lg",
      glass: "glass-card backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl",
      gradient: "bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl",
      neon: "glass-card border border-primary/30 shadow-2xl neon-glow"
    }
    
    const hoverClasses = hover ? "hover:glass-card-hover hover:scale-105 hover:shadow-3xl" : ""

    return (
      <motion.div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          hoverClasses,
          className
        )}
        whileHover={hover ? { y: -5 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

ModernCard.displayName = "ModernCard"

export { ModernCard }
