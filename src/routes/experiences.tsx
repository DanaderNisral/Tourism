import * as React from 'react'
import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useExperiences } from '@/hooks/useSiteData'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import {
  Footprints,
  HeartHandshake,
  Mountain,
  Trees,
  ArrowRight,
  Sparkles,
  Compass,
} from 'lucide-react'

export const Route = createFileRoute('/experiences')({
  component: ExperiencesPage,
})

function ExperiencesPage() {
  const experiences = useExperiences()
  const [selectedExp, setSelectedExp] = useState<(typeof experiences)[number] | null>(null)

  return (
    <div className="flex flex-col w-full pb-32">
      {/* =========================================================================
          HERO 5: EXPERIENCES HERO
          Hero with a 3-column icon-card row (Wildlife, Culture, Adventure), each card a glass tile
      ========================================================================= */}
      <section className="relative px-6 pt-10 pb-20 max-w-7xl mx-auto w-full">
        {/* Soft mint & sky ambient glow orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-mint/20 orb-glow" />
        <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-sky/15 orb-glow" />

        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <span className="eyebrow text-foreground/50 block mb-2">
            Curated Immersions
          </span>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-foreground leading-[0.95] tracking-tight">
            Journeys of{' '}
            <span className="bg-gradient-to-r from-foreground via-mint to-foreground bg-clip-text text-transparent">
              Transformation
            </span>
          </h1>
          <p className="font-mono text-sm sm:text-base text-foreground/70 mt-6 leading-relaxed">
            Move beyond conventional tourism. Every Sarumba experience connects you directly to the rangers, artisans, and landscapes shaping East Africa's future.
          </p>
        </div>

        {/* 3-Column Glass Icon-Card Row (Wildlife, Culture, Adventure) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {/* Tile 1: Wildlife */}
          <div className="glass rounded-[2rem] p-8 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-glass border border-foreground/10 group">
            <div>
              <div className="h-12 w-12 rounded-full bg-mint/20 text-foreground flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <Footprints className="h-6 w-6 text-foreground" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-mint font-bold block mb-1">
                Wildlife & Primates
              </span>
              <h2 className="font-display text-2xl font-extrabold text-foreground mb-3">
                Primates in the Mist
              </h2>
              <p className="font-mono text-xs text-foreground/70 leading-relaxed">
                Face-to-face encounters with endangered mountain gorillas, golden monkeys, and ancient Nyungwe chimpanzee communities.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-border font-mono text-xs font-bold text-foreground flex items-center justify-between">
              <span>1,000+ Gorillas Protected</span>
              <span className="text-mint">→</span>
            </div>
          </div>

          {/* Tile 2: Culture */}
          <div className="glass rounded-[2rem] p-8 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-glass border border-foreground/10 group">
            <div>
              <div className="h-12 w-12 rounded-full bg-sky/20 text-foreground flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <HeartHandshake className="h-6 w-6 text-foreground" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-sky font-bold block mb-1">
                Living Heritage
              </span>
              <h2 className="font-display text-2xl font-extrabold text-foreground mb-3">
                Heart of Thousand Hills
              </h2>
              <p className="font-mono text-xs text-foreground/70 leading-relaxed">
                Traditional Intore warrior dance rhythms, royal Inyambo cattle, Imigongo art workshops, and coffee crop-to-cup journeys.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-border font-mono text-xs font-bold text-foreground flex items-center justify-between">
              <span>12 Partner Cooperatives</span>
              <span className="text-sky">→</span>
            </div>
          </div>

          {/* Tile 3: Adventure */}
          <div className="glass rounded-[2rem] p-8 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-glass border border-foreground/10 group">
            <div>
              <div className="h-12 w-12 rounded-full bg-lavender/25 text-foreground flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <Mountain className="h-6 w-6 text-foreground" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-lavender font-bold block mb-1">
                Active Adventure
              </span>
              <h2 className="font-display text-2xl font-extrabold text-foreground mb-3">
                High-Altitude Trails
              </h2>
              <p className="font-mono text-xs text-foreground/70 leading-relaxed">
                East Africa’s highest canopy walkway, volcano crater lake ascents, and tranquil sunset kayak paddles along Lake Kivu.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-border font-mono text-xs font-bold text-foreground flex items-center justify-between">
              <span>4,507m Summit Altitude</span>
              <span className="text-foreground/70">→</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EXPERIENCE SHOWCASE CARDS
      ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-6 w-full space-y-16">
        {experiences.map((exp, idx) => (
          <div
            key={exp.id}
            className="rounded-[2.5rem] border border-border bg-card p-6 sm:p-10 shadow-soft hover:shadow-elegant transition-all duration-300 reveal"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-secondary shadow-hero-photo">
                <img
                  src={exp.photo}
                  alt={exp.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-6 space-y-5">
                <Badge variant="mint" withDot>
                  {exp.category}
                </Badge>
                <h3 className="font-display text-3xl font-extrabold text-foreground">
                  {exp.title}
                </h3>
                <p className="font-mono text-sm text-foreground/75 leading-relaxed">
                  {exp.fullDescription}
                </p>
                <div className="pt-2">
                  <Button
                    className="group shadow-soft"
                    onClick={() => setSelectedExp(exp)}
                  >
                    <span>Explore This Experience</span>
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      {/* =========================================================================
          CLOSING CTA
      ========================================================================= */}
      <section className="py-20 border-t border-foreground/10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-[2.5rem] bg-foreground text-background p-10 sm:p-14 text-center relative overflow-hidden reveal">
            <div className="absolute -top-20 right-10 w-80 h-80 rounded-full bg-mint/10 orb-glow pointer-events-none" />
            <span className="eyebrow text-background/50 block mb-3">Begin Your Journey</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-background leading-tight">
              Every Great Safari Starts With a Conversation
            </h2>
            <p className="font-mono text-sm text-background/70 max-w-xl mx-auto mt-4 leading-relaxed">
              Tell us what moves you — gorillas, gastronomy, mountains, or meaning — and we will shape an experience around it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/tours">
                <Button size="lg" className="bg-background text-foreground hover:bg-background/90">
                  Browse Tours <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-background/30 text-background bg-transparent hover:bg-background/10">
                  Talk to a Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Detail Popup */}
      <Dialog
        open={Boolean(selectedExp)}
        onOpenChange={(open) => !open && setSelectedExp(null)}
      >
        <DialogContent className="md:max-w-3xl p-0 overflow-hidden bg-card border-border">
          {selectedExp && (
            <div className="flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={selectedExp.photo}
                  alt={selectedExp.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
                  <div>
                    <Badge variant="mint" withDot className="mb-2">{selectedExp.category}</Badge>
                    <DialogTitle className="font-display text-2xl font-extrabold text-white leading-tight">
                      {selectedExp.title}
                    </DialogTitle>
                  </div>
                  <span className="glass rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white shrink-0">
                    {selectedExp.stats}
                  </span>
                </div>
              </div>
              <div className="p-7 space-y-5">
                <p className="font-mono text-sm text-foreground/75 leading-relaxed">
                  {selectedExp.fullDescription}
                </p>
                <p className="font-mono text-xs text-foreground/55 leading-relaxed">
                  {selectedExp.shortDescription}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link to="/tours" onClick={() => setSelectedExp(null)}>
                    <Button className="group shadow-soft">
                      <span>See Tours Featuring This</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedExp(null)}
                  >
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
