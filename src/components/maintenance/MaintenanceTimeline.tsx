'use client'
import { motion } from 'framer-motion'
import { Wrench, CheckCircle2, Clock, AlertTriangle, FileSearch, Droplets, RotateCcw, PaintBucket } from 'lucide-react'
import { MaintenanceRecord } from '@/types'
import { staggerContainer, fadeInLeft } from '@/lib/animations'

const typeConfig: Record<MaintenanceRecord['type'], { Icon: React.FC<{ className?: string }>; label: string; color: string }> = {
  'oil-change': { Icon: Droplets, label: 'Oil Change', color: 'text-amber-400' },
  'tire-rotation': { Icon: RotateCcw, label: 'Tire Rotation', color: 'text-blue-400' },
  'brake-service': { Icon: AlertTriangle, label: 'Brake Service', color: 'text-orange-400' },
  'full-service': { Icon: Wrench, label: 'Full Service', color: 'text-apex-red' },
  repair: { Icon: Wrench, label: 'Repair', color: 'text-red-500' },
  inspection: { Icon: FileSearch, label: 'Inspection', color: 'text-green-400' },
  detailing: { Icon: PaintBucket, label: 'Detailing', color: 'text-purple-400' },
}

interface Props {
  records: MaintenanceRecord[]
}

export default function MaintenanceTimeline({ records }: Props) {
  const sorted = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="glass-card border border-apex-border rounded-xl overflow-hidden">
      <div className="p-5 border-b border-apex-border">
        <h3 className="text-apex-white font-bold text-sm uppercase tracking-wider">Service History</h3>
        <p className="text-apex-silver text-xs mt-1">{records.length} service record{records.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="p-5">
        {sorted.length === 0 ? (
          <p className="text-apex-silver text-sm text-center py-8">No service records found.</p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-5 top-2 bottom-2 w-px bg-apex-border" />

            <div className="space-y-6">
              {sorted.map((record, index) => {
                const config = typeConfig[record.type]
                const Icon = config.Icon
                return (
                  <motion.div key={record.id} variants={fadeInLeft} className="flex gap-4 relative">
                    {/* Dot */}
                    <div className={`relative z-10 w-10 h-10 rounded-full border flex items-center justify-center shrink-0 ${
                      record.completed
                        ? 'bg-apex-surface border-apex-border'
                        : 'bg-yellow-500/10 border-yellow-500/30'
                    }`}>
                      <Icon className={`w-4 h-4 ${record.completed ? config.color : 'text-yellow-400'}`} />
                    </div>

                    <div className="flex-1 min-w-0 pt-1.5">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-apex-white font-semibold text-sm">{config.label}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              record.completed
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                            }`}>
                              {record.completed ? 'Completed' : 'In Progress'}
                            </span>
                          </div>
                          <p className="text-apex-silver text-xs mt-0.5">{record.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-xs text-apex-white font-semibold">
                            {new Date(record.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                          <div className="text-xs text-apex-silver">€{record.cost.toLocaleString()}</div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="bg-apex-surface/50 rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-apex-silver">Technician</span>
                          <span className="text-apex-light font-medium">{record.technician}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-apex-silver">Mileage</span>
                          <span className="text-apex-light font-medium">{record.mileageAtService.toLocaleString()} km</span>
                        </div>
                        {record.nextServiceDue && (
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-apex-silver">Next Service</span>
                            <span className="text-blue-400 font-medium">
                              {new Date(record.nextServiceDue).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                        )}
                        {record.parts && record.parts.length > 0 && (
                          <div className="pt-1.5 border-t border-apex-border/50">
                            <div className="text-[10px] text-apex-silver uppercase tracking-wider mb-1.5">Parts Used</div>
                            <div className="flex flex-wrap gap-1">
                              {record.parts.map(part => (
                                <span key={part} className="text-[10px] bg-apex-card border border-apex-border px-2 py-0.5 rounded text-apex-light">
                                  {part}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {record.notes && (
                          <p className="text-[11px] text-apex-silver pt-1.5 border-t border-apex-border/50 leading-snug italic">
                            {record.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
