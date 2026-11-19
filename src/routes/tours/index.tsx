import * as React from 'react'
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTours, useCurrency } from '@/hooks/useSiteData'
import { TourCard } from '@/components/TourCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { formatPrice } from '@/lib/utils'
import { defaultSiteConfig } from '@/data/site.defaults'
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/tours/')({
  component: ToursPage,
})

const categories = [
  'All',
  'Gorilla trekking',
  'Safari',
  'Culture',
  'Hiking',
  'Lakes',
]

function ToursPage() {
  const { currency } = useCurrency()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [maxPrice, setMaxPrice] = useState<number>(5000)
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'duration'>('featured')

  const { data: tours, isLoading } = useTours({
    category: selectedCategory,
    search: searchQuery,
    sortBy,
    maxPrice,
  })

  const displayTours = tours ?? defaultSiteConfig.tours

  return (
    <div className="flex flex-col w-full pb-32">
      {/* =========================================================================
          HERO 2: TOURS CATALOG (SPLIT HERO)
          Left: eyebrow "All tours", giant heading, filter pill chips and duration/price Radix slider
          Right: 3 overlapping tilted rounded photos with float-slow animation
      ========================================================================= */}
      <section className="relative px-6 pt-8 pb-20 max-w-7xl mx-auto w-full overflow-hidden">
        {/* Ambient mint and sky glow orbs */}
        <div className="absolute top-10 left-1/3 w-80 h-80 rounded-full bg-mint/20 orb-glow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-sky/15 orb-glow" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (lg:col-span-7): Heading & Filters */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <span className="eyebrow text-foreground/50">
              Curated Expeditions
            </span>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-foreground leading-[0.95] tracking-tight">
              All{' '}
              <span className="bg-gradient-to-r from-foreground via-mint to-foreground bg-clip-text text-transparent">
                Tours & Expeditions
              </span>
            </h1>

            <p className="font-mono text-sm text-foreground/70 max-w-xl leading-relaxed">
              From dawn gorilla encounters high in the Virunga volcanoes to sunset boat cruises on Lake Ihema, discover private journeys led by East Africa’s finest naturalist trackers.
            </p>

            {/* Category Filter Pill Chips */}
            <div className="pt-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 block mb-2.5">
                Filter by Category
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-full px-4 py-2 font-mono text-xs font-semibold transition-all duration-200 ${
                        isSelected
                          ? 'bg-foreground text-background shadow-soft ring-1 ring-ring ring-offset-2'
                          : 'border border-foreground/15 bg-background text-foreground/70 hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      {cat === 'All' ? 'All Tours' : cat}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Price Filter Radix Slider */}
            <div className="pt-4 max-w-md space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-foreground/60 uppercase tracking-wider">
                  Max Budget
                </span>
                <span className="font-bold text-foreground">
                  Up to {formatPrice(maxPrice, currency)}
                </span>
              </div>
              <Slider
                value={[maxPrice]}
                min={500}
                max={5000}
                step={100}
                onValueChange={(val) => setMaxPrice(val[0])}
              />
            </div>
          </div>

          {/* Right Column (lg:col-span-5): 3 Overlapping Tilted Rounded Photos with float-slow animation */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[460px] flex items-center justify-center">
            {/* Photo 1: Back left */}
            <div className="absolute left-2 sm:left-6 top-8 w-44 sm:w-56 aspect-[3/4] rounded-[24px] overflow-hidden shadow-hero-photo border border-white/20 rotate-[-6deg] animate-float-slow">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop"
                alt="Rainforest canopy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Photo 2: Back right */}
            <div className="absolute right-2 sm:right-6 top-16 w-44 sm:w-56 aspect-[3/4] rounded-[24px] overflow-hidden shadow-hero-photo border border-white/20 rotate-[6deg] animate-float-slow [animation-delay:1.5s]">
              <img
                src="https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=600&auto=format&fit=crop"
                alt="Akagera lion"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Photo 3: Center Front */}
            <div className="relative z-10 w-48 sm:w-60 aspect-[3/4] rounded-[24px] overflow-hidden shadow-hero-photo border-2 border-background rotate-[-1deg] animate-float-slow [animation-delay:3s]">
              <img
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=700&auto=format&fit=crop"
                alt="Silverback gorilla"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 z-20 bg-black/45 backdrop-blur-md border border-white/25 rounded-full px-3 py-1.5 text-center font-mono text-[11px] font-bold text-white">
                Rwanda Primates
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TOOLBAR: SEARCH + SORT
      ========================================================================= */}
      <section className="border-t border-foreground/10 bg-secondary/30 py-6">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="w-full sm:max-w-md">
            <Input
              placeholder="Search by park, animal, or experience..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery('')}
              icon={<Search className="h-4 w-4" />}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="font-mono text-xs text-foreground/50 whitespace-nowrap">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-10 rounded-full border border-foreground/15 bg-background px-4 font-mono text-xs font-bold text-foreground focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured Safaris</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="duration">Longest Duration</option>
            </select>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TOUR CARDS GRID
      ========================================================================= */}
      <section className="py-16 mx-auto max-w-7xl px-6 w-full">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="rounded-[2rem] border border-border bg-card p-6 aspect-[4/5] animate-pulse"
              />
            ))}
          </div>
        ) : displayTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTours.map((tour) => (
              <div key={tour.id} className="reveal">
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-[2rem] border border-dashed border-border bg-card p-8">
            <div className="h-14 w-14 rounded-full bg-secondary mx-auto flex items-center justify-center text-foreground/40 mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              No matching itineraries found
            </h3>
            <p className="font-mono text-xs text-foreground/60 mt-2 max-w-sm mx-auto">
              Try adjusting your category filter, clearing your search query, or increasing the budget slider.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
                setMaxPrice(5000)
              }}
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
