'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/fleet', label: 'Fleet' },
  { href: '/booking', label: 'Book Now' },
  { href: '/maintenance', label: 'Maintenance' },
  { href: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-apex-void/95 backdrop-blur-xl border-b border-apex-border/50 shadow-card'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-8 h-8 bg-apex-red rounded flex items-center justify-center">
                <span className="text-white font-display text-sm tracking-wider">A</span>
              </div>
              <div className="absolute inset-0 bg-apex-red rounded blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            </div>
            <div>
              <span className="text-apex-white font-display text-lg tracking-widest">APEX</span>
              <span className="text-apex-silver font-display text-lg tracking-widest ml-1">MOTORS</span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'relative px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-200',
                      isActive ? 'text-apex-white' : 'text-apex-silver hover:text-apex-white'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 bg-apex-surface border border-apex-border rounded"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/booking"
              className="px-5 py-2.5 bg-apex-red text-white text-xs font-bold uppercase tracking-widest hover:bg-apex-red-bright transition-colors duration-200 shadow-red-glow-sm hover:shadow-red-glow"
            >
              Rent Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden p-2 text-apex-silver hover:text-apex-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-40 bg-apex-void/98 backdrop-blur-xl border-b border-apex-border"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center justify-between px-4 py-3 text-sm font-semibold uppercase tracking-widest rounded transition-colors',
                      pathname === link.href
                        ? 'bg-apex-surface text-apex-white border border-apex-border'
                        : 'text-apex-silver hover:text-apex-white hover:bg-apex-surface'
                    )}
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4">
                <Link
                  href="/booking"
                  className="block w-full text-center px-6 py-3 bg-apex-red text-white text-sm font-bold uppercase tracking-widest"
                >
                  Rent Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
