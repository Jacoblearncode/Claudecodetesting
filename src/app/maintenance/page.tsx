'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Wrench, XCircle, Filter } from 'lucide-react'
import VehicleStatusCard from '@/components/maintenance/VehicleStatusCard'
import { vehicles } from '@/data/vehicles'
import { getActiveAlerts } from '@/data/maintenance'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { MaintenanceStatus } from '@/types'

const statusFilters: { label: string; value: MaintenanceStatus | 'all'; Icon: React.FC<{ className?: string }>; color: string }[] = [
  { label: 'All Vehicles', value: 'all', Icon: Filter, color: 'text-apex-silver' },
  { label: 'Ready', value: 'ready', Icon: CheckCircle, color: 'text-green-400' },
  { label: 'Needs Service', value: 'needs-service', Icon: AlertTriangle, color: 'text-yellow-400' },
  { label: 'Under Repair', value: 'under-repair', Icon: Wrench, color: 'text-red-400' },
  { label: 'Not Available', value: 'not-available', Icon: XCircle, color: 'text-zinc-400' },
]

export default function MaintenancePage() {
  const [statusFilter, setStatusFilter] = useState<MaintenanceStatus | 'all'>('all')
  const activeAlerts = getActiveAlerts()

  const filtered = vehicles.filter(v =>
    statusFilter === 'all' || v.maintenanceStatus === statusFilter
  )

  const stats = {
    total: vehicles.length,
    ready: vehicles.filter(v => v.maintenanceStatus === 'ready').length,
    needsService: vehicles.filter(v => v.maintenanceStatus === 'needs-service').length,
    underRepair: vehicles.filter(v => v.maintenanceStatus === 'under-repair').length,
    avgCondition: Math.round(vehicles.reduce((s, v) => s + v.conditionScore, 0) / vehicles.length),
  }

  return (
    <div className="min-h-screen bg-apex-void pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-apex-red" />
            <span className="text-apex-red text-xs font-bold uppercase tracking-[0.3em]">Fleet Management</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h1 className="font-display text-6xl text-apex-white tracking-wide">MAINTENANCE TRACKER</h1>
            <p className="text-apex-silver text-sm max-w-xs">Real-time vehicle health monitoring and service tracking.</p>
          </div>
        </motion.div>

        {/* Summary stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8"
        >
          {[
            { label: 'Total Fleet', value: stats.total, color: 'text-apex-white', bg: 'bg-apex-surface/50', border: 'border-apex-border' },
            { label: 'Ready', value: stats.ready, color: 'text-green-400', bg: 'bg-green-500/5', border: 'border-green-500/20' },
            { label: 'Needs Service', value: stats.needsService, color: 'text-yellow-400', bg: 'bg-yellow-500/5', border: 'border-yellow-500/20' },
            { label: 'Under Repair', value: stats.underRepair, color: 'text-red-400', bg: 'bg-red-500/5', border: 'border-red-500/20' },
            { label: 'Avg. Condition', value: `${stats.avgCondition}%`, color: 'text-blue-400', bg: 'bg-blue-500/5', border: 'border-blue-500/20' },
          ].map(s => (
            <motion.div key={s.label} variants={fadeInUp}
              className={`${s.bg} border ${s.border} rounded-xl p-4 text-center`}>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-apex-silver text-xs uppercase tracking-wider mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Active alerts banner */}
        {activeAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 glass-card border border-red-500/20 bg-red-500/5 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <div className="flex-1">
                <h3 className="text-red-400 font-semibold text-sm mb-2">
                  {activeAlerts.length} Active Alert{activeAlerts.length > 1 ? 's' : ''} Require Attention
                </h3>
                <div className="space-y-1">
                  {activeAlerts.slice(0, 3).map(alert => {
                    const vehicle = vehicles.find(v => v.id === alert.vehicleId)
                    return (
                      <div key={alert.id} className="flex items-start gap-2 text-xs text-red-300/80">
                        <span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                          alert.severity === 'critical' ? 'bg-red-600/20 border-red-600/30 text-red-300' :
                          alert.severity === 'high' ? 'bg-orange-600/20 border-orange-600/30 text-orange-300' :
                          'bg-yellow-600/20 border-yellow-600/30 text-yellow-300'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span><strong>{vehicle?.model}:</strong> {alert.message}</span>
                      </div>
                    )
                  })}
                  {activeAlerts.length > 3 && (
                    <p className="text-xs text-red-400/60">+{activeAlerts.length - 3} more alerts</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Status filter tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {statusFilters.map(f => {
            const count = f.value === 'all' ? vehicles.length : vehicles.filter(v => v.maintenanceStatus === f.value).length
            return (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider border rounded transition-all ${
                  statusFilter === f.value
                    ? 'bg-apex-surface border-apex-muted text-apex-white'
                    : 'bg-transparent border-apex-border text-apex-silver hover:border-apex-muted hover:text-apex-light'
                }`}
              >
                <f.Icon className={`w-3.5 h-3.5 ${statusFilter === f.value ? f.color : ''}`} />
                {f.label}
                <span className="w-5 h-5 rounded-full bg-apex-surface/80 flex items-center justify-center text-[10px]">{count}</span>
              </button>
            )
          })}
        </div>

        {/* Vehicle grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filtered.map(vehicle => (
            <motion.div key={vehicle.id} variants={fadeInUp}>
              <VehicleStatusCard vehicle={vehicle} />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-apex-silver">
            No vehicles match the selected filter.
          </div>
        )}
      </div>
    </div>
  )
}
