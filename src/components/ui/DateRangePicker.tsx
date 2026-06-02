'use client'
import { useState, useRef, useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import { format, startOfDay, isBefore } from 'date-fns'
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type DateRange = { from?: Date; to?: Date }

interface Props {
  value: DateRange
  onChange: (r: DateRange) => void
  bookedRanges?: { from: Date; to: Date }[]
  className?: string
}

export default function DateRangePicker({ value, onChange, bookedRanges = [], className }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const today = startOfDay(new Date())

  // Build disabled days: past dates + booked ranges
  const disabled: Parameters<typeof DayPicker>[0]['disabled'] = [
    { before: today },
    ...bookedRanges.map(r => ({ from: r.from, to: r.to })),
  ]

  const label =
    value.from && value.to
      ? `${format(value.from, 'dd MMM')} → ${format(value.to, 'dd MMM yyyy')}`
      : value.from
      ? `${format(value.from, 'dd MMM yyyy')} → pick return`
      : 'Select dates'

  const nights =
    value.from && value.to
      ? Math.ceil((value.to.getTime() - value.from.getTime()) / 86400000)
      : 0

  return (
    <div ref={ref} className={cn('relative', className)}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={cn(
          'w-full flex items-center gap-3 px-4 py-3 bg-apex-surface border rounded text-sm transition-colors text-left',
          open ? 'border-apex-red' : 'border-apex-border hover:border-apex-muted'
        )}
      >
        <Calendar className="w-4 h-4 text-apex-red shrink-0" />
        <span className={value.from ? 'text-apex-white' : 'text-apex-silver/50'}>{label}</span>
        {nights > 0 && (
          <span className="ml-auto text-xs text-apex-red font-semibold shrink-0">
            {nights} night{nights !== 1 ? 's' : ''}
          </span>
        )}
        {(value.from || value.to) && (
          <span
            role="button"
            onClick={e => { e.stopPropagation(); onChange({}) }}
            className="text-apex-silver hover:text-apex-white transition-colors"
            aria-label="Clear dates"
          >
            <X className="w-3.5 h-3.5" />
          </span>
        )}
      </button>

      {/* Calendar popover */}
      {open && (
        <div className="absolute top-full left-0 z-50 mt-2 w-auto glass-card border border-apex-border rounded-xl shadow-card overflow-hidden p-4 rdp-dark">
          <DayPicker
            mode="range"
            selected={{ from: value.from, to: value.to }}
            onSelect={(range) => {
              onChange({ from: range?.from, to: range?.to })
              if (range?.from && range?.to) setOpen(false)
            }}
            numberOfMonths={2}
            disabled={disabled}
            showOutsideDays={false}
            classNames={{
              root: 'text-apex-white select-none',
              months: 'flex gap-6 flex-wrap',
              month: 'space-y-3',
              month_caption: 'flex justify-center items-center h-8 relative mb-2',
              caption_label: 'text-sm font-semibold text-apex-white tracking-wide uppercase',
              nav: 'flex items-center gap-1',
              button_previous: 'absolute left-0 p-1.5 text-apex-silver hover:text-apex-white hover:bg-apex-surface rounded transition-colors',
              button_next: 'absolute right-0 p-1.5 text-apex-silver hover:text-apex-white hover:bg-apex-surface rounded transition-colors',
              weeks: 'w-full border-collapse',
              weekdays: 'flex',
              weekday: 'w-9 text-center text-[10px] font-semibold uppercase tracking-wider text-apex-silver pb-2',
              week: 'flex',
              day: 'w-9 h-9 text-center text-sm p-0 relative',
              day_button: cn(
                'w-9 h-9 rounded font-medium transition-all duration-150 hover:bg-apex-surface',
                'focus:outline-none focus:ring-1 focus:ring-apex-red'
              ),
              selected: 'bg-apex-red text-white rounded',
              range_start: '!bg-apex-red text-white rounded-l',
              range_end: '!bg-apex-red text-white rounded-r',
              range_middle: 'bg-apex-red/15 text-apex-white rounded-none',
              today: 'font-bold text-apex-red',
              outside: 'text-apex-silver/30 pointer-events-none',
              disabled: 'text-apex-silver/20 pointer-events-none line-through',
              hidden: 'invisible',
            }}
          />

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-apex-border flex items-center gap-4 text-[10px] text-apex-silver">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-apex-red" />
              Selected
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-apex-red/15" />
              In range
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-apex-surface border border-apex-border" />
              Unavailable
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
