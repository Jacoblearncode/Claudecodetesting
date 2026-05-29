'use client'
import { motion, HTMLMotionProps } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

interface AnimatedSectionProps extends HTMLMotionProps<'section'> {
  delay?: number
}

export default function AnimatedSection({ children, delay = 0, ...props }: AnimatedSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay } },
      }}
      {...props}
    >
      {children}
    </motion.section>
  )
}
