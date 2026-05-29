'use client'
import { motion } from 'framer-motion'
import { Search, FileCheck, Key, Flag } from 'lucide-react'
import { staggerContainerSlow, slideInFromBottom } from '@/lib/animations'

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Choose Your Dream Car',
    description: 'Browse our exclusive fleet of supercars and hypercars. Filter by performance, price, or availability.',
  },
  {
    step: '02',
    icon: FileCheck,
    title: 'Complete the Booking',
    description: 'Fill in your rental details, dates, and preferences. Secure your booking with a simple deposit.',
  },
  {
    step: '03',
    icon: Key,
    title: 'Vehicle Handover',
    description: 'Receive a personal vehicle briefing from our specialists. Understand your car before you drive.',
  },
  {
    step: '04',
    icon: Flag,
    title: 'Drive & Experience',
    description: 'Take the wheel and experience automotive perfection. Every drive is an unforgettable memory.',
  },
]

export default function RentalProcess() {
  return (
    <section className="py-24 bg-apex-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-apex-red" />
            <span className="text-apex-red text-xs font-bold uppercase tracking-[0.3em]">Simple Process</span>
            <span className="w-8 h-px bg-apex-red" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl text-apex-white tracking-wide mb-4">
            HOW IT WORKS
          </h2>
          <p className="text-apex-silver text-lg max-w-lg mx-auto">
            From selection to ignition in four effortless steps.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
        >
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-apex-border to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              variants={slideInFromBottom}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step number */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full border border-apex-border bg-apex-surface flex items-center justify-center relative z-10">
                  <step.icon className="w-7 h-7 text-apex-red" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-apex-red flex items-center justify-center z-20">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-apex-red/10 blur-xl z-0" />
              </div>

              <div className="text-apex-red/30 font-display text-5xl absolute top-0 left-1/2 -translate-x-1/2 -z-10 select-none">
                {step.step}
              </div>

              <h3 className="text-apex-white font-semibold text-base mb-3 leading-snug">{step.title}</h3>
              <p className="text-apex-silver text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
