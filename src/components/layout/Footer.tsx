import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Twitter, Youtube, ArrowUpRight } from 'lucide-react'

const fleetLinks = [
  { label: 'All Vehicles', href: '/fleet' },
  { label: 'Supercars', href: '/fleet?category=supercar' },
  { label: 'Hypercars', href: '/fleet?category=hypercar' },
  { label: 'Grand Tourers', href: '/fleet?category=gt' },
  { label: 'Sports Cars', href: '/fleet?category=sports' },
]

const serviceLinks = [
  { label: 'Book a Car', href: '/booking' },
  { label: 'Maintenance Tracker', href: '/maintenance' },
  { label: 'Fleet Dashboard', href: '/dashboard' },
  { label: 'Concierge Service', href: '#' },
  { label: 'Track Day Packages', href: '#' },
]

const legalLinks = [
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Rental Agreement', href: '#' },
  { label: 'Insurance Policy', href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative bg-apex-void border-t border-apex-border overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-apex-red to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-apex-red rounded flex items-center justify-center">
                <span className="text-white font-display text-sm">A</span>
              </div>
              <div>
                <span className="text-apex-white font-display text-lg tracking-widest">APEX</span>
                <span className="text-apex-silver font-display text-lg tracking-widest ml-1">MOTORS</span>
              </div>
            </div>
            <p className="text-sm text-apex-silver leading-relaxed mb-6">
              The world&apos;s most exclusive supercar rental experience. Where performance meets luxury.
            </p>
            <div className="space-y-3">
              <a href="tel:+37767000001" className="flex items-center gap-3 text-sm text-apex-silver hover:text-apex-white transition-colors group">
                <Phone className="w-4 h-4 text-apex-red group-hover:text-apex-red-bright transition-colors" />
                +377 67 000 001
              </a>
              <a href="mailto:reservations@apexmotors.mc" className="flex items-center gap-3 text-sm text-apex-silver hover:text-apex-white transition-colors group">
                <Mail className="w-4 h-4 text-apex-red group-hover:text-apex-red-bright transition-colors" />
                reservations@apexmotors.mc
              </a>
              <div className="flex items-start gap-3 text-sm text-apex-silver">
                <MapPin className="w-4 h-4 text-apex-red mt-0.5 shrink-0" />
                <span>12 Boulevard des Moulins<br />98000 Monaco, MC</span>
              </div>
            </div>
          </div>

          {/* Fleet */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-apex-white mb-5">Our Fleet</h4>
            <ul className="space-y-3">
              {fleetLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-apex-silver hover:text-apex-white transition-colors flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-3 h-px bg-apex-red transition-all duration-200 overflow-hidden" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-apex-white mb-5">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-apex-silver hover:text-apex-white transition-colors flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-3 h-px bg-apex-red transition-all duration-200 overflow-hidden" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-apex-white mb-5">Legal</h4>
            <ul className="space-y-3 mb-8">
              {legalLinks.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-apex-silver hover:text-apex-white transition-colors flex items-center gap-1 group">
                    <span className="w-0 group-hover:w-3 h-px bg-apex-red transition-all duration-200 overflow-hidden" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-widest text-apex-white mb-4">Follow Us</h4>
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, label: 'Instagram', href: '#' },
                { Icon: Twitter, label: 'X / Twitter', href: '#' },
                { Icon: Youtube, label: 'YouTube', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center bg-apex-surface border border-apex-border rounded hover:border-apex-red hover:bg-apex-red/10 transition-all duration-200 group"
                >
                  <Icon className="w-4 h-4 text-apex-silver group-hover:text-apex-red transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-apex-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-apex-silver">
            © {new Date().getFullYear()} Apex Motors Monaco. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-apex-silver">Built for performance. Engineered for excellence.</span>
            <ArrowUpRight className="w-3 h-3 text-apex-red" />
          </div>
        </div>
      </div>
    </footer>
  )
}
