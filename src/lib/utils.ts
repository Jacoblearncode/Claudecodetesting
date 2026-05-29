import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ConditionLevel, MaintenanceStatus, VehicleStatus, VehicleCategory } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('en-EU', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount)
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en').format(n)
}

export function conditionColor(level: ConditionLevel): string {
  const map: Record<ConditionLevel, string> = {
    excellent: 'text-green-400',
    good: 'text-emerald-400',
    fair: 'text-yellow-400',
    poor: 'text-red-400',
  }
  return map[level]
}

export function conditionBg(level: ConditionLevel): string {
  const map: Record<ConditionLevel, string> = {
    excellent: 'bg-green-400',
    good: 'bg-emerald-400',
    fair: 'bg-yellow-400',
    poor: 'bg-red-500',
  }
  return map[level]
}

export function scoreToLevel(score: number): ConditionLevel {
  if (score >= 90) return 'excellent'
  if (score >= 70) return 'good'
  if (score >= 50) return 'fair'
  return 'poor'
}

export function maintenanceStatusColor(status: MaintenanceStatus): string {
  const map: Record<MaintenanceStatus, string> = {
    'ready': 'text-green-400 bg-green-400/10 border-green-400/20',
    'needs-service': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    'under-repair': 'text-red-400 bg-red-400/10 border-red-400/20',
    'not-available': 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20',
  }
  return map[status]
}

export function vehicleStatusColor(status: VehicleStatus): string {
  const map: Record<VehicleStatus, string> = {
    available: 'text-green-400 bg-green-400/10 border-green-400/20',
    rented: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    maintenance: 'text-red-400 bg-red-400/10 border-red-400/20',
    unavailable: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20',
  }
  return map[status]
}

export function categoryLabel(cat: VehicleCategory): string {
  const map: Record<VehicleCategory, string> = {
    supercar: 'Supercar',
    sports: 'Sports Car',
    gt: 'Grand Tourer',
    hypercar: 'Hypercar',
    luxury: 'Luxury',
  }
  return map[cat]
}

export function maintenanceStatusLabel(status: MaintenanceStatus): string {
  const map: Record<MaintenanceStatus, string> = {
    'ready': 'Ready',
    'needs-service': 'Needs Service',
    'under-repair': 'Under Repair',
    'not-available': 'Not Available',
  }
  return map[status]
}

export function daysUntil(dateStr: string): number {
  const now = new Date()
  const target = new Date(dateStr)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}
