'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Zap, Gauge, Timer, GitFork, ArrowRight, GitCompare } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { Vehicle } from '@/types'
import { formatCurrency, categoryLabel } from '@/lib/utils'
import { useComparison } from '@/hooks/useComparison'
import { cn } from '@/lib/utils'

function CarVisual({ vehicle }: { vehicle: Vehicle }) {
  const [imgError, setImgError] = useState(false)
  const { primary, secondary, accent } = vehicle.colorTheme

  if (vehicle.imageUrl && !imgError) {
    return (
      <div className="relative w-full aspect-video overflow-hidden bg-apex-surface">
        <Image
          src={vehicle.imageUrl}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-apex-void/80 via-apex-void/10 to-transparent" />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-black/50 backdrop-blur-sm border border-white/10 text-white/80">
            {categoryLabel(vehicle.category)}
          </span>
        </div>
      </div>
    )
  }

  // Gradient fallback
  return (
    <div
      className="relative w-full aspect-video overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)` }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 320 130" className="w-3/4 opacity-85" fill="none">
          <path d="M20 90 L55 90 L65 70 L90 58 L170 54 L220 54 L260 62 L285 78 L300 90 L310 90 L312 100 L18 100 Z" fill="white" fillOpacity="0.85"/>
          <path d="M93 54 L108 36 L150 28 L200 28 L228 36 L240 54 Z" fill="white" fillOpacity="0.6"/>
          <circle cx="78" cy="103" r="20" fill="white" fillOpacity="0.9"/>
          <circle cx="78" cy="103" r="11" fill={secondary} />
          <circle cx="242" cy="103" r="20" fill="white" fillOpacity="0.9"/>
          <circle cx="242" cy="103" r="11" fill={secondary} />
        </svg>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: accent }} />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-50" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      <div className="absolute top-3 left-3">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-black/40 backdrop-blur-sm border border-white/10 text-white/80">
          {categoryLabel(vehicle.category)}
        </span>
      </div>
    </div>
  )
}

interface Props {
  vehicle: Vehicle
}

export default function VehicleCard({ vehicle }: Props) {
  const { ids, toggle, maxReached } = useComparison()
  const inCompare = ids.includes(vehicle.id)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
    >
      {/* Compare button — top right corner, outside Link */}
      <button
        onClick={e => { e.preventDefault(); toggle(vehicle.id) }}
        disabled={!inCompare && maxReached}
        title={maxReached && !inCompare ? 'Maximum 3 vehicles to compare' : inCompare ? 'Remove from compare' : 'Add to compare'}
        className={cn(
          'absolute top-3 right-3 z-20 p-1.5 rounded backdrop-blur-sm border transition-all',
          inCompare
            ? 'bg-apex-red border-apex-red text-white shadow-red-glow-sm'
            : maxReached
            ? 'bg-black/30 border-white/10 text-white/20 cursor-not-allowed'
            : 'bg-black/40 border-white/10 text-white/60 hover:text-white hover:border-white/30'
        )}
      >
        <GitCompare className="w-3.5 h-3.5" />
      </button>

      <Link href={`/fleet/${vehicle.id}`} className="group block h-full">
        <div className="glass-card rounded-xl overflow-hidden border border-apex-border hover:border-apex-red/30 transition-all duration-500 hover:shadow-card-hover h-full flex flex-col">
          <CarVisual vehicle={vehicle} />

          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-start justify-between gap-2 mb-4">
              <div>
                <p className="text-apex-silver text-xs uppercase tracking-widest mb-0.5">{vehicle.make} · {vehicle.year}</p>
                <h3 className="text-apex-white font-bold text-base leading-tight">{vehicle.model}</h3>
              </div>
              <Badge
                variant={vehicle.status === 'available' ? 'available' : vehicle.status === 'rented' ? 'rented' : 'maintenance'}
                dot
              >
                {vehicle.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { Icon: Zap, label: `${vehicle.horsepower} HP`, tip: 'Power' },
                { Icon: Timer, label: `${vehicle.acceleration}s`, tip: '0–100 km/h' },
                { Icon: Gauge, label: `${vehicle.topSpeed} km/h`, tip: 'Top Speed' },
                { Icon: GitFork, label: vehicle.drivetrain, tip: 'Drivetrain' },
              ].map(({ Icon, label, tip }) => (
                <div key={tip} className="flex items-center gap-2 bg-apex-surface/50 rounded px-2.5 py-2">
                  <Icon className="w-3 h-3 text-apex-red shrink-0" />
                  <div>
                    <div className="text-apex-white text-xs font-semibold">{label}</div>
                    <div className="text-apex-silver text-[10px]">{tip}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-apex-silver text-xs mb-4 truncate">
              {vehicle.engineSize} · {vehicle.transmission.toUpperCase()} · {vehicle.seats} seats
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-apex-border/50">
              <div>
                <span className="text-apex-white font-bold text-lg">{formatCurrency(vehicle.pricePerDay)}</span>
                <span className="text-apex-silver text-xs"> / day</span>
              </div>
              <div className="flex items-center gap-1 text-apex-red text-xs font-bold uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
                View <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
