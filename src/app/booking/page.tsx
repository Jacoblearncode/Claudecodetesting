'use client'
import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, User, Phone, Mail, ChevronDown, Check, ArrowRight, Car } from 'lucide-react'
import Image from 'next/image'
import { vehicles } from '@/data/vehicles'
import { bookings } from '@/data/maintenance'
import { formatCurrency } from '@/lib/utils'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import DateRangePicker, { DateRange } from '@/components/ui/DateRangePicker'

const extras = [
  { id: 'gps', label: 'GPS Navigation', price: 25 },
  { id: 'helmet', label: 'Racing Helmet', price: 50 },
  { id: 'driver', label: 'Additional Driver', price: 100 },
  { id: 'photo', label: 'Photography Package', price: 200 },
  { id: 'concierge', label: 'Concierge Service', price: 300 },
  { id: 'delivery', label: 'Hotel/Yacht Delivery', price: 150 },
]

const locations = [
  'Apex Motors — Monaco Showroom',
  'Monaco Grand Hotel',
  'Port Hercule (Yacht Delivery)',
  'Nice Côte d\'Azur Airport',
  'Monte-Carlo Casino Square',
]

interface FormData {
  vehicleId: string
  dateRange: DateRange
  pickupLocation: string
  returnLocation: string
  name: string
  email: string
  phone: string
  extras: string[]
  notes: string
}

