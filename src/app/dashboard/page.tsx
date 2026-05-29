'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Car, TrendingUp, CalendarClock, Wrench, AlertTriangle, CheckCircle,
  BarChart3, Clock, ArrowRight, Activity, DollarSign, Users
} from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import VehicleStatusCard from '@/components/maintenance/VehicleStatusCard'
import { vehicles } from '@/data/vehicles'
import { bookings, getActiveAlerts } from '@/data/maintenance'
import { formatCurrency, vehicleStatusColor, maintenanceStatusLabel } from '@/lib/utils'
import { staggerContainer, fadeInUp } from '@/lib/animations'

export default function DashboardPage() {
  const alerts = getActiveAlerts()
  const activeRentals = bookings.filter(b => b.status === 'active')
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed')
  const availableVehicles = vehicles.filter(v => v.status === 'available')
  const maintenanceVehicles = vehicles.filter(v => v.status === 'maintenance')
  const totalRevenue = bookings.filter(b => b.status !== 'cancelled').reduce((s, b) => s + b.totalPrice, 0)
  const utilizationRate = Math.round((activeRentals.length / vehicles.length) * 100)

  const criticalAlerts = alerts.filter(a => a.severity === 'critical' || a.severity === 'high')

  const recentBookings = [...bookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5)

  const vehiclesNeedingAttention = vehicles.filter(v =>
    v.maintenanceStatus === 'needs-service' || v.maintenanceStatus === 'under-repair'
  )

  return (
    <div className="min-h-screen bg-apex-void pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-apex-red" />
            <span className="text-apex-red text-xs font-bold uppercase tracking-[0.3em]">Admin Panel</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h1 className="font-display text-6xl text-apex-white tracking-wide">OVERVIEW</h1>
            <p className="text-apex-silver text-sm">
              Last updated: {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </motion.div>

        {/* Critical alerts banner */}
        {criticalAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-500/8 border border-red-500/25 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 font-bold text-sm uppercase tracking-wider">
                {criticalAlerts.length} Critical Alert{criticalAlerts.length > 1 ? 's' : ''} Require Immediate Attention
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {criticalAlerts.map(alert => {
                const vehicle = vehicles.find(v => v.id === alert.vehicleId)
                return (
                  <Link
                    key={alert.id}
                    href={`/maintenance/${alert.vehicleId}`}
                    className="inline-flex items-center gap-1.5 text-xs text-red-300 bg-red-600/15 border border-red-600/25 px-3 py-1.5 rounded hover:bg-red-600/25 transition-colors"
                  >
                    <AlertTriangle className="w-3 h-3" />
                    {vehicle?.model}: {alert.message.substring(0, 50)}...
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* KPI Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          {[
            { label: 'Total Fleet', value: vehicles.length, icon: Car, accent: 'default' as const },
            { label: 'Available Now', value: availableVehicles.length, icon: CheckCircle, accent: 'green' as const },
            { label: 'Active Rentals', value: activeRentals.length, icon: Activity, accent: 'blue' as const },
            { label: 'Confirmed Bookings', value: confirmedBookings.length, icon: CalendarClock, accent: 'blue' as const },
            { label: 'In Service', value: maintenanceVehicles.length, icon: Wrench, accent: 'red' as const },
            { label: 'Open Alerts', value: alerts.length, icon: AlertTriangle, accent: alerts.length > 0 ? 'red' as const : 'green' as const },
          ].map(s => (
            <motion.div key={s.label} variants={fadeInUp}>
              <StatCard {...s} />
            </motion.div>
          ))}
        </motion.div>

        {/* Revenue + Utilization row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <motion.div variants={fadeInUp} className="glass-card border border-apex-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-apex-silver uppercase tracking-widest">Total Revenue</span>
              <DollarSign className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-apex-white">{formatCurrency(totalRevenue)}</div>
            <div className="text-xs text-apex-silver mt-1">All bookings (excl. cancelled)</div>
          </motion.div>

          <motion.div variants={fadeInUp} className="glass-card border border-apex-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-apex-silver uppercase tracking-widest">Fleet Utilization</span>
              <BarChart3 className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-apex-white">{utilizationRate}%</div>
            <div className="mt-3">
              <ProgressBar value={utilizationRate} showValue={false} />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="glass-card border border-apex-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-apex-silver uppercase tracking-widest">Avg Condition</span>
              <Activity className="w-4 h-4 text-apex-red" />
            </div>
            <div className="text-3xl font-bold text-green-400">
              {Math.round(vehicles.reduce((s, v) => s + v.conditionScore, 0) / vehicles.length)}%
            </div>
            <div className="mt-3">
              <ProgressBar
                value={Math.round(vehicles.reduce((s, v) => s + v.conditionScore, 0) / vehicles.length)}
                showValue={false}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Recent bookings */}
          <div className="lg:col-span-3 space-y-6">
            <div className="glass-card border border-apex-border rounded-xl overflow-hidden">
              <div className="p-5 border-b border-apex-border flex items-center justify-between">
                <h2 className="text-apex-white font-bold text-sm uppercase tracking-wider">Recent Bookings</h2>
                <Link href="/booking" className="text-xs text-apex-silver hover:text-apex-white transition-colors flex items-center gap-1">
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="divide-y divide-apex-border/50">
                {recentBookings.map(booking => {
                  const vehicle = vehicles.find(v => v.id === booking.vehicleId)
                  return (
                    <div key={booking.id} className="p-4 flex items-start gap-3 hover:bg-apex-surface/30 transition-colors">
                      <div
                        className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center"
                        style={{ background: vehicle ? `linear-gradient(135deg, ${vehicle.colorTheme.primary}, ${vehicle.colorTheme.secondary})` : '#111' }}
                      >
                        <Car className="w-4 h-4 text-white/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-apex-white font-semibold text-sm truncate">{booking.customerName}</p>
                            <p className="text-apex-silver text-xs">{vehicle?.make} {vehicle?.model}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <Badge variant={
                              booking.status === 'active' ? 'available' :
                              booking.status === 'confirmed' ? 'rented' :
                              booking.status === 'completed' ? 'default' : 'unavailable'
                            }>
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-apex-silver">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.pickupDate} → {booking.returnDate}
                          </span>
                          <span className="font-semibold text-apex-white">{formatCurrency(booking.totalPrice)}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Fleet status overview */}
            <div className="glass-card border border-apex-border rounded-xl overflow-hidden">
              <div className="p-5 border-b border-apex-border flex items-center justify-between">
                <h2 className="text-apex-white font-bold text-sm uppercase tracking-wider">Fleet Status Overview</h2>
                <Link href="/fleet" className="text-xs text-apex-silver hover:text-apex-white transition-colors flex items-center gap-1">
                  All Vehicles <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="p-5 space-y-3">
                {vehicles.map(v => (
                  <Link key={v.id} href={`/fleet/${v.id}`} className="flex items-center gap-3 group">
                    <div
                      className="w-8 h-8 rounded shrink-0"
                      style={{ background: `linear-gradient(135deg, ${v.colorTheme.primary}, ${v.colorTheme.secondary})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-semibold text-apex-white truncate group-hover:text-apex-red transition-colors">
                          {v.make} {v.model}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                          v.status === 'available' ? 'text-green-400 bg-green-500/8 border-green-500/20' :
                          v.status === 'rented' ? 'text-blue-400 bg-blue-500/8 border-blue-500/20' :
                          'text-red-400 bg-red-500/8 border-red-500/20'
                        }`}>
                          {v.status}
                        </span>
                      </div>
                      <ProgressBar value={v.conditionScore} showValue={false} size="sm" animate={false} />
                    </div>
                    <span className={`text-xs font-bold shrink-0 ${v.conditionScore >= 85 ? 'text-green-400' : v.conditionScore >= 65 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {v.conditionScore}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vehicles needing attention */}
            <div className="glass-card border border-apex-border rounded-xl overflow-hidden">
              <div className="p-5 border-b border-apex-border flex items-center justify-between">
                <h2 className="text-apex-white font-bold text-sm uppercase tracking-wider">Needs Attention</h2>
                <Link href="/maintenance" className="text-xs text-apex-silver hover:text-apex-white transition-colors flex items-center gap-1">
                  All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              {vehiclesNeedingAttention.length === 0 ? (
                <div className="p-8 text-center">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-apex-silver text-sm">All vehicles in good condition</p>
                </div>
              ) : (
                <div className="divide-y divide-apex-border/50">
                  {vehiclesNeedingAttention.map(v => (
                    <Link key={v.id} href={`/maintenance/${v.id}`} className="flex items-center gap-3 p-4 hover:bg-apex-surface/30 transition-colors group">
                      <div className={`w-2 h-10 rounded-full shrink-0 ${
                        v.maintenanceStatus === 'under-repair' ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-apex-white text-sm font-semibold group-hover:text-apex-red transition-colors">{v.model}</p>
                        <p className="text-apex-silver text-xs">{maintenanceStatusLabel(v.maintenanceStatus)}</p>
                      </div>
                      <span className={`text-xs font-bold ${v.conditionScore >= 65 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {v.conditionScore}%
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming returns */}
            <div className="glass-card border border-apex-border rounded-xl overflow-hidden">
              <div className="p-5 border-b border-apex-border">
                <h2 className="text-apex-white font-bold text-sm uppercase tracking-wider">Upcoming Returns</h2>
              </div>
              <div className="divide-y divide-apex-border/50">
                {[...bookings.filter(b => b.status === 'active' || b.status === 'confirmed')]
                  .sort((a, b) => new Date(a.returnDate).getTime() - new Date(b.returnDate).getTime())
                  .slice(0, 4)
                  .map(booking => {
                    const vehicle = vehicles.find(v => v.id === booking.vehicleId)
                    const daysUntil = Math.ceil((new Date(booking.returnDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                    return (
                      <div key={booking.id} className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-apex-white text-sm font-semibold">{vehicle?.model}</p>
                            <p className="text-apex-silver text-xs">{booking.customerName}</p>
                          </div>
                          <div className="text-right">
                            <p className={`text-xs font-bold ${daysUntil <= 1 ? 'text-red-400' : daysUntil <= 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                              {daysUntil <= 0 ? 'TODAY' : daysUntil === 1 ? 'TOMORROW' : `${daysUntil} days`}
                            </p>
                            <p className="text-apex-silver text-[10px]">{booking.returnDate}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            {/* Quick links */}
            <div className="glass-card border border-apex-border rounded-xl p-5 space-y-2">
              <h2 className="text-apex-white font-bold text-xs uppercase tracking-wider mb-4">Quick Actions</h2>
              {[
                { label: 'New Booking', href: '/booking', color: 'bg-apex-red' },
                { label: 'View Fleet', href: '/fleet', color: 'bg-apex-surface border border-apex-border' },
                { label: 'Maintenance Tracker', href: '/maintenance', color: 'bg-apex-surface border border-apex-border' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3 rounded text-sm font-semibold uppercase tracking-wider text-apex-white hover:brightness-110 transition-all ${link.color}`}
                >
                  {link.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
