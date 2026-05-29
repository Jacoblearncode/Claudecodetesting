'use client'
import { motion } from 'framer-motion'
import { Activity, CheckCircle2, AlertCircle, AlertTriangle, XCircle } from 'lucide-react'
import ProgressBar from '@/components/ui/ProgressBar'
import { ConditionMetric } from '@/types'
import { staggerContainer, fadeInUp } from '@/lib/animations'

interface Props {
  metrics: ConditionMetric[]
  overallScore: number
}

function getIcon(score: number) {
  if (score >= 90) return { Icon: CheckCircle2, color: 'text-green-400' }
  if (score >= 70) return { Icon: Activity, color: 'text-emerald-400' }
  if (score >= 50) return { Icon: AlertCircle, color: 'text-yellow-400' }
  if (score >= 30) return { Icon: AlertTriangle, color: 'text-orange-400' }
  return { Icon: XCircle, color: 'text-red-500' }
}

const metricIcons: Record<string, string> = {
  Engine: '⚙️',
  Tires: '🔄',
  Brakes: '🛑',
  'Oil & Service': '🛢️',
  Battery: '⚡',
  Exterior: '✨',
  Interior: '🪑',
  Mileage: '📍',
}

export default function ConditionPanel({ metrics, overallScore }: Props) {
  return (
    <div className="glass-card border border-apex-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-apex-border">
        <div className="flex items-center justify-between">
          <h3 className="text-apex-white font-bold text-sm uppercase tracking-wider">Vehicle Condition</h3>
          <div className="flex items-center gap-2">
            <div className={`text-2xl font-bold ${overallScore >= 85 ? 'text-green-400' : overallScore >= 65 ? 'text-yellow-400' : 'text-red-400'}`}>
              {overallScore}
            </div>
            <div className="text-apex-silver text-xs">/100</div>
          </div>
        </div>
        <div className="mt-3">
          <ProgressBar value={overallScore} showValue={false} size="lg" />
        </div>
      </div>

      {/* Metrics */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="p-5 space-y-5"
      >
        {metrics.map(metric => {
          const { Icon, color } = getIcon(metric.score)
          return (
            <motion.div key={metric.name} variants={fadeInUp}>
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded bg-apex-surface border border-apex-border mt-0.5 shrink-0`}>
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5 gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-apex-white">{metric.name}</span>
                    </div>
                    <span className={`text-xs font-bold tabular-nums ${color}`}>{metric.score}%</span>
                  </div>
                  <ProgressBar value={metric.score} showValue={false} size="sm" />
                  {metric.notes && (
                    <p className="text-[11px] text-apex-silver mt-1.5 leading-snug">{metric.notes}</p>
                  )}
                  <p className="text-[10px] text-apex-silver/60 mt-1">
                    Last checked: {new Date(metric.lastChecked).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Legend */}
      <div className="px-5 py-4 border-t border-apex-border bg-apex-surface/20">
        <div className="flex flex-wrap gap-3 text-[10px]">
          {[
            { label: 'Excellent', color: 'bg-green-400', range: '90–100' },
            { label: 'Good', color: 'bg-emerald-400', range: '70–89' },
            { label: 'Fair', color: 'bg-yellow-400', range: '50–69' },
            { label: 'Poor', color: 'bg-red-500', range: '0–49' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5 text-apex-silver">
              <span className={`w-2 h-2 rounded-full ${l.color}`} />
              {l.label} ({l.range})
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
