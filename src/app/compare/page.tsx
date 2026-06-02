'use client'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, X, Zap, Gauge, Timer, Weight, Users, GitFork, Fuel, DollarSign, Shield, Star } from 'lucide-react'
import { vehicles } from '@/data/vehicles'
import { formatCurrency, categoryLabel } from '@/lib/utils'
import ProgressBar from '@/components/ui/ProgressBar'
import Badge from '@/components/ui/Badge'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { Vehicle } from '@/types'

function VehicleVisual({ vehicle, imgError, onError }: { vehicle: Vehicle; imgError: boolean; onError: () => void }) {
  if (vehicle.imageUrl && !imgError) {
    return (
      <div className="relative w-full aspect-video overflow-hidden rounded-lg">
        <Image
          src={vehicle.imageUrl}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover"
          onError={onError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-apex-void/60 to-transparent" />
      </div>
    )
  }
  return (
    <div
      className="relative w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${vehicle.colorTheme.primary}, ${vehicle.colorTheme.secondary})` }}
    >
      <svg viewBox="0 0 320 130" className="w-3/4 opacity-80" fill="none">
        <path d="M20 90 L55 90 L65 70 L90 58 L170 54 L220 54 L260 62 L285 78 L300 90 L310 90 L312 100 L18 100 Z" fill="white" fillOpacity="0.85"/>
        <path d="M93 54 L108 36 L150 28 L200 28 L228 36 L240 54 Z" fill="white" fillOpacity="0.6"/>
        <circle cx="78" cy="103" r="20" fill="white" fillOpacity="0.9"/>
        <circle cx="78" cy="103" r="11" fill={vehicle.colorTheme.secondary} />
        <circle cx="242" cy="103" r="20" fill="white" fillOpacity="0.9"/>
        <circle cx="242" cy="103" r="11" fill={vehicle.colorTheme.secondary} />
      </svg>
    </div>
  )
}

const specRows: { label: string; key: keyof Vehicle; icon: React.FC<{ className?: string }>; format?: (v: unknown) => string; isBar?: boolean; barMax?: number }[] = [
  { label: 'Power', key: 'horsepower', icon: Zap, format: v => `${v} HP`, isBar: true, barMax: 1600 },
  { label: 'Torque', key: 'torque', icon: Zap, format: v => `${v} Nm`, isBar: true, barMax: 1700 },
  { label: '0–100 km/h', key: 'acceleration', icon: Timer, format: v => `${v}s` },
  { label: 'Top Speed', key: 'topSpeed', icon: Gauge, format: v => `${v} km/h`, isBar: true, barMax: 450 },
  { label: 'Curb Weight', key: 'weight', icon: Weight, format: v => `${v} kg` },
  { label: 'Drivetrain', key: 'drivetrain', icon: GitFork, format: v => String(v) },
  { label: 'Engine', key: 'engineSize', icon: Fuel, format: v => String(v) },
  { label: 'Transmission', key: 'transmission', icon: GitFork, format: v => String(v).toUpperCase() },
  { label: 'Seats', key: 'seats', icon: Users, format: v => String(v) },
  { label: 'Price / Day', key: 'pricePerDay', icon: DollarSign, format: v => formatCurrency(Number(v)) },
  { label: 'Deposit', key: 'deposit', icon: Shield, format: v => formatCurrency(Number(v)) },
  { label: 'Condition Score', key: 'conditionScore', icon: Star, format: v => `${v}%`, isBar: true, barMax: 100 },
]

function getBest(cars: Vehicle[], key: keyof Vehicle, lowerIsBetter = false): string[] {
  const vals = cars.map(c => Number(c[key]))
  const best = lowerIsBetter ? Math.min(...vals) : Math.max(...vals)
  return cars.filter(c => Number(c[key]) === best).map(c => c.id)
}

function CompareContent() {
  const searchParams = useSearchParams()
  const paramIds = (searchParams.get('vehicles') ?? '').split(',').filter(Boolean)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const selected = paramIds
    .map(id => vehicles.find(v => v.id === id))
    .filter((v): v is Vehicle => !!v)
    .slice(0, 3)

  const bestHp = getBest(selected, 'horsepower')
  const bestAccel = getBest(selected, 'acceleration', true) // lower is better
  const bestSpeed = getBest(selected, 'topSpeed')
  const bestCondition = getBest(selected, 'conditionScore')
  const bestPrice = getBest(selected, 'pricePerDay', true) // lower is better

  function isBest(vehicleId: string, key: string): boolean {
    if (key === 'acceleration' || key === 'pricePerDay' || key === 'deposit' || key === 'weight')
      return getBest(selected, key as keyof Vehicle, true).includes(vehicleId)
    return getBest(selected, key as keyof Vehicle).includes(vehicleId)
  }

  if (selected.length < 2) {
    return (
      <div className="text-center py-24">
        <div className="text-5xl mb-4">⚖️</div>
        <h2 className="font-display text-4xl text-apex-white mb-3">SELECT VEHICLES TO COMPARE</h2>
        <p className="text-apex-silver mb-8 max-w-sm mx-auto">
          Choose at least 2 cars from the fleet to compare them side-by-side.
        </p>
        <Link
          href="/fleet"
          className="inline-flex items-center gap-2 px-8 py-4 bg-apex-red text-white text-sm font-bold uppercase tracking-widest hover:bg-apex-red-bright transition-colors"
        >
          Browse Fleet <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Vehicle headers */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className={`grid gap-6 ${selected.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}
      >
        {selected.map(vehicle => (
          <motion.div key={vehicle.id} variants={fadeInUp} className="space-y-4">
            <VehicleVisual
              vehicle={vehicle}
              imgError={!!errors[vehicle.id]}
              onError={() => setErrors(e => ({ ...e, [vehicle.id]: true }))}
            />
            <div>
              <p className="text-apex-silver text-xs uppercase tracking-widest">{vehicle.make} · {vehicle.year}</p>
              <h2 className="text-apex-white font-bold text-xl">{vehicle.model}</h2>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={vehicle.status === 'available' ? 'available' : vehicle.status === 'rented' ? 'rented' : 'maintenance'} dot>
                  {vehicle.status}
                </Badge>
                <span className="text-xs text-apex-silver">{categoryLabel(vehicle.category)}</span>
              </div>
            </div>
            {vehicle.status === 'available' && (
              <Link
                href={`/booking?vehicle=${vehicle.id}`}
                className="block w-full text-center py-2.5 bg-apex-red text-white text-xs font-bold uppercase tracking-widest hover:bg-apex-red-bright transition-colors"
              >
                Book This Car
              </Link>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Performance bars */}
      <div className="glass-card border border-apex-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-apex-border bg-apex-surface/30">
          <h3 className="text-apex-white font-bold text-xs uppercase tracking-wider">Performance Overview</h3>
        </div>
        <div className="p-5 space-y-6">
          {[
            { label: 'Power (HP)', key: 'horsepower', max: 1600 },
            { label: 'Top Speed (km/h)', key: 'topSpeed', max: 450 },
            { label: 'Condition Score', key: 'conditionScore', max: 100 },
          ].map(({ label, key, max }) => (
            <div key={key}>
              <p className="text-apex-silver text-xs uppercase tracking-wider mb-3">{label}</p>
              <div className="space-y-2">
                {selected.map(vehicle => {
                  const val = Number(vehicle[key as keyof Vehicle])
                  const pct = Math.round((val / max) * 100)
                  const best = isBest(vehicle.id, key)
                  return (
                    <div key={vehicle.id} className="flex items-center gap-3">
                      <span className="text-xs text-apex-silver w-24 truncate shrink-0">{vehicle.model}</span>
                      <div className="flex-1">
                        <ProgressBar value={pct} showValue={false} size="md" />
                      </div>
                      <span className={`text-xs font-bold w-16 text-right tabular-nums shrink-0 ${best ? 'text-green-400' : 'text-apex-silver'}`}>
                        {val.toLocaleString()} {best && '★'}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full spec table */}
      <div className="glass-card border border-apex-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-apex-border bg-apex-surface/30">
          <h3 className="text-apex-white font-bold text-xs uppercase tracking-wider">Full Specification Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apex-border">
                <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider text-apex-silver w-32">Spec</th>
                {selected.map(v => (
                  <th key={v.id} className="p-4 text-left text-xs font-semibold text-apex-white">
                    {v.make} {v.model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-apex-border/40">
              {specRows.map(({ label, key, icon: Icon, format }) => {
                const vals = selected.map(v => v[key])
                return (
                  <tr key={key} className="hover:bg-apex-surface/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-xs text-apex-silver">
                        <Icon className="w-3.5 h-3.5 text-apex-red shrink-0" />
                        {label}
                      </div>
                    </td>
                    {selected.map((vehicle, i) => {
                      const val = vals[i]
                      const formatted = format ? format(val) : String(val)
                      const best = isBest(vehicle.id, key)
                      return (
                        <td key={vehicle.id} className="p-4">
                          <span className={`text-sm font-semibold ${best && selected.length > 1 ? 'text-green-400' : 'text-apex-white'}`}>
                            {formatted}
                            {best && selected.length > 1 && <span className="ml-1 text-[10px]">★</span>}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-apex-border text-xs text-apex-silver">
          <span className="inline-flex items-center gap-1"><span className="text-green-400">★</span> Best in comparison</span>
        </div>
      </div>

      {/* Feature comparison */}
      <div className="glass-card border border-apex-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-apex-border bg-apex-surface/30">
          <h3 className="text-apex-white font-bold text-xs uppercase tracking-wider">Features Comparison</h3>
        </div>
        <div className="p-5">
          {(() => {
            const allFeatures = [...new Set(selected.flatMap(v => v.features))].sort()
            return (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-apex-border">
                      <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider text-apex-silver">Feature</th>
                      {selected.map(v => (
                        <th key={v.id} className="pb-3 text-center text-xs font-semibold text-apex-white px-4">
                          {v.model}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-apex-border/30">
                    {allFeatures.map(feature => (
                      <tr key={feature} className="hover:bg-apex-surface/20 transition-colors">
                        <td className="py-2.5 pr-4 text-xs text-apex-silver">{feature}</td>
                        {selected.map(vehicle => (
                          <td key={vehicle.id} className="py-2.5 text-center px-4">
                            {vehicle.features.includes(feature) ? (
                              <Check className="w-4 h-4 text-green-400 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 text-apex-silver/30 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          })()}
        </div>
      </div>
    </div>
  )
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-apex-void pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <Link href="/fleet" className="inline-flex items-center gap-1.5 text-apex-silver hover:text-apex-white transition-colors text-sm mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Fleet
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-apex-red" />
            <span className="text-apex-red text-xs font-bold uppercase tracking-[0.3em]">Side-by-Side</span>
          </div>
          <h1 className="font-display text-6xl text-apex-white tracking-wide">COMPARE CARS</h1>
        </motion.div>

        <Suspense fallback={<div className="text-apex-silver text-center py-20">Loading comparison...</div>}>
          <CompareContent />
        </Suspense>
      </div>
    </div>
  )
}
