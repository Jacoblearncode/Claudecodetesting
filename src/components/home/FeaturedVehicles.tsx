'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap, Gauge, Timer } from 'lucide-react'
import { getFeaturedVehicles } from '@/data/vehicles'
import { Vehicle } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { staggerContainer, fadeInUp } from '@/lib/animations'

function VehicleVisual({ vehicle }: { vehicle: Vehicle }) {
  const [imgError, setImgError] = useState(false)
  const { primary, secondary, accent } = vehicle.colorTheme

  if (vehicle.imageUrl && !imgError) {
    return (
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-lg">
        <Image
          src={vehicle.imageUrl}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-apex-void/70 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-white/10 rounded">
          <span className="text-white text-xs font-bold">{formatCurrency(vehicle.pricePerDay)}</span>
          <span className="text-white/50 text-xs"> / day</span>
        </div>
      </div>
    )
  }

  // Gradient fallback
  return (
    <div
      className="relative w-full aspect-[16/9] rounded-t-lg overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)` }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 320 130" className="w-3/4 opacity-90" fill="none">
          <path d="M20 90 L55 90 L65 70 L90 58 L170 54 L220 54 L260 62 L285 78 L300 90 L310 90 L312 100 L18 100 Z" fill="white" fillOpacity="0.85"/>
          <path d="M93 54 L108 36 L150 28 L200 28 L228 36 L240 54 Z" fill="white" fillOpacity="0.6"/>
          <circle cx="78" cy="103" r="20" fill="white" fillOpacity="0.9"/>
          <circle cx="78" cy="103" r="11" fill={secondary} />
          <circle cx="242" cy="103" r="20" fill="white" fillOpacity="0.9"/>
          <circle cx="242" cy="103" r="11" fill={secondary} />
        </svg>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-20" style={{ background: accent }} />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-white/10 rounded">
        <span className="text-white text-xs font-bold">{formatCurrency(vehicle.pricePerDay)}</span>
        <span className="text-white/50 text-xs"> / day</span>
      </div>
    </div>
  )
}

export default function FeaturedVehicles() {
  const featured = getFeaturedVehicles()

  return (
    <section className="py-24 bg-apex-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-apex-red" />
              <span className="text-apex-red text-xs font-bold uppercase tracking-[0.3em]">Premium Selection</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-apex-white tracking-wide">
              FEATURED FLEET
            </h2>
          </div>
          <Link
            href="/fleet"
            className="group inline-flex items-center gap-2 text-sm text-apex-silver hover:text-apex-white transition-colors font-semibold uppercase tracking-widest"
          >
            View All Vehicles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {featured.map(vehicle => (
            <motion.div key={vehicle.id} variants={fadeInUp}>
              <Link href={`/fleet/${vehicle.id}`} className="group block">
                <div className="glass-card rounded-xl overflow-hidden border border-apex-border hover:border-apex-red/30 transition-all duration-500 hover:shadow-card-hover">
                  <VehicleVisual vehicle={vehicle} />

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="text-apex-silver text-xs uppercase tracking-widest mb-0.5">{vehicle.make}</p>
                        <h3 className="text-apex-white font-bold text-lg leading-tight">{vehicle.model}</h3>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${
                        vehicle.status === 'available'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {vehicle.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 py-3 border-y border-apex-border/50 mb-4">
                      <div className="flex items-center gap-1.5 text-xs text-apex-silver">
                        <Zap className="w-3.5 h-3.5 text-apex-red" />
                        <span>{vehicle.horsepower} HP</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-apex-silver">
                        <Timer className="w-3.5 h-3.5 text-apex-red" />
                        <span>0-100 in {vehicle.acceleration}s</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-apex-silver">
                        <Gauge className="w-3.5 h-3.5 text-apex-red" />
                        <span>{vehicle.topSpeed} km/h</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-apex-white font-bold text-xl">{formatCurrency(vehicle.pricePerDay)}</span>
                        <span className="text-apex-silver text-xs ml-1">/ day</span>
                      </div>
                      <div className="flex items-center gap-1 text-apex-red text-xs font-semibold uppercase tracking-wider group-hover:gap-2 transition-all">
                        Details <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
