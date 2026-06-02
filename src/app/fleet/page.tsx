'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import VehicleCard from '@/components/fleet/VehicleCard'
import CompareBar from '@/components/fleet/CompareBar'
import FleetFilters, { FilterState } from '@/components/fleet/FleetFilters'
import { vehicles } from '@/data/vehicles'
import { staggerContainer, fadeInUp } from '@/lib/animations'

const defaultFilters: FilterState = {
  search: '',
  category: 'all',
  status: 'all',
  transmission: 'all',
  maxPrice: 10000,
  minHp: 0,
  sortBy: 'price-asc',
}

export default function FleetPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)

  const filtered = useMemo(() => {
    let list = [...vehicles]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(v =>
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.category.includes(q)
      )
    }
    if (filters.category !== 'all') list = list.filter(v => v.category === filters.category)
    if (filters.status !== 'all') list = list.filter(v => v.status === filters.status)
    if (filters.transmission !== 'all') list = list.filter(v => v.transmission === filters.transmission)
    if (filters.maxPrice < 10000) list = list.filter(v => v.pricePerDay <= filters.maxPrice)

    switch (filters.sortBy) {
      case 'price-asc': list.sort((a, b) => a.pricePerDay - b.pricePerDay); break
      case 'price-desc': list.sort((a, b) => b.pricePerDay - a.pricePerDay); break
      case 'hp-desc': list.sort((a, b) => b.horsepower - a.horsepower); break
      case 'speed-desc': list.sort((a, b) => b.topSpeed - a.topSpeed); break
      case 'name': list.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`)); break
    }

    return list
  }, [filters])

  return (
    <div className="min-h-screen bg-apex-void pt-24 pb-16">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-apex-red" />
            <span className="text-apex-red text-xs font-bold uppercase tracking-[0.3em]">Our Collection</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h1 className="font-display text-6xl md:text-7xl text-apex-white tracking-wide">THE FLEET</h1>
            <p className="text-apex-silver max-w-sm text-sm leading-relaxed">
              {vehicles.length} extraordinary machines. Each one a masterpiece of engineering, design, and performance.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Category tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {(['all', 'hypercar', 'supercar', 'sports', 'gt'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilters(f => ({ ...f, category: cat }))}
              className={`shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded border transition-all ${
                filters.category === cat
                  ? 'bg-apex-red text-white border-apex-red shadow-red-glow-sm'
                  : 'bg-transparent text-apex-silver border-apex-border hover:border-apex-muted hover:text-apex-white'
              }`}
            >
              {cat === 'all' ? 'All Vehicles' : cat === 'gt' ? 'Grand Tourer' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-8">
          <FleetFilters filters={filters} onChange={setFilters} resultCount={filtered.length} />
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-apex-silver text-lg mb-2">No vehicles match your criteria.</p>
            <button
              onClick={() => setFilters(defaultFilters)}
              className="text-apex-red text-sm hover:text-apex-red-bright transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.map(vehicle => (
              <motion.div key={vehicle.id} variants={fadeInUp}>
                <VehicleCard vehicle={vehicle} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <CompareBar />
    </div>
  )
}
