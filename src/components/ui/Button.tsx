'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
type Size = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-apex-red text-white hover:bg-apex-red-bright shadow-red-glow-sm hover:shadow-red-glow border border-apex-red/30',
  secondary: 'bg-apex-surface text-apex-white hover:bg-apex-card border border-apex-border hover:border-apex-muted',
  ghost: 'bg-transparent text-apex-light hover:text-apex-white hover:bg-apex-surface border border-transparent hover:border-apex-border',
  outline: 'bg-transparent text-apex-white border border-apex-muted hover:border-apex-red hover:text-apex-red',
  danger: 'bg-red-900/20 text-red-400 border border-red-900/40 hover:bg-red-900/30',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs tracking-wider',
  md: 'px-6 py-3 text-sm tracking-wider',
  lg: 'px-8 py-4 text-sm tracking-widest',
  xl: 'px-10 py-5 text-base tracking-widest',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, fullWidth, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
        className={cn(
          'relative inline-flex items-center justify-center gap-2 font-semibold uppercase transition-all duration-300 cursor-pointer select-none overflow-hidden',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          (disabled || loading) && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        disabled={disabled || loading}
        {...(props as Record<string, unknown>)}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </span>
        )}
        <span className={loading ? 'opacity-0' : 'opacity-100'}>{children}</span>
      </motion.button>
    )
  }
)
Button.displayName = 'Button'
export default Button
