'use client'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { DamageReport } from '@/types'

interface Props {
  damages: DamageReport[]
}

export default function DamageSection({ damages }: Props) {
  return (
    <div className="glass-card border border-apex-border rounded-xl overflow-hidden">
      <div className="p-5 border-b border-apex-border">
        <h3 className="text-apex-white font-bold text-sm uppercase tracking-wider">Damage Reports</h3>
      </div>
      <div className="p-5 space-y-4">
        {damages.map(d => (
          <div key={d.id} className={`p-4 rounded-lg border ${
            d.repaired
              ? 'bg-green-500/5 border-green-500/20'
              : d.severity === 'major'
              ? 'bg-red-500/8 border-red-500/25'
              : d.severity === 'moderate'
              ? 'bg-orange-500/8 border-orange-500/25'
              : 'bg-yellow-500/8 border-yellow-500/20'
          }`}>
            <div className="flex items-start gap-2 mb-2">
              {d.repaired
                ? <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                : <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />}
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-apex-white font-semibold text-sm">{d.area}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase border ${
                    d.repaired ? 'bg-green-500/15 border-green-500/25 text-green-400' :
                    d.severity === 'major' ? 'bg-red-500/15 border-red-500/25 text-red-400' :
                    d.severity === 'moderate' ? 'bg-orange-500/15 border-orange-500/25 text-orange-400' :
                    'bg-yellow-500/15 border-yellow-500/25 text-yellow-400'
                  }`}>
                    {d.repaired ? 'Repaired' : d.severity}
                  </span>
                </div>
                <p className="text-apex-silver text-xs mt-1">{d.description}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-apex-silver">
                  <span>Reported: {new Date(d.reportedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  {d.repairCost && <span>Cost: €{d.repairCost.toLocaleString()}</span>}
                  {d.repairDate && <span>Repaired: {new Date(d.repairDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
