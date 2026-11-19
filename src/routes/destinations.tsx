import * as React from 'react'
import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useDestinations } from '@/hooks/useSiteData'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Mountain, Clock, ArrowRight, Check } from 'lucide-react'

export const Route = createFileRoute('/destinations')({
  component: DestinationsPage,
})

function DestinationsPage() {
  const destinations = useDestinations()
  const [selectedDest, setSelectedDest] = useState<(typeof destinations)[number] | null>(null)

  const destinationPills = [
    'Volcanoes National Park',
    'Akagera Savanna',
    'Nyungwe Cloud Forest',
    'Lake Kivu Riviera',
    'Kigali Capital',
    'Virunga Volcanoes',
    'Serengeti Ecosystem',
  ]

  return (
    <div className="flex flex-col w-full pb-32 overflow-hidden">
      {/* =========================================================================
          HERO 4: DESTINATIONS (TYPOGRAPHIC HERO)
          Huge display word "WHERE?" with horizontally scrolling row of destination
          pills over soft mint and sky orbs
      ========================================================================= */}
      <section className="relative px-6 pt-12 pb-24 text-center max-w-7xl mx-auto w-full">
        {/* Soft mint & sky ambient glow orbs behind typographic word */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-mint/25 orb-glow pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-sky/20 orb-glow pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <span className="eyebrow text-foreground/50 mb-4 block">
            Discover Rwanda
          </span>

          {/* Huge display word "WHERE?" */}
          <h1 className="font-display font-extrabold text-7xl sm:text-9xl md:text-[13rem] leading-[0.85] tracking-tight text-foreground select-none">
            WHERE?
          </h1>

          <p className="font-mono text-sm sm:text-base text-foreground/70 max-w-xl mx-auto mt-6 leading-relaxed">
            Rwanda packs an entire continent into a day's drive — misty volcanoes, big-cat savannas, ancient rainforest, and sapphire lake shores, all rooted in the Thousand Hills.
          </p>

          {/* Horizontally scrolling row of destination pills */}
          <div className="w-full overflow-hidden mt-12 py-3 select-none">
            <div className="flex w-max space-x-3 mx-auto justify-center flex-wrap gap-y-3">
              {destinationPills.map((pill, idx) => (
                <span
                  key={idx}
                  className="glass rounded-full px-5 py-2.5 font-mono text-xs font-bold text-foreground border border-foreground/15 shadow-sm hover:scale-105 transition-transform"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          AT-A-GLANCE STATS STRIP
      ========================================================================= */}
      <section className="border-y border-foreground/10 bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '5', label: 'Signature Destinations' },
            { value: '6', label: 'Curated Tours' },
            { value: '1,000+', label: 'Mountain Gorillas' },
            { value: '90 min', label: 'Max drive between parks' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                {stat.value}
              </span>
              <span className="font-mono text-[11px] text-foreground/60 uppercase tracking-widest mt-1.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          ALTERNATING LARGE DESTINATION CARDS
          Image Left/Right with travel facts: best season, altitude, distance from Kigali
      ========================================================================= */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-16">
        {destinations.map((dest, index) => {
          const isEven = index % 2 === 0
          return (
            <div
              key={dest.id}
              className="rounded-[2.5rem] border border-border bg-card p-6 sm:p-10 shadow-soft hover:shadow-elegant transition-all duration-300 reveal"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                  isEven ? '' : 'lg:grid-flow-dense'
                }`}
              >
                {/* Image Column (lg:col-span-6) */}
                <div
                  className={`relative aspect-[16/11] sm:aspect-[4/3] rounded-[2rem] overflow-hidden bg-secondary shadow-hero-photo ${
                    isEven ? 'lg:col-span-6' : 'lg:col-span-6 lg:col-start-7'
                  }`}
                >
                  <img
                    src={dest.coverPhoto}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="bg-black/45 backdrop-blur-md border border-white/25 rounded-full px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                      0{index + 1}
                    </span>
                    <span className="bg-black/45 backdrop-blur-md border border-mint/40 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-mint">
                      Rwanda
                    </span>
                  </div>
                </div>

                {/* Facts Column (lg:col-span-6) */}
                <div
                  className={`space-y-6 ${
                    isEven ? 'lg:col-span-6' : 'lg:col-span-6 lg:col-start-1'
                  }`}
                >
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-mint block mb-2">
                      {dest.subtitle}
                    </span>
                    <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                      {dest.name}
                    </h2>
                  </div>

                  <p className="font-mono text-sm text-foreground/75 leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Travel Facts Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="rounded-2xl border border-border bg-secondary/50 p-3.5 flex flex-col">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/50 flex items-center gap-1.5 mb-1">
                        <Calendar className="h-3 w-3 text-mint" />
                        Best Season
                      </span>
                      <span className="font-mono text-xs font-bold text-foreground">
                        {dest.bestSeason}
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border bg-secondary/50 p-3.5 flex flex-col">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/50 flex items-center gap-1.5 mb-1">
                        <Mountain className="h-3 w-3 text-sky" />
                        Altitude
                      </span>
                      <span className="font-mono text-xs font-bold text-foreground">
                        {dest.altitude}
                      </span>
                    </div>

                    <div className="rounded-2xl border border-border bg-secondary/50 p-3.5 flex flex-col">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/50 flex items-center gap-1.5 mb-1">
                        <Clock className="h-3 w-3 text-foreground/50" />
                        From Kigali
                      </span>
                      <span className="font-mono text-xs font-bold text-foreground">
                        {dest.distanceFromKigali}
                      </span>
                    </div>
                  </div>

                  {/* Highlights list */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {dest.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-secondary px-3 py-1 font-mono text-[11px] text-foreground/70 border border-border"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button — opens detail popup */}
                  <div className="pt-2">
                    <Button
                      className="group shadow-soft"
                      onClick={() => setSelectedDest(dest)}
                    >
                      <span>Explore {dest.name}</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
            </section>

      {/* =========================================================================
          BUILD YOUR CIRCUIT (3 CARDS) + CTA
      ========================================================================= */}
      <section className="py-24 border-t border-foreground/10 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal">
            <span className="eyebrow text-foreground/50 block mb-2">
              Custom Routing
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-[0.95]">
              Build Your{' '}
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Perfect Circuit
              </span>
            </h2>
            <p className="font-mono text-sm text-foreground/70 mt-4 leading-relaxed">
              Most travellers combine two or three destinations. Our planners stitch them into one seamless private journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: 'Gorillas + Savanna',
                desc: 'The classic pairing: face the silverbacks in Volcanoes NP, then spend two days tracking the Big Five and cruising Lake Ihema in Akagera.',
                meta: '5 Days • From $2,650 pp',
                img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800&auto=format&fit=crop',
              },
              {
                title: 'Primates + Rainforest',
                desc: 'Gorilla trekking followed by chimpanzee tracking, the 70m canopy walkway, and waterfall hikes through ancient Nyungwe forest.',
                meta: '7 Days • From $3,100 pp',
                img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
              },
              {
                title: 'Grand East Africa',
                desc: 'Rwanda gorillas paired with the Serengeti migration and Ngorongoro Crater via seamless regional bush flights.',
                meta: '8 Days • From $4,350 pp',
                img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-[2rem] border border-border bg-card overflow-hidden shadow-soft hover:-translate-y-1 hover:shadow-elegant transition-all duration-300 reveal flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-extrabold text-foreground">
                    {card.title}
                  </h3>
                  <p className="font-mono text-xs text-foreground/70 leading-relaxed mt-2 flex-1">
                    {card.desc}
                  </p>
                  <span className="font-mono text-[11px] font-bold text-mint uppercase tracking-widest mt-4 block">
                    {card.meta}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="rounded-[2.5rem] bg-foreground text-background p-10 sm:p-14 text-center relative overflow-hidden reveal">
            <div className="absolute top-0 right-0 w-72 h-72 bg-mint/10 orb-glow pointer-events-none" />
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-background">
              Not Sure Where to Start?
            </h2>
            <p className="font-mono text-sm text-background/70 max-w-lg mx-auto mt-3 leading-relaxed">
              Tell us your dates and wildlife priorities — we will design a multi-park circuit with seamless transfers and lodge bookings handled.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="bg-background text-foreground hover:bg-background/90">
                  Plan My Circuit
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link to="/tours">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-background/30 text-background bg-transparent hover:bg-background/10"
                >
                  Browse All Tours
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destination Detail Popup */}
      <Dialog
        open={Boolean(selectedDest)}
        onOpenChange={(open) => !open && setSelectedDest(null)}
      >
        <DialogContent className="md:max-w-3xl p-0 overflow-hidden bg-card border-border">
          {selectedDest && (
            <div className="flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={selectedDest.coverPhoto}
                  alt={selectedDest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <span className="bg-black/45 backdrop-blur-md border border-white/25 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-mint mb-2 inline-block">
                    Rwanda
                  </span>
                  <DialogTitle className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {selectedDest.name}
                  </DialogTitle>
                  <p className="font-mono text-xs text-white/75 mt-1">{selectedDest.subtitle}</p>
                </div>
              </div>
              <div className="p-7 space-y-5">
                <p className="font-mono text-sm text-foreground/75 leading-relaxed">
                  {selectedDest.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { icon: Calendar, label: 'Best Season', value: selectedDest.bestSeason },
                    { icon: Mountain, label: 'Altitude', value: selectedDest.altitude },
                    { icon: Clock, label: 'From Kigali', value: selectedDest.distanceFromKigali },
                  ].map((fact, i) => (
                    <div key={i} className="rounded-2xl border border-border bg-secondary/40 p-4 flex flex-col">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/50 flex items-center gap-1.5 mb-1">
                        <fact.icon className="h-3 w-3 text-mint" />
                        {fact.label}
                      </span>
                      <span className="font-mono text-xs font-bold text-foreground leading-snug">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedDest.highlights.map((h, i) => (
                    <span key={i} className="rounded-full bg-secondary px-3 py-1 font-mono text-[11px] text-foreground/70 border border-border">
                      ✓ {h}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  {selectedDest.topTourSlug && (
                    <Link
                      to="/tours/$slug"
                      params={{ slug: selectedDest.topTourSlug }}
                      onClick={() => setSelectedDest(null)}
                    >
                      <Button className="group shadow-soft">
                        <span>View Signature Safari</span>
                        <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" onClick={() => setSelectedDest(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
