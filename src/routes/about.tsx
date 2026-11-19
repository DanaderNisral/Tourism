import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  ShieldCheck,
  HeartHandshake,
  Trees,
  Award,
  ArrowRight,
  Quote,
} from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="flex flex-col w-full pb-32">
      {/* =========================================================================
          HERO — CLEAN TYPOGRAPHIC INTRO (no photo, no stats, no buttons)
      ========================================================================= */}
      <section className="relative px-6 pt-16 md:pt-24 pb-16 md:pb-20 text-center max-w-5xl mx-auto w-full">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-mint/15 orb-glow pointer-events-none" />
        <div className="absolute top-16 right-[10%] w-72 h-72 bg-gold/10 orb-glow pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <span className="eyebrow text-foreground/50 mb-4 block">
            About Sarumba Travel
          </span>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-foreground leading-[0.95] tracking-tight">
            Wanderers at{' '}
            <span className="bg-gradient-to-r from-mint to-gold bg-clip-text text-transparent">
              Heart
            </span>
          </h1>
          <p className="font-mono text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto mt-6 leading-relaxed">
            A Rwanda-born travel company crafting gorilla treks, savanna safaris, and community-led journeys across the Thousand Hills and East Africa.
          </p>
        </div>
      </section>

      {/* =========================================================================
          OUR STORY — EDITORIAL PROSE
      ========================================================================= */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sticky intro column */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
              <span className="eyebrow text-foreground/50 block">Our Story</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-[0.95]">
                Rooted in the{' '}
                <span className="bg-gradient-to-r from-mint to-gold bg-clip-text text-transparent">
                  Thousand Hills
                </span>
              </h2>
              <p className="font-mono text-sm text-foreground/70 leading-relaxed">
                Sarumba Travel was founded by a small team of Rwandan wildlife researchers, former park rangers, and hospitality professionals who believed tourism could be a force for restoration — not extraction.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-black text-xl shadow-soft">
                  S
                </div>
                <div>
                  <span className="font-display text-sm font-extrabold text-foreground block">The Sarumba Standard</span>
                  <span className="font-mono text-[11px] text-foreground/50">Licensed • Local • Regenerative</span>
                </div>
              </div>
            </div>

            {/* Prose columns */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <h3 className="font-display text-xl font-extrabold text-foreground">Why Sarumba</h3>
                <p className="font-mono text-sm text-foreground/75 leading-relaxed">
                  "Sarumba" is a Rwandan name passed down through the founders' families — it speaks of guidance, of leading others safely through wild and unfamiliar country. It is exactly what we do: our trackers have walked these slopes since childhood, our drivers know every bend of the mountain road, and our planners treat your trip like it is their own family's.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-xl font-extrabold text-foreground">How We Work</h3>
                <p className="font-mono text-sm text-foreground/75 leading-relaxed">
                  Every itinerary is designed on the ground, not in a brochure. Our guides are born-and-raised trackers from Musanze, Karongi, and Nyungwe border villages who know which bamboo thicket the silverback family chose last night before the park office does. Lodges are vetted for genuine sustainability — solar power, local sourcing, fair wages — and at least 10% of every booking flows directly to the community cooperatives that make these landscapes possible.
                </p>
              </div>

              <div className="rounded-[2rem] border border-border bg-secondary/40 p-8 space-y-4">
                <Quote className="h-7 w-7 text-mint" />
                <p className="font-display text-lg sm:text-xl font-bold text-foreground leading-relaxed italic">
                  "We don't sell safaris. We open doors — into forests, into kitchens, into the lives of the people who have protected these hills for generations."
                </p>
                <span className="font-mono text-[11px] uppercase tracking-widest text-foreground/50 block">
                  — Founding Team, Sarumba Travel
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CORE PILLARS — ENHANCED CARDS
      ========================================================================= */}
      <section className="py-24 border-t border-foreground/10 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal">
            <span className="eyebrow text-foreground/50 block mb-2">What We Stand For</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-[0.95]">
              Our Core{' '}
              <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Pillars
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: '100% Licensed & Certified',
                desc: 'Registered with the Rwanda Development Board and Association of Tour Operators.',
                tint: 'bg-mint/15 text-mint',
              },
              {
                icon: HeartHandshake,
                title: 'Direct Community Benefit',
                desc: 'We partner with 12 women\u2019s cooperatives, porter associations, and youth tracking scouts.',
                tint: 'bg-sky/15 text-sky',
              },
              {
                icon: Trees,
                title: 'Habitat Restoration',
                desc: 'Every booking plants 5 indigenous trees in the Virunga buffer corridor.',
                tint: 'bg-gold/15 text-gold',
              },
              {
                icon: Award,
                title: 'Safety & Evacuation',
                desc: '24/7 flying doctor emergency coverage throughout Rwanda and East Africa.',
                tint: 'bg-lavender/20 text-foreground',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-[2rem] border border-border bg-card p-8 shadow-soft hover:-translate-y-1 hover:shadow-elegant transition-all duration-300 reveal flex flex-col"
              >
                <div className={`h-12 w-12 rounded-2xl ${item.tint} flex items-center justify-center mb-6`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-extrabold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-foreground/65 leading-relaxed flex-1">
                  {item.desc}
                </p>
                <div className="pt-5 mt-5 border-t border-border">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-mint font-bold">
                    The Sarumba Standard
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Values strip */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Regenerative Tourism',
                desc: 'Travel that gives back more than it takes — to forests, wildlife, and the people who call them home.',
              },
              {
                title: 'Radical Transparency',
                desc: 'Itemized quotes, honest advice on difficulty and fitness, and zero hidden fees or pressure tactics.',
              },
              {
                title: 'Small Groups, Big Care',
                desc: 'Private and semi-private departures led by certified guides who learn your name on day one.',
              },
            ].map((v, i) => (
              <div key={i} className="rounded-[2rem] border border-border bg-card p-7 reveal">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold block mb-2">
                  0{i + 1}
                </span>
                <h3 className="font-display text-base font-extrabold text-foreground mb-2">
                  {v.title}
                </h3>
                <p className="font-mono text-xs text-foreground/65 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLOSING CTA
      ========================================================================= */}
      <section className="py-20 border-t border-foreground/10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-[2.5rem] bg-foreground text-background p-10 sm:p-14 text-center relative overflow-hidden reveal">
            <div className="absolute -top-20 right-10 w-80 h-80 rounded-full bg-mint/10 orb-glow pointer-events-none" />
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-background leading-tight">
              Come See the Hills Through Our Eyes
            </h2>
            <p className="font-mono text-sm text-background/70 max-w-xl mx-auto mt-4 leading-relaxed">
              Whether it's your first safari or your fiftieth, we would be honoured to show you Rwanda properly.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/tours">
                <Button size="lg" className="bg-background text-foreground hover:bg-background/90">
                  Browse Tours <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-background/30 text-background bg-transparent hover:bg-background/10">
                  Talk to the Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
