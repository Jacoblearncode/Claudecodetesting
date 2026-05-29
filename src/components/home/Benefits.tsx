'use client'
import { motion } from 'framer-motion'
import { Shield, Star, Clock, MapPin, Headphones, Award, Zap, Lock } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/lib/animations'

const benefits = [
  {
    icon: Shield,
    title: 'Full Insurance Coverage',
    description: 'Comprehensive insurance included with every rental. Drive with complete peace of mind.',
  },
  {
    icon: Star,
    title: 'Concierge Service',
    description: '24/7 personal concierge to handle every detail of your luxury driving experience.',
  },
  {
    icon: Clock,
    title: 'Flexible Rental Periods',
    description: 'From single days to extended journeys — rentals tailored to your schedule.',
  },
  {
    icon: MapPin,
    title: 'Monaco Delivery',
    description: 'White-glove vehicle delivery to your hotel, yacht, or address of choice.',
  },
  {
    icon: Headphones,
    title: 'Expert Briefing',
    description: 'Personal vehicle orientation from our certified supercar specialists.',
  },
  {
    icon: Award,
    title: 'Certified Vehicles',
    description: 'Every car passes our 150-point inspection before leaving our facility.',
  },
  {
    icon: Zap,
    title: 'Instant Confirmation',
    description: 'Booking confirmed within minutes. No waiting, no unnecessary paperwork.',
  },
  {
    icon: Lock,
    title: 'Secure Booking',
    description: 'Bank-level encryption protects your personal and financial information.',
  },
]

export default function Benefits() {
  return (
    <section className="py-24 bg-apex-void relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-apex-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-apex-border to-transparent" />
      </div>

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
            <span className="text-apex-red text-xs font-bold uppercase tracking-[0.3em]">Why Apex Motors</span>
            <span className="w-8 h-px bg-apex-red" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-apex-white tracking-wide mb-4">
            THE APEX STANDARD
          </h2>
          <p className="text-apex-silver text-lg max-w-xl mx-auto leading-relaxed">
            Every rental is a five-star experience. We obsess over every detail so you can focus on the drive.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {benefits.map(item => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-xl p-6 border border-apex-border hover:border-apex-red/20 group transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-apex-red/10 border border-apex-red/20 flex items-center justify-center mb-4 group-hover:bg-apex-red/20 transition-colors">
                <item.icon className="w-5 h-5 text-apex-red" />
              </div>
              <h3 className="text-apex-white font-semibold text-sm mb-2 leading-snug">{item.title}</h3>
              <p className="text-apex-silver text-xs leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
