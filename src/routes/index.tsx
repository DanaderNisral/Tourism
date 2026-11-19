import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useSiteData, useTours, useExperiences } from '@/hooks/useSiteData'
import { useBookingModal } from '@/hooks/useBookingModal'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TourCard } from '@/components/TourCard'
import { MarqueeStrip } from '@/components/MarqueeStrip'
import { TourismHeroWidget } from '@/components/TourismHeroWidget'
import { defaultSiteConfig } from '@/data/site.defaults'
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Car,
  KeyRound,
  Quote,
  CheckCircle2,
  Footprints,
  HeartHandshake,
  Mountain,
  Trees,
  MapPin,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const experienceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Footprints,
  HeartHandshake,
  Mountain,
  Trees,
}

function HomePage() {
  const { data: siteConfig } = useSiteData()
  const { data: tours } = useTours()
  const experiences = useExperiences()
  const { openBooking } = useBookingModal()

  const handleHeroBookNow = (details: {
    category: string
    destination: string
    tripType: string
    tier: string
    date: string
    adults: number
    children: number
  }) => {
    openBooking({
      destination: details.destination,
      date: details.date,
      adults: details.adults,
      children: details.children,
      specialRequests: `Preferred ${details.tripType} safari in ${details.destination} with ${details.tier} lodging.`,
    })
  }

  const content = siteConfig?.site ?? defaultSiteConfig.site
  const allTours = tours ?? defaultSiteConfig.tours
  const featuredTours = allTours.filter((t) => t.featured).slice(0, 3)
  const fallbackFeatured = allTours.slice(0, 3)
  const shownTours = featuredTours.length > 0 ? featuredTours : fallbackFeatured

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* =========================================================================
          HERO 1: HOME PAGE — FULL-BLEED EDGE-TO-EDGE SCENIC HERO
          Panoramic image spans the entire viewport width with centered display
          typography and the elevated tabbed TourismHeroWidget booking card.
      ========================================================================= */}
      <section className="relative w-full min-h-[88vh] md:min-h-[94vh] flex flex-col justify-between overflow-hidden">
        {/* Full-width panoramic East Africa savanna / volcano scenery */}
        <img
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2400&auto=format&fit=crop"
          alt="Majestic panoramic savanna and volcanic ridge in Rwanda & East Africa"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark scrim for high contrast — heavier at edges, lighter at center */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />

        {/* Soft mint & sky ambient glow orbs */}
        <div className="absolute top-16 left-[8%] w-96 h-96 rounded-full bg-mint/25 orb-glow pointer-events-none" />
        <div className="absolute top-24 right-[8%] w-80 h-80 rounded-full bg-sky/20 orb-glow pointer-events-none" />

        {/* Top Eyebrow Tagline */}
        <div className="relative z-10 flex justify-center pt-10 sm:pt-14 px-6">
          <span className="bg-black/45 backdrop-blur-md border border-white/25 rounded-full px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white flex items-center gap-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-mint animate-pulse" />
            {content.homeHero.eyebrow}
          </span>
        </div>

        {/* Centered Majestic Heading & Subtitle */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 py-10 sm:py-14">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tight drop-shadow-md">
            See Africa{' '}
            <span className="bg-gradient-to-r from-white via-mint to-gold bg-clip-text text-transparent">
              Differently
            </span>
          </h1>

          <p className="font-mono text-sm sm:text-base md:text-lg text-white/90 mt-5 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            {content.homeHero.subtitle}
          </p>

          {/* Quick trust chips */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {['RDB Licensed', 'Permit Guaranteed', 'Local Guides'].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/25 bg-white/10 backdrop-blur-md px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-white"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* THE ELEVATED TABBED TOURISM BOOKING CARD WITH "BOOK NOW" */}
        <div className="relative z-20 w-full px-3 sm:px-6 pb-8 sm:pb-12">
        </div>
      </section>

      {/* BOOKING WIDGET — OVERLAPS HERO BOTTOM & NEXT SECTION */}
      <div className="relative z-30 px-4 sm:px-6 lg:px-8 -mt-14 lg:-mt-20 -mb-8 lg:-mb-12">
        <div className="mx-auto max-w-5xl">
          <TourismHeroWidget onBookNow={handleHeroBookNow} />
        </div>
      </div>

      {/* MARQUEE STRIP BETWEEN SECTIONS */}
      <MarqueeStrip />

      {/* =========================================================================
          SECTION 2: FEATURED TOURS (Image Cards)
      ========================================================================= */}
      <section className="py-24 md:py-32 border-t border-foreground/10">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section Header Pattern */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal">
            <div>
              <span className="eyebrow text-foreground/50 block mb-2">
                Handcrafted Itineraries
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-extrabold text-foreground leading-[0.95]">
                Signature{' '}
                <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                  Expeditions
                </span>
              </h2>
            </div>
            <Link to="/tours">
              <Button variant="outline" className="group">
                <span>View All Tours</span>
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Tour Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shownTours.map((tour) => (
              <div key={tour.id} className="reveal">
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2b: SIGNATURE EXPERIENCES (Image Cards)
          Four immersive experience cards linking to the Experiences page
      ========================================================================= */}
      <section className="py-24 md:py-28 bg-secondary/40 border-t border-foreground/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 reveal">
            <div>
              <span className="eyebrow text-foreground/50 block mb-2">
                Beyond the Game Drive
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-[0.95]">
                Ways to{' '}
                <span className="bg-gradient-to-r from-mint to-gold bg-clip-text text-transparent">
                  Wander Deeper
                </span>
              </h2>
            </div>
            <Link to="/experiences">
              <Button variant="outline" className="group">
                <span>Explore All Experiences</span>
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, idx) => {
              const Icon = experienceIcons[exp.iconName] || Compass
              return (
                <Link
                  key={exp.id}
                  to="/experiences"
                  className="group rounded-[2rem] border border-border bg-card overflow-hidden shadow-soft hover:-translate-y-1 hover:shadow-elegant transition-all duration-300 flex flex-col reveal"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={exp.photo}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                      <span className="bg-black/45 backdrop-blur-md border border-white/25 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                        {exp.category}
                      </span>
                      <span className="h-9 w-9 rounded-full bg-background/90 text-foreground flex items-center justify-center shrink-0 shadow-soft">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-lg font-extrabold text-foreground leading-tight">
                      {exp.title}
                    </h3>
                    <p className="font-mono text-xs text-foreground/65 leading-relaxed mt-2 line-clamp-3 flex-1">
                      {exp.shortDescription}
                    </p>
                    <div className="pt-4 mt-4 border-t border-border flex items-center justify-between font-mono text-[11px] font-bold text-foreground/70">
                      <span>{exp.stats}</span>
                      <ArrowRight className="h-4 w-4 text-mint transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: WHY TRAVEL WITH US (INVERTED DARK SECTION)
          bg-foreground text-background with ambient glow and glass-dark cards
      ========================================================================= */}
      <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden border-t border-foreground/10">
        {/* Ambient spinning ring border & glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-background/5 animate-spin-slow pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-mint/10 orb-glow pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          {/* Centered Section Header for Dark Section */}
          <div className="text-center max-w-2xl mx-auto mb-20 reveal">
            <span className="eyebrow text-background/50 block mb-2">
              The Sarumba Standard
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[0.95] text-background">
              Why Travel With Us
            </h2>
            <p className="font-mono text-sm text-background/70 mt-4 leading-relaxed">
              Every safari directly supports Rwanda Development Board park wardens, indigenous forest communities, and regenerative habitat corridors.
            </p>
          </div>

          {/* 4 Glass-Dark Cards with Mint Icon Chips */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.whyUs.features.map((feat, idx) => (
              <div
                key={idx}
                className="glass-dark rounded-[2rem] p-7 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 reveal"
              >
                <div>
                  {/* Mint Icon Chip */}
                  <div className="h-10 w-10 rounded-full bg-mint/20 text-mint flex items-center justify-center mb-6">
                    {idx === 0 && <Compass className="h-5 w-5" />}
                    {idx === 1 && <ShieldCheck className="h-5 w-5" />}
                    {idx === 2 && <Car className="h-5 w-5" />}
                    {idx === 3 && <KeyRound className="h-5 w-5" />}
                  </div>

                  <h3 className="font-display text-lg font-extrabold text-background mb-3">
                    {feat.title}
                  </h3>
                  <p className="font-mono text-xs text-background/70 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-background/10 font-mono text-[10px] uppercase tracking-widest text-mint/80">
                  Guaranteed Standard
                </div>
              </div>
            ))}
          </div>

          {/* Stat Counters Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-20 mt-16 border-t border-background/15 text-center reveal">
            {content.stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-background tracking-tight">
                  {stat.value}
                </span>
                <span className="font-mono text-xs text-background/60 uppercase tracking-widest mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: HOW IT WORKS (4 Numbered Steps)
      ========================================================================= */}
      <section className="py-24 md:py-32 border-t border-foreground/10 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-20 reveal">
            <span className="eyebrow text-foreground/50 block mb-2">
              Seamless Journey Planning
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[0.95] text-foreground">
              How It Works
            </h2>
            <p className="font-mono text-sm text-foreground/70 mt-4 leading-relaxed">
              From your first WhatsApp message to your final gorilla trek debrief in Musanze.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.howItWorks.steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-[2rem] border border-border bg-card p-7 shadow-soft flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 reveal"
              >
                <div>
                  <span className="font-mono text-3xl font-extrabold text-mint/80 block mb-6">
                    {step.stepNumber}
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="font-mono text-xs text-foreground/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-foreground/40">
                  <span className="font-mono text-[10px] uppercase tracking-widest">
                    Step {idx + 1}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-mint" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: TESTIMONIALS (Traveller Experiences)
      ========================================================================= */}
      <section className="py-24 md:py-32 border-t border-foreground/10 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal">
            <div>
              <span className="eyebrow text-foreground/50 block mb-2">
                Real Guest Journeys
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-[0.95]">
                Memories That Endure
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="mint" withDot>
                TripAdvisor 5.0 Rated
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.testimonials.map((test, idx) => (
              <div
                key={idx}
                className="rounded-[2rem] border border-border bg-card p-8 shadow-soft flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 reveal"
              >
                <div>
                  <Quote className="h-8 w-8 text-mint mb-6 opacity-60" />
                  <p className="font-mono text-sm text-foreground/80 leading-relaxed italic">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-border">
                  <img
                    src={test.avatar}
                    alt={test.author}
                    className="h-12 w-12 rounded-full object-cover border border-border"
                  />
                  <div>
                    <h4 className="font-display text-sm font-extrabold text-foreground">
                      {test.author}
                    </h4>
                    <span className="font-mono text-[11px] text-foreground/50 block">
                      {test.location}
                    </span>
                    <span className="font-mono text-[10px] text-mint uppercase tracking-wider block mt-0.5">
                      {test.trip}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: DESTINATIONS STRIP (Cards)
      ========================================================================= */}
      <section className="py-24 md:py-28 border-t border-foreground/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <span className="eyebrow text-foreground/50 block mb-2">
              Where We Wander
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-[0.95]">
              Signature{' '}
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Destinations
              </span>
            </h2>
            <p className="font-mono text-sm text-foreground/70 mt-4 leading-relaxed">
              Five extraordinary landscapes — from misty volcanoes to sapphire rift lakes — all within a day's journey of Kigali.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultSiteConfig.destinations.map((dest) => (
              <Link
                key={dest.id}
                to="/destinations"
                className="group relative rounded-[2rem] overflow-hidden border border-border shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 reveal"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={dest.coverPhoto}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-mint flex items-center gap-1.5 mb-1">
                    <MapPin className="h-3 w-3" />
                    {dest.subtitle.split('•')[0]?.trim() || dest.subtitle}
                  </span>
                  <h3 className="font-display text-xl font-extrabold leading-tight">
                    {dest.name}
                  </h3>
                  <span className="font-mono text-[11px] text-white/70 block mt-1">
                    Best: {dest.bestSeason.split('(')[0].trim()}
                  </span>
                </div>
              </Link>
            ))}

            {/* CTA card to round out the grid */}
            <Link
              to="/destinations"
              className="group rounded-[2rem] border-2 border-dashed border-foreground/20 bg-secondary/40 p-8 flex flex-col items-center justify-center text-center gap-4 hover:border-mint hover:bg-secondary/70 transition-all duration-300 reveal"
            >
              <div className="h-12 w-12 rounded-full bg-foreground text-background flex items-center justify-center">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-extrabold text-foreground">
                  All Destinations
                </h3>
                <p className="font-mono text-xs text-foreground/60 mt-1">
                  Explore every park, lake, and ridge we cover.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-foreground">
                View the map <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: NEWSLETTER & BESPOKE INQUIRY BANNER
      ========================================================================= */}
      <section className="py-20 border-t border-foreground/10 bg-background">
        <div className="mx-auto max-w-5xl px-6">
          <div className="glass rounded-[2rem] p-8 md:p-14 text-center relative overflow-hidden border border-border shadow-elegant reveal">
            <div className="absolute top-0 right-0 w-64 h-64 bg-mint/15 orb-glow pointer-events-none" />

            <span className="eyebrow text-foreground/50 block mb-3">
              Tailored Consultation
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
              Ready to Wander East Africa?
            </h2>
            <p className="font-mono text-sm text-foreground/70 max-w-xl mx-auto mt-4 leading-relaxed">
              Our Kigali naturalist guides will craft a private itinerary aligned with your pace, permits, and conservation interests.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="shadow-soft">
                  <span>Send Custom Request</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <a
                href="https://wa.me/250788123456"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="lg">
                  Instant WhatsApp Chat
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
