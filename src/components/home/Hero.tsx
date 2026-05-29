'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-apex-void">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Red accent light */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-apex-red/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/6 w-[400px] h-[400px] bg-apex-red/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Car silhouette visual — large stylized background text */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="text-[20vw] font-display text-apex-surface/30 leading-none tracking-tight whitespace-nowrap"
        >
          GT3 RS
        </motion.div>
      </div>

      {/* Decorative car SVG silhouette */}
      <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 0.12, x: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="w-[700px]"
        >
          <svg viewBox="0 0 700 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 200 L120 200 L140 160 L180 140 L320 130 L420 130 L500 140 L560 160 L600 200 L640 200 L650 215 L40 215 Z" fill="white" />
            <path d="M185 130 L210 95 L260 80 L380 78 L440 80 L480 95 L500 130 Z" fill="white" opacity="0.7"/>
            <path d="M220 80 L255 50 L340 40 L420 50 L450 80 Z" fill="white" opacity="0.3"/>
            <circle cx="160" cy="218" r="36" fill="white" />
            <circle cx="160" cy="218" r="20" fill="#050505" />
            <circle cx="520" cy="218" r="36" fill="white" />
            <circle cx="520" cy="218" r="20" fill="#050505" />
            <path d="M590 165 L640 165 L640 200 L590 195 Z" fill="white" opacity="0.5"/>
            <path d="M50 185 L100 185 L95 165 L55 168 Z" fill="white" opacity="0.4"/>
          </svg>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-apex-red" />
            <span className="text-apex-red text-xs font-bold uppercase tracking-[0.3em]">Monaco Supercar Rentals</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-display text-[clamp(4rem,10vw,7rem)] leading-[0.9] tracking-tight text-apex-white mb-6"
          >
            DRIVE THE
            <br />
            <span className="text-gradient-red">IMPOSSIBLE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-apex-light text-lg leading-relaxed mb-10 max-w-lg"
          >
            The world&apos;s most exclusive supercars and hypercars, available for rent in Monaco.
            From Porsche to Pagani — your extraordinary journey begins here.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/fleet"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-apex-red text-white text-sm font-bold uppercase tracking-widest hover:bg-apex-red-bright transition-all duration-300 shadow-red-glow hover:shadow-red-glow"
            >
              View Fleet
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/booking"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-apex-muted text-apex-white text-sm font-bold uppercase tracking-widest hover:border-apex-red hover:bg-apex-red/5 transition-all duration-300"
            >
              Book Now
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-8 mt-16 pt-8 border-t border-apex-border/50"
          >
            {[
              { value: '12+', label: 'Exclusive Models' },
              { value: '500+', label: 'Happy Clients' },
              { value: '4.9★', label: 'Average Rating' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-apex-white">{stat.value}</div>
                <div className="text-xs text-apex-silver uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-apex-silver uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-apex-silver" />
        </motion.div>
      </motion.div>
    </section>
  )
}
