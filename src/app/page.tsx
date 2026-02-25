'use client'

import { useEffect, useRef } from 'react'
import Header from '@/components/sections/Header'
import Hero from '@/components/sections/Hero'
import Proof from '@/components/sections/Proof'
import Benefits from '@/components/sections/Benefits'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'
import { useConversionTracking } from '@/components/hooks/useConversionTracking'

export default function Home() {
  const { trackEvent } = useConversionTracking()
  const ctaRef = useRef<HTMLDivElement>(null)

  // Трекаем просмотр лендинга
  useEffect(() => {
    trackEvent('landing_view', { page: 'home' })
  }, [trackEvent])

  const handleCtaClick = () => {
    trackEvent('cta_click', { location: 'header' })
    ctaRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLeadSubmit = () => {
    // Лид уже отслеживается на сервере
  }

  return (
    <main className="min-h-screen">
      <Header onCtaClick={handleCtaClick} />
      
      <div id="hero">
        <Hero onCtaClick={handleCtaClick} />
      </div>
      
      <div id="reviews">
        <Proof />
      </div>
      
      <div id="benefits">
        <Benefits />
      </div>
      
      <div id="faq">
        <FAQ />
      </div>
      
      <div ref={ctaRef}>
        <CTA onLeadSubmit={handleLeadSubmit} />
      </div>
      
      <Footer />
    </main>
  )
}
