import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type BadgeVariant = 'available' | 'rented' | 'maintenance' | 'unavailable' | 'ready' | 'needs-service' | 'under-repair' | 'not-available' | 'excellent' | 'good' | 'fair' | 'poor' | 'default' | 'critical' | 'high' | 'medium' | 'low'

const variants: Record<BadgeVariant, string> = {
  available: 'bg-green-500/10 text-green-400 border-green-500/20',
  rented: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  maintenance: 'bg-red-500/10 text-red-400 border-red-500/20',
  unavailable: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  ready: 'bg-green-500/10 text-green-400 border-green-500/20',
  'needs-service': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'under-repair': 'bg-red-500/10 text-red-400 border-red-500/20',
  'not-available': 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  excellent: 'bg-green-500/10 text-green-400 border-green-500/20',
  good: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  fair: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  poor: 'bg-red-500/10 text-red-400 border-red-500/20',
  default: 'bg-apex-surface text-apex-light border-apex-border',
  critical: 'bg-red-600/15 text-red-400 border-red-600/30',
  high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
}

const dotColors: Partial<Record<BadgeVariant, string>> = {
  available: 'bg-green-400',
  ready: 'bg-green-400',
  rented: 'bg-blue-400',
  maintenance: 'bg-red-400',
  'under-repair': 'bg-red-400',
  'needs-service': 'bg-yellow-400',
}

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  dot?: boolean
  className?: string
}

export default function Badge({ variant = 'default', children, dot, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase border rounded',
        variants[variant],
        className
      )}
    >
      {dot && variant in dotColors && (
        <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant as keyof typeof dotColors])} />
      )}
      {children}
    </span>
  )
}
