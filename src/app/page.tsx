import Hero from '@/components/home/Hero'
import FeaturedVehicles from '@/components/home/FeaturedVehicles'
import Benefits from '@/components/home/Benefits'
import RentalProcess from '@/components/home/RentalProcess'
import Testimonials from '@/components/home/Testimonials'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedVehicles />
      <Benefits />
      <RentalProcess />
      <Testimonials />

      {/* CTA Banner */}
      <section className="py-24 bg-apex-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-apex-red/5 via-transparent to-apex-red/5" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-apex-red/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-apex-red/40 to-transparent" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-5xl md:text-7xl text-apex-white tracking-wide mb-6">
            READY TO <span className="text-gradient-red">DRIVE</span>?
          </h2>
          <p className="text-apex-silver text-lg mb-10 max-w-xl mx-auto">
            Select your dream car, set your dates, and experience automotive perfection.
            Your extraordinary journey starts now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fleet"
              className="px-10 py-4 bg-apex-red text-white text-sm font-bold uppercase tracking-widest hover:bg-apex-red-bright transition-colors shadow-red-glow hover:shadow-red-glow"
            >
              Browse All Cars
            </Link>
            <Link
              href="/booking"
              className="px-10 py-4 border border-apex-muted text-apex-white text-sm font-bold uppercase tracking-widest hover:border-apex-red hover:bg-apex-red/5 transition-all"
            >
              Book Instantly
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
