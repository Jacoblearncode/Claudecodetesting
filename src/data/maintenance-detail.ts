import { maintenanceRecords, damageReports, alerts } from './maintenance'

export const getMaintenanceByVehicle = (vehicleId: string) =>
  maintenanceRecords.filter(r => r.vehicleId === vehicleId)

export const getAlertsByVehicle = (vehicleId: string) =>
  alerts.filter(a => a.vehicleId === vehicleId && !a.resolved)

export const getDamageReports = (vehicleId: string) =>
  damageReports.filter(d => d.vehicleId === vehicleId)
