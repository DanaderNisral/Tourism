import * as React from 'react'
import { useState } from 'react'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useTour, useTours, useCurrency } from '@/hooks/useSiteData'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { BookingDialog } from '@/components/BookingDialog'
import { defaultSiteConfig } from '@/data/site.defaults'
import { TourCard } from '@/components/TourCard'
import {
  Clock,
  Users,
  Star,
  Check,
  X,
  MapPin,
  Calendar,
  ShieldCheck,
  Images,
  ArrowRight,
  MessageCircle,
  HelpCircle,
} from 'lucide-react'

export const Route = createFileRoute('/tours/$slug')({
  component: TourDetailPage,
})

function TourDetailPage() {
  const { slug } = useParams({ from: '/tours/$slug' })
  const { tour, isLoading } = useTour(slug)
  const { data: allTours } = useTours()
  const { currency } = useCurrency()

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const [activePhotoIdx, setActivePhotoIdx] = useState(0)

  if (isLoading || !tour) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-32 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-foreground border-t-transparent mx-auto mb-4" />
        <p className="font-mono text-sm text-foreground/60">Loading expedition details...</p>
      </div>
    )
  }

  const photos = tour.photos.length >= 5 ? tour.photos : [...tour.photos, ...tour.photos, ...tour.photos].slice(0, 5)
  const relatedTours = allTours?.filter((t) => t.id !== tour.id).slice(0, 3) || []

  return (
    <div className="flex flex-col w-full pb-32">
      {/* =========================================================================
          HERO 3: MOSAIC HERO (1 LARGE + 4 SMALL PHOTOS)
          "View all photos" button opens lightbox dialog; Title, rating, duration, chips
      ========================================================================= */}
      <section className="relative px-4 sm:px-6 pt-6 max-w-7xl mx-auto w-full">
        {/* Breadcrumb & Eyebrow */}
        <div className="flex items-center gap-2 font-mono text-xs text-foreground/50 mb-4">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/tours" className="hover:text-foreground transition-colors">
            Tours
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">{tour.name}</span>
        </div>

        {/* Title & Metadata Chips */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="mint" withDot>
                {tour.category}
              </Badge>
              <div className="flex items-center gap-1 font-mono text-xs text-foreground/70 bg-secondary px-3 py-1 rounded-full border border-border">
                <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
                <span className="font-bold">5.0</span>
                <span className="text-foreground/40">(48 reviews)</span>
              </div>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-foreground leading-[0.95] tracking-tight">
              {tour.name}
            </h1>
          </div>

          {/* Quick specs chips */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-mono text-xs">
              <Clock className="h-4 w-4 text-mint" />
              <span>{tour.meta.durationDays} Days</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 font-mono text-xs">
              <Users className="h-4 w-4 text-sky" />
              <span>{tour.meta.groupSize}</span>
            </div>
          </div>
        </div>

        {/* 5-Photo Mosaic Hero Grid */}
        <div className="relative rounded-[2rem] overflow-hidden grid grid-cols-1 md:grid-cols-4 gap-3 h-[420px] md:h-[500px] border border-border shadow-soft">
          {/* Main Large Photo (md:col-span-2, row-span-2) */}
          <div
            onClick={() => {
              setActivePhotoIdx(0)
              setLightboxOpen(true)
            }}
            className="md:col-span-2 h-full relative cursor-pointer group overflow-hidden"
          >
            <img
              src={photos[0]}
              alt={tour.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* 4 Small Photos on the Right (2x2) */}
          <div className="hidden md:grid col-span-2 grid-cols-2 gap-3 h-full">
            {photos.slice(1, 5).map((photo, i) => (
              <div
                key={i}
                onClick={() => {
                  setActivePhotoIdx(i + 1)
                  setLightboxOpen(true)
                }}
                className="relative cursor-pointer group overflow-hidden h-full rounded-xl"
              >
                <img
                  src={photo}
                  alt={`${tour.name} gallery ${i + 2}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>

          {/* "View all photos" Floating Pill Button bottom-right */}
          <button
            onClick={() => {
              setActivePhotoIdx(0)
              setLightboxOpen(true)
            }}
            className="absolute bottom-5 right-5 z-20 glass rounded-full px-4 py-2 font-mono text-xs font-bold text-foreground flex items-center gap-2 shadow-glass hover:scale-105 transition-all"
          >
            <Images className="h-4 w-4 text-mint" />
            <span>View All Photos</span>
          </button>
        </div>
      </section>

      {/* =========================================================================
          CONTENT SECTION: ITINERARY & STICKY BOOKING CARD
      ========================================================================= */}
      <section className="pt-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (lg:col-span-8): Itinerary, Inclusions, Reviews, FAQs */}
          <div className="lg:col-span-8 space-y-16">
            {/* Highlights overview */}
            <div>
              <span className="eyebrow text-foreground/50 block mb-2">
                Expedition Highlights
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mb-6">
                What Makes This Journey Rare
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tour.meta.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border bg-card p-4.5 flex items-start gap-3 shadow-soft"
                  >
                    <div className="h-6 w-6 rounded-full bg-mint/20 text-foreground flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 text-foreground" />
                    </div>
                    <span className="font-mono text-xs text-foreground/80 leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overview & Quick Facts */}
            <div>
              <span className="eyebrow text-foreground/50 block mb-2">
                The Experience
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                About This Expedition
              </h2>
              <p className="font-mono text-sm text-foreground/75 leading-relaxed">
                The {tour.name} is a {tour.meta.durationDays}-day {tour.category.toLowerCase()} journey
                designed and led by Sarumba Travel' native Rwandan naturalist guides. Travelling in a
                private 4x4 cruiser with a maximum party of {tour.meta.groupSize.toLowerCase()},
                this itinerary balances iconic wildlife encounters with unhurried time in boutique
                eco-lodges, all timed around the {tour.meta.season.toLowerCase()}.
              </p>

              {/* Quick Facts Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                {[
                  { label: 'Duration', value: `${tour.meta.durationDays} Days` },
                  { label: 'Group Size', value: tour.meta.groupSize },
                  { label: 'Difficulty', value: tour.meta.difficulty },
                  { label: 'Best Season', value: tour.meta.season },
                  ...(tour.meta.altitude ? [{ label: 'Altitude', value: tour.meta.altitude }] : []),
                  ...(tour.meta.distanceFromKigali
                    ? [{ label: 'From Kigali', value: tour.meta.distanceFromKigali }]
                    : []),
                ].map((fact, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-secondary/40 p-4 flex flex-col"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/50 mb-1">
                      {fact.label}
                    </span>
                    <span className="font-mono text-xs font-bold text-foreground leading-snug">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Traveller Reviews */}
            <div>
              <span className="eyebrow text-foreground/50 block mb-2">
                Verified Feedback
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mb-6">
                What Guests Say About This Tour
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(tour.meta.reviews && tour.meta.reviews.length > 0
                  ? tour.meta.reviews
                  : defaultSiteConfig.site.testimonials.map((t: any, i: number) => ({
                      id: `fallback-${i}`,
                      author: t.author,
                      country: t.location,
                      rating: 5,
                      date: 'Recent journey',
                      comment: t.quote,
                    }))
                ).map((review) => (
                  <div
                    key={review.id}
                    className="rounded-[2rem] border border-border bg-card p-7 shadow-soft flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'fill-gold text-gold'
                                : 'text-foreground/20'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                        {review.date}
                      </span>
                    </div>
                    <p className="font-mono text-sm text-foreground/80 leading-relaxed italic flex-1">
                      "{review.comment}"
                    </p>
                    <div className="pt-5 mt-5 border-t border-border flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-display font-extrabold text-foreground text-sm">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-extrabold text-foreground">
                          {review.author}
                        </h4>
                        <span className="font-mono text-[11px] text-foreground/50 block">
                          {review.country} • Verified Traveller
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (lg:col-span-4): Sticky Booking Card on Desktop */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28">
            <div className="glass rounded-[2rem] p-7 border border-border shadow-elegant space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 block">
                  Price per person
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-mono text-3xl font-extrabold text-foreground">
                    {formatPrice(tour.salePrice || tour.price, currency)}
                  </span>
                  {tour.salePrice && (
                    <span className="font-mono text-sm line-through text-foreground/40">
                      {formatPrice(tour.price, currency)}
                    </span>
                  )}
                </div>
                <span className="font-mono text-[11px] text-foreground/50 block mt-1">
                  Includes official RDB gorilla/park conservation fees
                </span>
              </div>

              <div className="pt-4 border-t border-border space-y-3 font-mono text-xs text-foreground/75">
                <div className="flex items-center justify-between">
                  <span>Duration:</span>
                  <span className="font-bold text-foreground">{tour.meta.durationDays} Days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Group:</span>
                  <span className="font-bold text-foreground">{tour.meta.groupSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Best Season:</span>
                  <span className="font-bold text-foreground">{tour.meta.season}</span>
                </div>
              </div>

              <Button
                onClick={() => setBookingDialogOpen(true)}
                size="lg"
                className="w-full justify-center group shadow-soft"
              >
                <span>Request Booking</span>
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>

              <a
                href={`https://wa.me/250788123456?text=${encodeURIComponent(
                  `Hello Sarumba Travel! I am interested in booking "${tour.name}". Could you check availability?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button variant="outline" size="lg" className="w-full justify-center">
                  <MessageCircle className="h-4 w-4 mr-2 text-whatsapp" />
                  Inquire on WhatsApp
                </Button>
              </a>

              <div className="flex items-center gap-2 text-foreground/50 font-mono text-[10px] justify-center pt-2">
                <ShieldCheck className="h-3.5 w-3.5 text-mint" />
                <span>Zero online card risk • 24h custom quote</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONVERSION CTA BANNER
      ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground text-background p-10 sm:p-16 shadow-elegant">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-mint/15 orb-glow pointer-events-none" />
          <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-gold/10 orb-glow pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <span className="eyebrow text-background/50 block">
                Limited Departures
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-background leading-[0.95]">
                Ready to Experience the {tour.name}?
              </h2>
              <p className="font-mono text-sm text-background/70 max-w-xl leading-relaxed">
                Gorilla and chimpanzee permits are limited each season. Send us your dates and
                party size — we will confirm availability and send a tailored quote within 24 hours.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Button
                onClick={() => setBookingDialogOpen(true)}
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 justify-center"
              >
                Request This Tour
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <a
                href={`https://wa.me/250788123456?text=${encodeURIComponent(
                  `Hello Sarumba Travel! I am interested in "${tour.name}". Could you check availability?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full justify-center border-background/30 text-background bg-transparent hover:bg-background/10"
                >
                  <MessageCircle className="h-4 w-4 mr-2 text-whatsapp" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          RELATED TOURS SECTION
      ========================================================================= */}
      {relatedTours.length > 0 && (
        <section className="py-24 border-t border-foreground/10 max-w-7xl mx-auto px-6 w-full">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="eyebrow text-foreground/50 block mb-2">
                More Adventures
              </span>
              <h2 className="font-display text-3xl font-extrabold text-foreground">
                You May Also Like
              </h2>
            </div>
            <Link to="/tours">
              <Button variant="outline">View All Safaris</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedTours.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          STICKY BOTTOM BAR ON MOBILE (< md)
          Price & "Book now" button opening bottom-sheet booking dialog
      ========================================================================= */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-border px-5 py-3.5 flex items-center justify-between shadow-elegant">
        <div>
          <span className="font-mono text-[10px] uppercase text-foreground/50 block">
            From
          </span>
          <span className="font-mono text-lg font-bold text-foreground">
            {formatPrice(tour.salePrice || tour.price, currency)}
          </span>
        </div>

        <Button
          onClick={() => setBookingDialogOpen(true)}
          size="default"
          className="shadow-soft"
        >
          Book now
        </Button>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="md:max-w-4xl p-2 bg-black border-none text-white">
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
            <img
              src={photos[activePhotoIdx]}
              alt={`${tour.name} view ${activePhotoIdx + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex items-center justify-center gap-2 p-4 overflow-x-auto">
            {photos.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePhotoIdx(i)}
                className={`h-16 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                  activePhotoIdx === i
                    ? 'border-mint scale-105'
                    : 'border-transparent opacity-60'
                }`}
              >
                <img src={p} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Dialog */}
      <BookingDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        initialTourSlug={tour.slug}
      />
    </div>
  )
}
