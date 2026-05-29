export type VehicleCategory = 'supercar' | 'sports' | 'gt' | 'hypercar' | 'luxury'
export type VehicleStatus = 'available' | 'rented' | 'maintenance' | 'unavailable'
export type MaintenanceStatus = 'ready' | 'needs-service' | 'under-repair' | 'not-available'
export type Transmission = 'automatic' | 'manual' | 'pdk' | 'dct'
export type ConditionLevel = 'excellent' | 'good' | 'fair' | 'poor'

export interface ConditionMetric {
  name: string
  score: number // 0-100
  status: ConditionLevel
  lastChecked: string
  notes?: string
}

export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  category: VehicleCategory
  status: VehicleStatus
  maintenanceStatus: MaintenanceStatus
  pricePerDay: number
  deposit: number
  transmission: Transmission
  seats: number
  mileage: number
  engineSize: string
  horsepower: number
  torque: number
  acceleration: number // 0-100 km/h in seconds
  topSpeed: number // km/h
  weight: number // kg
  drivetrain: 'RWD' | 'AWD' | 'FWD' | 'MR'
  fuelType: 'petrol' | 'electric' | 'hybrid'
  color: string
  colorHex: string
  colorTheme: {
    primary: string
    secondary: string
    accent: string
  }
  features: string[]
  conditionScore: number // 0-100
  conditionMetrics: ConditionMetric[]
  description: string
  shortDescription: string
  insuranceIncluded: boolean
  minAge: number
  minLicense: string
  featured: boolean
}

export interface MaintenanceRecord {
  id: string
  vehicleId: string
  date: string
  type: 'oil-change' | 'tire-rotation' | 'brake-service' | 'full-service' | 'repair' | 'inspection' | 'detailing'
  description: string
  technician: string
  cost: number
  mileageAtService: number
  nextServiceDue?: string
  nextServiceMileage?: number
  parts?: string[]
  completed: boolean
  notes?: string
}

export interface DamageReport {
  id: string
  vehicleId: string
  reportedDate: string
  reportedBy: string
  severity: 'minor' | 'moderate' | 'major'
  area: string
  description: string
  repaired: boolean
  repairCost?: number
  repairDate?: string
  photos?: string[]
}

export interface Booking {
  id: string
  vehicleId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  pickupDate: string
  returnDate: string
  pickupLocation: string
  returnLocation: string
  totalDays: number
  pricePerDay: number
  totalPrice: number
  depositPaid: number
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
  extras: string[]
  notes?: string
  createdAt: string
}

export interface Alert {
  id: string
  vehicleId: string
  type: 'maintenance-due' | 'damage' | 'mileage-limit' | 'service-overdue' | 'inspection-required'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  createdAt: string
  resolved: boolean
}

export interface DashboardStats {
  totalVehicles: number
  availableVehicles: number
  activeRentals: number
  upcomingReturns: number
  vehiclesInService: number
  maintenanceAlerts: number
  monthlyRevenue: number
  utilizationRate: number
}
