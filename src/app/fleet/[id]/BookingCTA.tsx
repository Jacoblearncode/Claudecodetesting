'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, Clock, Shield } from 'lucide-react'
import { Vehicle } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface Props {
  vehicle: Vehicle
}

export default function BookingCTA({ vehicle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass-card border border-apex-border rounded-xl overflow-hidden"
    >
      {/* Price header */}
      <div className="p-6 border-b border-apex-border bg-apex-surface/30">
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-4xl font-bold text-apex-white">{formatCurrency(vehicle.pricePerDay)}</span>
          <span className="text-apex-silver">/ day</span>
        </div>
        <div className="text-xs text-apex-silver">
          Security deposit: {formatCurrency(vehicle.deposit)}
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Trust badges */}
        <div className="space-y-2">
          {[
            { icon: Shield, text: vehicle.insuranceIncluded ? 'Insurance included' : 'Insurance required' },
            { icon: Clock, text: 'Flexible pickup & return' },
            { icon: Star, text: '5-star service guarantee' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs text-apex-silver">
              <Icon className="w-3.5 h-3.5 text-apex-red shrink-0" />
              {text}
            </div>
          ))}
        </div>

        {/* CTA */}
        {vehicle.status === 'available' ? (
          <Link
            href={`/booking?vehicle=${vehicle.id}`}
            className="group flex items-center justify-center gap-2 w-full px-6 py-4 bg-apex-red text-white text-sm font-bold uppercase tracking-widest hover:bg-apex-red-bright transition-all shadow-red-glow hover:shadow-red-glow"
          >
            Book This Car
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div className="w-full px-6 py-4 bg-apex-surface border border-apex-border text-center text-sm text-apex-silver uppercase tracking-widest">
            Currently {vehicle.status === 'rented' ? 'Rented Out' : 'Unavailable'}
          </div>
        )}

        <Link
          href="/fleet"
          className="block text-center text-xs text-apex-silver hover:text-apex-white transition-colors uppercase tracking-widest"
        >
          ← Back to Fleet
        </Link>

        {/* Contact */}
        <div className="pt-4 border-t border-apex-border">
          <p className="text-xs text-apex-silver text-center mb-3">Need assistance?</p>
          <a
            href="tel:+37767000001"
            className="block text-center text-sm font-semibold text-apex-white hover:text-apex-red transition-colors"
          >
            +377 67 000 001
          </a>
        </div>
      </div>
    </motion.div>
  )
}
