import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Apex Motors — Monaco Supercar Rentals',
    template: '%s | Apex Motors',
  },
  description: 'Rent the world\'s most exclusive supercars and hypercars in Monaco. Porsche, Ferrari, Lamborghini, Bugatti and more.',
  keywords: ['supercar rental', 'Monaco', 'sports car hire', 'hypercar', 'Ferrari rental', 'Lamborghini rental'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-apex-void text-apex-white antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
