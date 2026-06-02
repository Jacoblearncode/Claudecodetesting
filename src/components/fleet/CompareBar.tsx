'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { X, GitCompare, ArrowRight } from 'lucide-react'
import { useComparison } from '@/hooks/useComparison'
import { vehicles } from '@/data/vehicles'
import { useState } from 'react'

export default function CompareBar() {
  const { ids, remove, clear } = useComparison()
  const selected = ids.map(id => vehicles.find(v => v.id === id)).filter(Boolean)

  return (
    <AnimatePresence>
      {selected.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
        >
          <div className="glass-card border border-apex-border rounded-2xl p-4 shadow-card flex items-center gap-3 backdrop-blur-xl">
            <GitCompare className="w-5 h-5 text-apex-red shrink-0" />

            {/* Selected vehicles */}
            <div className="flex items-center gap-2 flex-1 overflow-x-auto no-scrollbar">
              {selected.map(vehicle => vehicle && (
                <div key={vehicle.id} className="flex items-center gap-2 bg-apex-surface border border-apex-border rounded-lg px-3 py-1.5 shrink-0">
                  {vehicle.imageUrl ? (
                    <div className="relative w-8 h-5 rounded overflow-hidden shrink-0">
                      <Image src={vehicle.imageUrl} alt={vehicle.model} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-8 h-5 rounded shrink-0" style={{ background: `linear-gradient(135deg, ${vehicle.colorTheme.primary}, ${vehicle.colorTheme.secondary})` }} />
                  )}
                  <span className="text-apex-white text-xs font-semibold whitespace-nowrap">{vehicle.model}</span>
                  <button onClick={() => remove(vehicle.id)} className="text-apex-silver hover:text-apex-white transition-colors ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {/* Empty slots */}
              {Array.from({ length: Math.max(0, 3 - selected.length) }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 bg-apex-surface/30 border border-dashed border-apex-border rounded-lg px-3 py-1.5 shrink-0">
                  <span className="text-apex-silver/40 text-xs whitespace-nowrap">+ Add car</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={clear}
                className="text-xs text-apex-silver hover:text-apex-white transition-colors px-2 py-1.5"
              >
                Clear
              </button>
              <Link
                href={`/compare?vehicles=${ids.join(',')}`}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                  selected.length >= 2
                    ? 'bg-apex-red text-white hover:bg-apex-red-bright shadow-red-glow-sm'
                    : 'bg-apex-surface border border-apex-border text-apex-silver cursor-not-allowed'
                }`}
              >
                Compare {selected.length >= 2 ? `(${selected.length})` : ''}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
