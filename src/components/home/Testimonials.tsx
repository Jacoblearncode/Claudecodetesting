'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'

const testimonials = [
  {
    id: 1,
    name: 'Alexander Hartmann',
    role: 'Investment Banker, Frankfurt',
    rating: 5,
    text: 'The McLaren 720S was absolutely breathtaking. The booking process was seamless, the handover was professional and thorough, and the car itself was in immaculate condition. Apex Motors sets the gold standard.',
    vehicle: 'McLaren 720S',
    initials: 'AH',
    accentColor: '#ff7518',
  },
  {
    id: 2,
    name: 'Sophia Chen',
    role: 'Tech Executive, Singapore',
    rating: 5,
    text: 'Renting the Ferrari 488 GTB was a dream come true. The team at Apex went above and beyond — from delivering the car to our yacht to arranging a private route through the French Riviera. Truly exceptional.',
    vehicle: 'Ferrari 488 GTB',
    initials: 'SC',
    accentColor: '#cc0000',
  },
  {
    id: 3,
    name: 'James Worthington',
    role: 'Entrepreneur, London',
    rating: 5,
    text: 'I\'ve rented supercars across the world, but Apex Motors in Monaco is in a league of its own. The Porsche GT3 RS was absolutely pristine and the attention to detail at every touchpoint was outstanding.',
    vehicle: 'Porsche 911 GT3 RS',
    initials: 'JW',
    accentColor: '#7c8cff',
  },
  {
    id: 4,
    name: 'Emma Johansson',
    role: 'Creative Director, Stockholm',
    rating: 5,
    text: 'The Lamborghini Huracán EVO made my weekend in Monaco unforgettable. The V10 sound, the precision handling — I cannot find words. The Apex team was incredibly welcoming and professional throughout.',
    vehicle: 'Lamborghini Huracán EVO',
    initials: 'EJ',
    accentColor: '#ff6600',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-apex-void relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-apex-red/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-apex-red" />
            <span className="text-apex-red text-xs font-bold uppercase tracking-[0.3em]">Client Stories</span>
            <span className="w-8 h-px bg-apex-red" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-apex-white tracking-wide mb-4">
            WHAT THEY SAY
          </h2>
          <p className="text-apex-silver text-lg max-w-lg mx-auto">
            Hear from those who have experienced the Apex Motors difference.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map(t => (
            <motion.div
              key={t.id}
              variants={fadeInUp}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-xl p-7 border border-apex-border hover:border-apex-border/80 relative overflow-hidden"
            >
              {/* Quote decoration */}
              <Quote className="absolute top-5 right-5 w-16 h-16 text-apex-surface/80 fill-current" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-apex-light text-sm leading-relaxed mb-6 relative z-10">&ldquo;{t.text}&rdquo;</p>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: t.accentColor + '33', border: `1px solid ${t.accentColor}40` }}
                >
                  <span style={{ color: t.accentColor }}>{t.initials}</span>
                </div>
                <div>
                  <div className="text-apex-white font-semibold text-sm">{t.name}</div>
                  <div className="text-apex-silver text-xs">{t.role}</div>
                </div>
                <div className="ml-auto">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded border"
                    style={{ color: t.accentColor, borderColor: t.accentColor + '40', background: t.accentColor + '0d' }}
                  >
                    {t.vehicle}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-center"
        >
          <div>
            <div className="text-4xl font-bold text-apex-white">4.9</div>
            <div className="flex items-center justify-center gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <div className="text-apex-silver text-xs mt-1 uppercase tracking-wider">Average Rating</div>
          </div>
          <div className="w-px h-12 bg-apex-border hidden sm:block" />
          <div>
            <div className="text-4xl font-bold text-apex-white">500+</div>
            <div className="text-apex-silver text-xs mt-1 uppercase tracking-wider">Happy Clients</div>
          </div>
          <div className="w-px h-12 bg-apex-border hidden sm:block" />
          <div>
            <div className="text-4xl font-bold text-apex-white">100%</div>
            <div className="text-apex-silver text-xs mt-1 uppercase tracking-wider">Would Recommend</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
