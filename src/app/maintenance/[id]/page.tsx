import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { vehicles } from '@/data/vehicles'
import { getMaintenanceByVehicle, getAlertsByVehicle, getDamageReports } from '@/data/maintenance-detail'
import ConditionPanel from '@/components/maintenance/ConditionPanel'
import MaintenanceTimeline from '@/components/maintenance/MaintenanceTimeline'
import Badge from '@/components/ui/Badge'
import { maintenanceStatusLabel, formatNumber } from '@/lib/utils'
import { AlertTriangle, Gauge, Calendar } from 'lucide-react'
import DamageSection from './DamageSection'

export function generateStaticParams() {
  return vehicles.map(v => ({ id: v.id }))
}

interface Props {
  params: { id: string }
}

export default function VehicleMaintenancePage({ params }: Props) {
  const vehicle = vehicles.find(v => v.id === params.id)
  if (!vehicle) notFound()

  const records = getMaintenanceByVehicle(vehicle.id)
  const alerts = getAlertsByVehicle(vehicle.id)
  const damages = getDamageReports(vehicle.id)

  const totalServiceCost = records.filter(r => r.completed).reduce((s, r) => s + r.cost, 0)
  const lastService = records.filter(r => r.completed).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]

  return (
    <div className="min-h-screen bg-apex-void pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/maintenance" className="flex items-center gap-1.5 text-apex-silver hover:text-apex-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Maintenance
          </Link>
          <span className="text-apex-border">/</span>
          <span className="text-apex-white">{vehicle.make} {vehicle.model}</span>
        </div>

        {/* Vehicle header */}
        <div className="glass-card border border-apex-border rounded-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <p className="text-apex-silver text-xs uppercase tracking-widest mb-1">{vehicle.make} · {vehicle.year}</p>
              <h1 className="text-3xl font-bold text-apex-white">{vehicle.model}</h1>
              <div className="flex items-center gap-4 mt-3 text-sm text-apex-silver">
                <div className="flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-apex-red" />
                  {formatNumber(vehicle.mileage)} km
                </div>
                {lastService && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-apex-red" />
                    Last service: {new Date(lastService.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant={vehicle.maintenanceStatus as Parameters<typeof Badge>[0]['variant']}>
                {maintenanceStatusLabel(vehicle.maintenanceStatus)}
              </Badge>
              <Badge variant={vehicle.status === 'available' ? 'available' : vehicle.status === 'rented' ? 'rented' : 'maintenance'} dot>
                {vehicle.status}
              </Badge>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-apex-border">
            {[
              { label: 'Condition Score', value: `${vehicle.conditionScore}/100`, color: vehicle.conditionScore >= 85 ? 'text-green-400' : vehicle.conditionScore >= 65 ? 'text-yellow-400' : 'text-red-400' },
              { label: 'Service Records', value: records.length, color: 'text-apex-white' },
              { label: 'Active Alerts', value: alerts.length, color: alerts.length > 0 ? 'text-red-400' : 'text-green-400' },
              { label: 'Total Service Cost', value: `€${totalServiceCost.toLocaleString()}`, color: 'text-apex-white' },
            ].map(s => (
              <div key={s.label}>
                <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-apex-silver text-xs uppercase tracking-wider mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Active alerts */}
        {alerts.length > 0 && (
          <div className="mb-8 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-apex-silver">Active Alerts</h2>
            {alerts.map(alert => (
              <div key={alert.id} className={`flex items-start gap-3 p-4 rounded-xl border ${
                alert.severity === 'critical' ? 'bg-red-500/8 border-red-500/25 text-red-300' :
                alert.severity === 'high' ? 'bg-orange-500/8 border-orange-500/25 text-orange-300' :
                'bg-yellow-500/8 border-yellow-500/25 text-yellow-300'
              }`}>
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${
                      alert.severity === 'critical' ? 'bg-red-600/20 border-red-600/30' :
                      alert.severity === 'high' ? 'bg-orange-600/20 border-orange-600/30' :
                      'bg-yellow-600/20 border-yellow-600/30'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="text-[10px] text-current/60 uppercase tracking-wider">{alert.type.replace(/-/g, ' ')}</span>
                  </div>
                  <p className="text-sm">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Condition panel */}
          <div className="lg:col-span-2 space-y-6">
            <ConditionPanel metrics={vehicle.conditionMetrics} overallScore={vehicle.conditionScore} />
            {damages.length > 0 && <DamageSection damages={damages} />}
          </div>

          {/* Timeline */}
          <div className="lg:col-span-3">
            <MaintenanceTimeline records={records} />
          </div>
        </div>
      </div>
    </div>
  )
}
