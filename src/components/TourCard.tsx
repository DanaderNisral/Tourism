import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { Tour } from '@/data/site.defaults'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, ArrowUpRight } from 'lucide-react'
import { useCurrency } from '@/hooks/useSiteData'

interface TourCardProps {
  tour: Tour
  className?: string
}

export function TourCard({ tour, className }: TourCardProps) {
  const { currency } = useCurrency()
  const discountPercent =
    tour.salePrice && tour.price > tour.salePrice
      ? Math.round(((tour.price - tour.salePrice) / tour.price) * 100)
      : null

  const mainPhoto = tour.photos[0]

  return (
    <div
      className={`group relative rounded-[2rem] border border-border bg-card p-5 md:p-6 shadow-soft hover:-translate-y-1 hover:shadow-elegant transition-all duration-300 flex flex-col justify-between ${className || ''}`}
    >
      <div>
        {/* Image Frame: aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-secondary with image and blurred background */}
        <div className="relative aspect-[4/5] w-full rounded-[1.5rem] overflow-hidden bg-secondary mb-5">
          {/* Ambient blurred backdrop copy */}
          <img
            src={mainPhoto}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-[1.16] blur-[22px] opacity-75 pointer-events-none"
            loading="lazy"
          />
          {/* Main crisp cover image */}
          <img
            src={mainPhoto}
            alt={tour.name}
            className="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Scrim overlay for contrast */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Top category & discount badges */}
          <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between gap-2">
            <span className="bg-black/45 backdrop-blur-md border border-white/25 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
              {tour.category}
            </span>
            {discountPercent && (
              <Badge variant="mint" className="text-black bg-mint">
                Save {discountPercent}%
              </Badge>
            )}
          </div>

          {/* Bottom-left small glass pill label */}
          <div className="absolute bottom-3 left-3 z-30 flex items-center gap-1.5 bg-black/45 backdrop-blur-md border border-white/25 rounded-full px-3 py-1 text-white">
            <Clock className="h-3 w-3 text-mint" />
            <span className="font-mono text-[11px] font-semibold">
              {tour.meta.durationDays} Days
            </span>
          </div>

          {/* Bottom-right group size badge */}
          <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 bg-black/45 backdrop-blur-md border border-white/25 rounded-full px-3 py-1 text-white">
            <Users className="h-3 w-3 text-sky" />
            <span className="font-mono text-[11px] font-semibold">
              {tour.meta.groupSize.replace('travellers', '').trim()}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link
          to="/tours/$slug"
          params={{ slug: tour.slug }}
          className="block group/link focus:outline-none"
        >
          <h3 className="font-display text-xl font-extrabold leading-tight text-foreground transition-colors group-hover/link:text-foreground/80 flex items-start justify-between gap-2">
            <span>{tour.name}</span>
            <ArrowUpRight className="h-5 w-5 shrink-0 opacity-40 group-hover/link:opacity-100 transition-opacity mt-0.5" />
          </h3>
        </Link>

        {/* Top Highlights Preview */}
        {tour.meta.highlights && tour.meta.highlights[0] && (
          <p className="font-mono text-xs text-foreground/60 mt-2.5 line-clamp-2 leading-relaxed">
            {tour.meta.highlights[0]}
          </p>
        )}
      </div>

      {/* Footer: Price & CTA */}
      <div className="pt-5 mt-5 border-t border-border flex items-end justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 block">
            From per person
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-mono text-lg font-bold text-foreground">
              {formatPrice(tour.salePrice || tour.price, currency)}
            </span>
            {tour.salePrice && (
              <span className="font-mono text-xs line-through text-foreground/40">
                {formatPrice(tour.price, currency)}
              </span>
            )}
          </div>
        </div>

        <Link
          to="/tours/$slug"
          params={{ slug: tour.slug }}
          className="inline-flex items-center justify-center rounded-full bg-secondary px-4 py-2 font-mono text-xs font-semibold text-foreground hover:bg-foreground hover:text-background transition-colors"
        >
          View Safari
        </Link>
      </div>
    </div>
  )
}
