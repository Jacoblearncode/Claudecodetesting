import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Zap, Gauge, Timer, Users, Weight, Fuel, GitFork, Shield, Calendar, FileText, ArrowRight } from 'lucide-react'
import { getVehicleById, vehicles } from '@/data/vehicles'
import { formatCurrency, categoryLabel, vehicleStatusColor, maintenanceStatusLabel, maintenanceStatusColor } from '@/lib/utils'
import ConditionPanel from '@/components/maintenance/ConditionPanel'
import Badge from '@/components/ui/Badge'
import BookingCTA from './BookingCTA'

export function generateStaticParams() {
  return vehicles.map(v => ({ id: v.id }))
}

interface Props {
  params: { id: string }
}

function CarHeroVisual({ vehicle }: { vehicle: ReturnType<typeof getVehicleById> }) {
  if (!vehicle) return null
  const { primary, secondary, accent } = vehicle.colorTheme
  return (
    <div
      className="relative w-full aspect-[21/9] rounded-xl overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)` }}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ background: accent }} />

      {/* Car SVG */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 500 200" className="w-2/3 max-w-2xl opacity-90" fill="none">
          <path d="M30 135 L85 135 L100 105 L140 87 L260 82 L340 82 L395 92 L430 118 L460 135 L475 135 L478 152 L27 152 Z" fill="white" fillOpacity="0.88"/>
          <path d="M143 82 L163 55 L225 42 L305 42 L345 55 L365 82 Z" fill="white" fillOpacity="0.6"/>
          <path d="M172 42 L205 22 L265 15 L320 22 L348 42 Z" fill="white" fillOpacity="0.22"/>
          <circle cx="118" cy="156" r="30" fill="white" fillOpacity="0.9"/>
          <circle cx="118" cy="156" r="17" fill={secondary} />
          <circle cx="118" cy="156" r="6" fill="white" fillOpacity="0.5"/>
          <circle cx="372" cy="156" r="30" fill="white" fillOpacity="0.9"/>
          <circle cx="372" cy="156" r="17" fill={secondary} />
          <circle cx="372" cy="156" r="6" fill="white" fillOpacity="0.5"/>
          <path d="M410 108 L468 108 L468 136 L410 130 Z" fill="white" fillOpacity="0.28"/>
          <path d="M30 118 L74 118 L70 98 L34 101 Z" fill="white" fillOpacity="0.2"/>
          <rect x="155" y="48" width="180" height="34" rx="3" fill="white" fillOpacity="0.08"/>
        </svg>
      </div>

      {/* Brand watermark */}
      <div className="absolute bottom-6 right-8 text-white/10 font-display text-[80px] leading-none select-none">
        {vehicle.make.split('-')[0].toUpperCase()}
      </div>

      {/* Accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
    </div>
  )
}

export default function VehicleDetailPage({ params }: Props) {
  const vehicle = getVehicleById(params.id)
  if (!vehicle) notFound()

  const specs = [
    { icon: Zap, label: 'Power', value: `${vehicle.horsepower} HP` },
    { icon: Gauge, label: 'Torque', value: `${vehicle.torque} Nm` },
    { icon: Timer, label: '0–100 km/h', value: `${vehicle.acceleration}s` },
    { icon: Gauge, label: 'Top Speed', value: `${vehicle.topSpeed} km/h` },
    { icon: Weight, label: 'Curb Weight', value: `${vehicle.weight} kg` },
    { icon: GitFork, label: 'Drivetrain', value: vehicle.drivetrain },
    { icon: Fuel, label: 'Engine', value: vehicle.engineSize },
    { icon: Users, label: 'Seats', value: `${vehicle.seats} seats` },
  ]

  return (
    <div className="min-h-screen bg-apex-void pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/fleet" className="flex items-center gap-1.5 text-apex-silver hover:text-apex-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Fleet
          </Link>
          <span className="text-apex-border">/</span>
          <span className="text-apex-white">{vehicle.make} {vehicle.model}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero */}
            <CarHeroVisual vehicle={vehicle} />

            {/* Title + status */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 border border-apex-border text-apex-silver rounded">
                    {categoryLabel(vehicle.category)}
                  </span>
                  <span className="text-apex-silver text-xs">{vehicle.year}</span>
                </div>
                <h1 className="text-4xl font-bold text-apex-white">{vehicle.make} {vehicle.model}</h1>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant={vehicle.status === 'available' ? 'available' : vehicle.status === 'rented' ? 'rented' : 'maintenance'} dot>
                  {vehicle.status}
                </Badge>
                <Badge variant={vehicle.maintenanceStatus as Parameters<typeof Badge>[0]['variant']}>
                  {maintenanceStatusLabel(vehicle.maintenanceStatus)}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <div className="glass-card border border-apex-border rounded-xl p-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-apex-silver mb-3">About This Vehicle</h2>
              <p className="text-apex-light leading-relaxed">{vehicle.description}</p>
            </div>

            {/* Performance specs */}
            <div className="glass-card border border-apex-border rounded-xl p-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-apex-silver mb-5">Technical Specifications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-apex-surface/50 rounded-lg p-4 text-center">
                    <Icon className="w-4 h-4 text-apex-red mx-auto mb-2" />
                    <div className="text-apex-white font-bold text-sm">{value}</div>
                    <div className="text-apex-silver text-[10px] uppercase tracking-wider mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="glass-card border border-apex-border rounded-xl p-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-apex-silver mb-4">Key Features</h2>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map(f => (
                  <span key={f} className="px-3 py-1.5 bg-apex-surface border border-apex-border text-apex-light text-xs rounded hover:border-apex-red/30 transition-colors">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Condition */}
            <ConditionPanel metrics={vehicle.conditionMetrics} overallScore={vehicle.conditionScore} />

            {/* Rental terms */}
            <div className="glass-card border border-apex-border rounded-xl p-6 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-apex-silver">Rental Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: 'Insurance', value: vehicle.insuranceIncluded ? 'Comprehensive coverage included' : 'Separate insurance required' },
                  { icon: Calendar, label: 'Minimum Age', value: `${vehicle.minAge} years or older` },
                  { icon: FileText, label: 'License Requirements', value: vehicle.minLicense },
                  { icon: Gauge, label: 'Current Mileage', value: `${vehicle.mileage.toLocaleString()} km` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex gap-3">
                    <Icon className="w-4 h-4 text-apex-red mt-0.5 shrink-0" />
                    <div>
                      <div className="text-apex-silver text-xs uppercase tracking-wider mb-0.5">{label}</div>
                      <div className="text-apex-white text-sm">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <BookingCTA vehicle={vehicle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
