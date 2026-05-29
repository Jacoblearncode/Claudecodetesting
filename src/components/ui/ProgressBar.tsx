'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number // 0-100
  label?: string
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
  className?: string
}

function getBarColor(value: number): string {
  if (value >= 90) return 'bg-green-400'
  if (value >= 70) return 'bg-emerald-400'
  if (value >= 50) return 'bg-yellow-400'
  if (value >= 30) return 'bg-orange-400'
  return 'bg-red-500'
}

const heights: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2',
}

export default function ProgressBar({
  value,
  label,
  showValue = true,
  size = 'md',
  animate = true,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const color = getBarColor(clamped)

  return (
    <div className={cn('space-y-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs text-apex-silver">{label}</span>}
          {showValue && (
            <span className={cn('text-xs font-semibold tabular-nums', clamped >= 70 ? 'text-green-400' : clamped >= 50 ? 'text-yellow-400' : 'text-red-400')}>
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-apex-surface rounded-full overflow-hidden', heights[size])}>
        {animate ? (
          <motion.div
            className={cn('h-full rounded-full', color)}
            initial={{ width: 0 }}
            whileInView={{ width: `${clamped}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />
        ) : (
          <div className={cn('h-full rounded-full', color)} style={{ width: `${clamped}%` }} />
        )}
      </div>
    </div>
  )
}
