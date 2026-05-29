'use client'
import { useState } from 'react'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { VehicleCategory, VehicleStatus, Transmission } from '@/types'

export interface FilterState {
  search: string
  category: VehicleCategory | 'all'
  status: VehicleStatus | 'all'
  transmission: Transmission | 'all'
  maxPrice: number
  minHp: number
  sortBy: 'price-asc' | 'price-desc' | 'hp-desc' | 'speed-desc' | 'name'
}

const defaultFilters: FilterState = {
  search: '',
  category: 'all',
  status: 'all',
  transmission: 'all',
  maxPrice: 10000,
  minHp: 0,
  sortBy: 'price-asc',
}

interface Props {
  filters: FilterState
  onChange: (f: FilterState) => void
  resultCount: number
}

function SelectChip({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  onChange: (v: string) => void
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none glass-surface border border-apex-border rounded px-3 py-2 text-xs font-semibold uppercase tracking-wider text-apex-light bg-transparent cursor-pointer pr-7 hover:border-apex-muted focus:border-apex-red focus:outline-none transition-colors"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-apex-surface text-apex-white">
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-apex-silver pointer-events-none" />
    </div>
  )
}

export default function FleetFilters({ filters, onChange, resultCount }: Props) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const hasActive =
    filters.category !== 'all' ||
    filters.status !== 'all' ||
    filters.transmission !== 'all' ||
    filters.maxPrice !== 10000 ||
    filters.minHp !== 0 ||
    filters.search !== ''

  const reset = () => onChange({ ...defaultFilters })

  return (
    <div className="glass-card border border-apex-border rounded-xl p-5 space-y-4">
      {/* Top row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search make or model..."
            value={filters.search}
            onChange={e => onChange({ ...filters, search: e.target.value })}
            className="w-full bg-apex-surface border border-apex-border rounded px-4 py-2.5 text-sm text-apex-white placeholder:text-apex-silver/50 focus:outline-none focus:border-apex-red transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => onChange({ ...filters, search: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-apex-silver hover:text-apex-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort */}
        <SelectChip
          label="Sort"
          value={filters.sortBy}
          options={[
            { value: 'price-asc', label: 'Price: Low–High' },
            { value: 'price-desc', label: 'Price: High–Low' },
            { value: 'hp-desc', label: 'Most Powerful' },
            { value: 'speed-desc', label: 'Fastest First' },
            { value: 'name', label: 'A–Z' },
          ]}
          onChange={v => onChange({ ...filters, sortBy: v as FilterState['sortBy'] })}
        />

        {/* Toggle advanced */}
        <button
          onClick={() => setShowAdvanced(v => !v)}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border rounded transition-colors',
            showAdvanced
              ? 'bg-apex-red/10 border-apex-red/30 text-apex-red'
              : 'border-apex-border text-apex-silver hover:border-apex-muted hover:text-apex-light'
          )}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
          {hasActive && <span className="w-1.5 h-1.5 rounded-full bg-apex-red" />}
        </button>
      </div>

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="pt-4 border-t border-apex-border/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SelectChip
            label="Category"
            value={filters.category}
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'hypercar', label: 'Hypercar' },
              { value: 'supercar', label: 'Supercar' },
              { value: 'sports', label: 'Sports Car' },
              { value: 'gt', label: 'Grand Tourer' },
            ]}
            onChange={v => onChange({ ...filters, category: v as FilterState['category'] })}
          />

          <SelectChip
            label="Availability"
            value={filters.status}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'available', label: 'Available Now' },
              { value: 'rented', label: 'Currently Rented' },
              { value: 'maintenance', label: 'In Maintenance' },
            ]}
            onChange={v => onChange({ ...filters, status: v as FilterState['status'] })}
          />

          <SelectChip
            label="Transmission"
            value={filters.transmission}
            options={[
              { value: 'all', label: 'All Transmissions' },
              { value: 'dct', label: 'DCT (Dual Clutch)' },
              { value: 'pdk', label: 'PDK (Porsche)' },
              { value: 'automatic', label: 'Automatic' },
              { value: 'manual', label: 'Manual' },
            ]}
            onChange={v => onChange({ ...filters, transmission: v as FilterState['transmission'] })}
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-apex-silver">
              Max Price: {filters.maxPrice >= 10000 ? 'Any' : `€${filters.maxPrice.toLocaleString()}/day`}
            </label>
            <input
              type="range"
              min={500}
              max={10000}
              step={100}
              value={filters.maxPrice}
              onChange={e => onChange({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full accent-apex-red h-1 bg-apex-surface rounded-full cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Footer row */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-apex-silver">
          <span className="text-apex-white font-semibold">{resultCount}</span> vehicle{resultCount !== 1 ? 's' : ''} found
        </span>
        {hasActive && (
          <button
            onClick={reset}
            className="text-xs text-apex-red hover:text-apex-red-bright flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