function BookingForm() {
  const searchParams = useSearchParams()
  const preselectedId = searchParams.get('vehicle') || ''

  const [form, setForm] = useState<FormData>({
    vehicleId: preselectedId,
    dateRange: {},
    pickupLocation: locations[0],
    returnLocation: locations[0],
    name: '',
    email: '',
    phone: '',
    extras: [],
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [step, setStep] = useState(1)

  const selectedVehicle = useMemo(() => vehicles.find(v => v.id === form.vehicleId), [form.vehicleId])

  // Build booked ranges for the selected vehicle to block in the calendar
  const bookedRanges = useMemo(() => {
    if (!form.vehicleId) return []
    return bookings
      .filter(b => b.vehicleId === form.vehicleId && (b.status === 'active' || b.status === 'confirmed'))
      .map(b => ({ from: new Date(b.pickupDate), to: new Date(b.returnDate) }))
  }, [form.vehicleId])

  const totalDays = useMemo(() => {
    const { from, to } = form.dateRange
    if (!from || !to) return 0
    return Math.max(0, Math.ceil((to.getTime() - from.getTime()) / 86400000))
  }, [form.dateRange])

  const extrasTotal = form.extras.reduce((sum, id) => {
    const extra = extras.find(e => e.id === id)
    return sum + (extra?.price ?? 0) * totalDays
  }, 0)

  const vehicleTotal = (selectedVehicle?.pricePerDay ?? 0) * totalDays
  const totalPrice = vehicleTotal + extrasTotal

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm(f => ({ ...f, [key]: value }))

  const toggleExtra = (id: string) =>
    update('extras', form.extras.includes(id) ? form.extras.filter(e => e !== id) : [...form.extras, id])

  const datesValid = !!(form.dateRange.from && form.dateRange.to && totalDays > 0)

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="font-display text-4xl text-apex-white mb-3">BOOKING CONFIRMED</h2>
        <p className="text-apex-silver mb-2">Thank you, {form.name}.</p>
        <p className="text-apex-silver text-sm max-w-md mx-auto mb-8">
          Your booking request has been received. Our concierge team will contact you within 30 minutes at {form.email} to confirm all details.
        </p>
        {selectedVehicle && (
          <div className="inline-block glass-card border border-apex-border rounded-xl px-8 py-4 mb-8">
            <p className="text-apex-silver text-xs uppercase tracking-widest mb-1">Reserved Vehicle</p>
            <p className="text-apex-white font-bold text-xl">{selectedVehicle.make} {selectedVehicle.model}</p>
            <p className="text-apex-red font-semibold mt-1">{formatCurrency(totalPrice)} total</p>
          </div>
        )}
        <button
          onClick={() => { setSubmitted(false); setStep(1); setForm(f => ({ ...f, name: '', email: '', phone: '', extras: [], notes: '', dateRange: {} })) }}
          className="text-apex-red text-sm hover:text-apex-red-bright transition-colors uppercase tracking-widest font-semibold"
        >
          New Booking →
        </button>
      </motion.div>
    )
  }

  const inputClass = 'w-full bg-apex-surface border border-apex-border rounded px-4 py-3 text-sm text-apex-white placeholder:text-apex-silver/40 focus:outline-none focus:border-apex-red transition-colors'
  const labelClass = 'block text-xs font-semibold uppercase tracking-widest text-apex-silver mb-2'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Form */}
      <div className="lg:col-span-3">
        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-8">
          {[
            { n: 1, label: 'Vehicle & Dates' },
            { n: 2, label: 'Your Details' },
            { n: 3, label: 'Extras' },
          ].map(({ n, label }, i, arr) => (
            <div key={n} className="flex items-center gap-0 flex-1">
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => step > n && setStep(n)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                    n < step ? 'bg-green-500 border-green-500 text-white' :
                    n === step ? 'bg-apex-red border-apex-red text-white' :
                    'bg-apex-surface border-apex-border text-apex-silver'
                  }`}
                >
                  {n < step ? <Check className="w-3.5 h-3.5" /> : n}
                </button>
                <span className="text-[10px] text-apex-silver hidden sm:block whitespace-nowrap">{label}</span>
              </div>
              {i < arr.length - 1 && <div className={`flex-1 h-px mb-4 ${n < step ? 'bg-green-500/40' : 'bg-apex-border'}`} />}
            </div>
          ))}
        </div>

        <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="space-y-6">
          {/* ── Step 1 ── */}
          {step === 1 && (
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-5">
              <motion.h2 variants={fadeInUp} className="font-display text-3xl text-apex-white tracking-wide">
                SELECT VEHICLE & DATES
              </motion.h2>

              {/* Vehicle select */}
              <motion.div variants={fadeInUp}>
                <label className={labelClass}>Select Vehicle</label>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apex-silver pointer-events-none z-10" />
                  <select
                    value={form.vehicleId}
                    onChange={e => { update('vehicleId', e.target.value); update('dateRange', {}) }}
                    required
                    className={`${inputClass} pl-10 appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-apex-surface">Choose your dream car...</option>
                    {vehicles.filter(v => v.status === 'available').map(v => (
                      <option key={v.id} value={v.id} className="bg-apex-surface">
                        {v.make} {v.model} ({v.year}) — {formatCurrency(v.pricePerDay)}/day
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apex-silver pointer-events-none" />
                </div>
                {/* Vehicle preview strip */}
                {selectedVehicle && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-center gap-3 p-3 bg-apex-surface/50 border border-apex-border rounded-lg"
                  >
                    {selectedVehicle.imageUrl ? (
                      <div className="relative w-16 h-10 rounded overflow-hidden shrink-0">
                        <Image src={selectedVehicle.imageUrl} alt={selectedVehicle.model} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-10 rounded shrink-0" style={{ background: `linear-gradient(135deg, ${selectedVehicle.colorTheme.primary}, ${selectedVehicle.colorTheme.secondary})` }} />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-apex-white font-semibold text-sm">{selectedVehicle.make} {selectedVehicle.model}</p>
                      <p className="text-apex-silver text-xs">{selectedVehicle.horsepower} HP · {selectedVehicle.acceleration}s · {selectedVehicle.topSpeed} km/h</p>
                    </div>
                    <p className="text-apex-red font-bold text-sm shrink-0">{formatCurrency(selectedVehicle.pricePerDay)}<span className="text-apex-silver font-normal text-xs">/day</span></p>
                  </motion.div>
                )}
              </motion.div>

              {/* Date range picker */}
              <motion.div variants={fadeInUp}>
                <label className={labelClass}>Rental Dates</label>
                <DateRangePicker
                  value={form.dateRange}
                  onChange={range => update('dateRange', range)}
                  bookedRanges={bookedRanges}
                />
                {bookedRanges.length > 0 && (
                  <p className="text-xs text-apex-silver mt-1.5">
                    ⚠ {bookedRanges.length} date range{bookedRanges.length > 1 ? 's' : ''} already booked — shown as unavailable in the calendar.
                  </p>
                )}
              </motion.div>

              {/* Locations */}
              <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apex-silver pointer-events-none" />
                    <select
                      value={form.pickupLocation}
                      onChange={e => update('pickupLocation', e.target.value)}
                      className={`${inputClass} pl-10 appearance-none cursor-pointer`}
                    >
                      {locations.map(l => <option key={l} value={l} className="bg-apex-surface">{l}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apex-silver pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Return Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apex-silver pointer-events-none" />
                    <select
                      value={form.returnLocation}
                      onChange={e => update('returnLocation', e.target.value)}
                      className={`${inputClass} pl-10 appearance-none cursor-pointer`}
                    >
                      {locations.map(l => <option key={l} value={l} className="bg-apex-surface">{l}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apex-silver pointer-events-none" />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!form.vehicleId || !datesValid}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-apex-red text-white text-sm font-bold uppercase tracking-widest hover:bg-apex-red-bright transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-5">
              <motion.h2 variants={fadeInUp} className="font-display text-3xl text-apex-white tracking-wide">
                YOUR DETAILS
              </motion.h2>

              <motion.div variants={fadeInUp}>
                <label className={labelClass}>Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apex-silver pointer-events-none" />
                  <input type="text" placeholder="Your full name" value={form.name} onChange={e => update('name', e.target.value)} required className={`${inputClass} pl-10`} />
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apex-silver pointer-events-none" />
                    <input type="email" placeholder="your@email.com" value={form.email} onChange={e => update('email', e.target.value)} required className={`${inputClass} pl-10`} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apex-silver pointer-events-none" />
                    <input type="tel" placeholder="+1 234 567 8900" value={form.phone} onChange={e => update('phone', e.target.value)} required className={`${inputClass} pl-10`} />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label className={labelClass}>Additional Notes (Optional)</label>
                <textarea placeholder="Special requests, preferences, or questions..." value={form.notes} onChange={e => update('notes', e.target.value)} rows={3} className={`${inputClass} resize-none`} />
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="flex-1 px-6 py-4 border border-apex-border text-apex-silver text-sm font-semibold uppercase tracking-widest hover:border-apex-muted hover:text-apex-white transition-colors">Back</button>
                <button type="button" onClick={() => setStep(3)} disabled={!form.name || !form.email || !form.phone} className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-apex-red text-white text-sm font-bold uppercase tracking-widest hover:bg-apex-red-bright transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* ── Step 3 ── */}
          {step === 3 && (
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-5">
              <motion.h2 variants={fadeInUp} className="font-display text-3xl text-apex-white tracking-wide">OPTIONAL EXTRAS</motion.h2>
              <motion.p variants={fadeInUp} className="text-apex-silver text-sm">Enhance your experience with premium add-ons.</motion.p>

              <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {extras.map(extra => {
                  const selected = form.extras.includes(extra.id)
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra.id)}
                      className={`flex items-center justify-between px-4 py-3 rounded border text-left transition-all ${selected ? 'bg-apex-red/10 border-apex-red/40 text-apex-white' : 'bg-apex-surface border-apex-border text-apex-silver hover:border-apex-muted hover:text-apex-white'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${selected ? 'bg-apex-red border-apex-red' : 'border-apex-border'}`}>
                          {selected && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className="text-sm font-medium">{extra.label}</span>
                      </div>
                      <span className="text-xs font-bold text-apex-red">+€{extra.price}/day</span>
                    </button>
                  )
                })}
              </motion.div>

              <motion.div variants={fadeInUp} className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="flex-1 px-6 py-4 border border-apex-border text-apex-silver text-sm font-semibold uppercase tracking-widest hover:border-apex-muted hover:text-apex-white transition-colors">Back</button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-apex-red text-white text-sm font-bold uppercase tracking-widest hover:bg-apex-red-bright transition-colors shadow-red-glow">
                  Confirm Booking <Check className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </form>
      </div>

      {/* Booking summary sidebar */}
      <div className="lg:col-span-2">
        <div className="sticky top-24">
          <div className="glass-card border border-apex-border rounded-xl overflow-hidden">
            <div className="p-5 border-b border-apex-border bg-apex-surface/30">
              <h3 className="text-xs font-bold uppercase tracking-widest text-apex-silver">Booking Summary</h3>
            </div>
            <div className="p-5 space-y-4">
              {selectedVehicle ? (
                <div className="flex items-start gap-3 pb-4 border-b border-apex-border">
                  {selectedVehicle.imageUrl ? (
                    <div className="relative w-16 h-10 rounded overflow-hidden shrink-0">
                      <Image src={selectedVehicle.imageUrl} alt={selectedVehicle.model} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-10 rounded shrink-0" style={{ background: `linear-gradient(135deg, ${selectedVehicle.colorTheme.primary}, ${selectedVehicle.colorTheme.secondary})` }} />
                  )}
                  <div>
                    <p className="text-apex-white font-semibold">{selectedVehicle.make} {selectedVehicle.model}</p>
                    <p className="text-apex-silver text-xs">{formatCurrency(selectedVehicle.pricePerDay)}/day</p>
                  </div>
                </div>
              ) : (
                <p className="text-apex-silver text-sm py-2">No vehicle selected</p>
              )}

              {form.dateRange.from && form.dateRange.to && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-apex-silver">Pickup</span>
                    <span className="text-apex-white">{form.dateRange.from.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-apex-silver">Return</span>
                    <span className="text-apex-white">{form.dateRange.to.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-apex-silver">Duration</span>
                    <span className="text-apex-white font-semibold">{totalDays} night{totalDays !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              )}

              {selectedVehicle && totalDays > 0 && (
                <div className="space-y-2 pt-4 border-t border-apex-border text-sm">
                  <div className="flex justify-between">
                    <span className="text-apex-silver">Vehicle ({totalDays}d)</span>
                    <span className="text-apex-white">{formatCurrency(vehicleTotal)}</span>
                  </div>
                  {form.extras.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-apex-silver">Extras</span>
                      <span className="text-apex-white">{formatCurrency(extrasTotal)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-apex-border">
                    <span className="text-apex-white font-bold">Total</span>
                    <span className="text-apex-red font-bold text-xl">{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-apex-silver">+ Deposit (refundable)</span>
                    <span className="text-apex-silver">{formatCurrency(selectedVehicle.deposit)}</span>
                  </div>
                </div>
              )}

              {form.extras.length > 0 && (
                <div className="pt-3 border-t border-apex-border">
                  <p className="text-xs font-semibold uppercase tracking-wider text-apex-silver mb-2">Selected Extras</p>
                  {form.extras.map(id => {
                    const extra = extras.find(e => e.id === id)
                    return extra ? (
                      <div key={id} className="flex items-center gap-1.5 text-xs text-apex-light mb-1">
                        <Check className="w-3 h-3 text-green-400" />{extra.label}
                      </div>
                    ) : null
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-apex-void pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-apex-red" />
            <span className="text-apex-red text-xs font-bold uppercase tracking-[0.3em]">Reservation</span>
          </div>
          <h1 className="font-display text-6xl text-apex-white tracking-wide">BOOK YOUR CAR</h1>
        </motion.div>
        <Suspense fallback={<div className="text-apex-silver">Loading...</div>}>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  )
}
