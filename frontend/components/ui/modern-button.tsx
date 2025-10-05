import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  className?: string
  glow?: boolean
  shimmer?: boolean
}

const ModernButton = React.forwardRef<HTMLButtonElement, ModernButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, glow = false, shimmer = false, ...props }, ref) => {
    const baseClasses = "relative overflow-hidden rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
    
    const variants = {
      primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25",
      secondary: "bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/25",
      outline: "border-2 border-primary/30 bg-transparent text-primary hover:bg-primary/10 hover:border-primary/60",
      ghost: "bg-transparent text-gray-300 hover:bg-white/10 hover:text-white"
    }
    
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
      xl: "px-12 py-6 text-xl"
    }
    
    const glowClasses = glow ? "animate-glow" : ""
    const shimmerClasses = shimmer ? "animate-shimmer" : ""

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          glowClasses,
          shimmerClasses,
          className
        )}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {shimmer && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        )}
        <span className="relative z-10">{children}</span>
      </motion.button>
    )
  }
)

ModernButton.displayName = "ModernButton"

export { ModernButton }
