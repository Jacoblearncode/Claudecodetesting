'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  subValue?: string
  icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  accent?: 'red' | 'green' | 'yellow' | 'blue' | 'default'
  className?: string
}

const accents: Record<string, { border: string; iconBg: string; iconText: string }> = {
  red: { border: 'border-red-500/20', iconBg: 'bg-red-500/10', iconText: 'text-red-400' },
  green: { border: 'border-green-500/20', iconBg: 'bg-green-500/10', iconText: 'text-green-400' },
  yellow: { border: 'border-yellow-500/20', iconBg: 'bg-yellow-500/10', iconText: 'text-yellow-400' },
  blue: { border: 'border-blue-500/20', iconBg: 'bg-blue-500/10', iconText: 'text-blue-400' },
  default: { border: 'border-apex-border', iconBg: 'bg-apex-surface', iconText: 'text-apex-silver' },
}

export default function StatCard({ label, value, subValue, icon: Icon, trend, trendValue, accent = 'default', className }: StatCardProps) {
  const a = accents[accent]
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn('glass-card rounded-xl p-5 border', a.border, className)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-apex-silver uppercase tracking-widest mb-2">{label}</p>
          <p className="text-2xl font-bold text-apex-white">{value}</p>
          {subValue && <p className="text-xs text-apex-silver mt-1">{subValue}</p>}
          {trendValue && (
            <p className={cn('text-xs mt-2 font-medium', trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-apex-silver')}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-lg shrink-0', a.iconBg)}>
          <Icon className={cn('w-5 h-5', a.iconText)} />
        </div>
      </div>
    </motion.div>
  )
}
