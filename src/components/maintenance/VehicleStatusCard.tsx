'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlertTriangle, CheckCircle, Wrench, XCircle, ChevronRight, Activity } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import { Vehicle } from '@/types'
import { maintenanceStatusLabel, formatNumber } from '@/lib/utils'
import { getAlertsByVehicle } from '@/data/maintenance'

const statusIcons: Record<string, React.FC<{ className?: string }>> = {
  ready: CheckCircle,
  'needs-service': AlertTriangle,
  'under-repair': Wrench,
  'not-available': XCircle,
}

interface Props {
  vehicle: Vehicle
  compact?: boolean
}

export default function VehicleStatusCard({ vehicle, compact }: Props) {
  const alerts = getAlertsByVehicle(vehicle.id)
  const StatusIcon = statusIcons[vehicle.maintenanceStatus] || Activity

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="glass-card rounded-xl border border-apex-border hover:border-apex-muted transition-all duration-300 overflow-hidden"
    >
      {/* Header band */}
      <div className={`h-1 ${
        vehicle.maintenanceStatus === 'ready' ? 'bg-green-500' :
        vehicle.maintenanceStatus === 'needs-service' ? 'bg-yellow-500' :
        vehicle.maintenanceStatus === 'under-repair' ? 'bg-red-500' : 'bg-zinc-500'
      }`} />

      <div className="p-5">
        {/* Vehicle name + status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-apex-silver text-xs uppercase tracking-widest mb-0.5">{vehicle.make}</p>
            <h3 className="text-apex-white font-bold text-base">{vehicle.model}</h3>
            <p className="text-apex-silver text-xs mt-0.5">{vehicle.year} · {formatNumber(vehicle.mileage)} km</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant={vehicle.maintenanceStatus as Parameters<typeof Badge>[0]['variant']}>
              {maintenanceStatusLabel(vehicle.maintenanceStatus)}
            </Badge>
            {alerts.length > 0 && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-0.5 rounded">
                <AlertTriangle className="w-2.5 h-2.5" />
                {alerts.length} alert{alerts.length > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Condition score */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-apex-silver uppercase tracking-wider">Overall Condition</span>
            <div className="flex items-center gap-1.5">
              <StatusIcon className={`w-3.5 h-3.5 ${
                vehicle.conditionScore >= 85 ? 'text-green-400' :
                vehicle.conditionScore >= 65 ? 'text-yellow-400' : 'text-red-400'
              }`} />
              <span className={`text-sm font-bold ${
                vehicle.conditionScore >= 85 ? 'text-green-400' :
                vehicle.conditionScore >= 65 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {vehicle.conditionScore}/100
              </span>
            </div>
          </div>
          <ProgressBar value={vehicle.conditionScore} showValue={false} size="lg" />
        </div>

        {!compact && (
          <>
            {/* Key condition metrics */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {vehicle.conditionMetrics.slice(0, 4).map(m => (
                <div key={m.name} className="bg-apex-surface/50 rounded px-3 py-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-apex-silver uppercase tracking-wider">{m.name}</span>
                    <span className={`text-[10px] font-bold ${
                      m.score >= 85 ? 'text-green-400' : m.score >= 65 ? 'text-yellow-400' : 'text-red-400'
                    }`}>{m.score}%</span>
                  </div>
                  <ProgressBar value={m.score} showValue={false} size="sm" animate={false} />
                </div>
              ))}
            </div>

            {/* Alerts preview */}
            {alerts.length > 0 && (
              <div className="space-y-1.5 mb-4">
                {alerts.slice(0, 2).map(alert => (
                  <div key={alert.id} className={`flex items-start gap-2 px-3 py-2 rounded text-xs border ${
                    alert.severity === 'critical' ? 'bg-red-500/8 border-red-500/20 text-red-400' :
                    alert.severity === 'high' ? 'bg-orange-500/8 border-orange-500/20 text-orange-400' :
                    'bg-yellow-500/8 border-yellow-500/20 text-yellow-400'
                  }`}>
                    <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
                    <span className="leading-snug">{alert.message}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <Link
          href={`/maintenance/${vehicle.id}`}
          className="flex items-center justify-between text-xs text-apex-silver hover:text-apex-white transition-colors group pt-3 border-t border-apex-border/50"
        >
          <span className="font-semibold uppercase tracking-wider">View Full Report</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}
