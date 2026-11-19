import * as React from 'react'
import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Images, MapPin, Eye, ArrowUpRight, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/gallery')({
  component: GalleryPage,
})

interface PhotoItem {
  src: string
  title: string
  location: string
  caption: string
  aspectRatio: string
  tag: string
}

const galleryPhotos: PhotoItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200&auto=format&fit=crop',
    title: 'Silverback in the Bamboo',
    location: 'Volcanoes National Park, Rwanda',
    caption: 'A 450-pound dominant male observing his family group in the morning mist.',
    aspectRatio: 'aspect-[3/4]',
    tag: 'Field Note',
  },
  {
    src: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1000&auto=format&fit=crop',
    title: 'Akagera Pride',
    location: 'Kilala Plains, Akagera',
    caption: 'Lions resting in the golden hour savanna breeze after a successful night hunt.',
    aspectRatio: 'aspect-[4/3]',
    tag: 'Field Note',
  },
  {
    src: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop',
    title: 'High Canopy Walkway',
    location: 'Nyungwe National Park, Rwanda',
    caption: 'Walking 70 meters above the virgin montane rainforest canopy.',
    aspectRatio: 'aspect-[3/4]',
    tag: 'Field Note',
  },
  {
    src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop',
    title: 'Savanna Silhouette',
    location: 'Serengeti Ecosystem',
    caption: 'Acacia trees against an amber dusk sky during the great migration.',
    aspectRatio: 'aspect-[4/3]',
    tag: 'Field Note',
  },
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
    title: 'Sapphire Lake Kivu',
    location: 'Rubavu Shores, Rwanda',
    caption: 'Tranquil calm waters fringed with lush coffee terraced hills.',
    aspectRatio: 'aspect-[3/4]',
    tag: 'Field Note',
  },
  {
    src: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop',
    title: 'Kigali Artisan Colors',
    location: 'Inema Arts Center, Kigali',
    caption: 'Contemporary Rwandan acrylics celebrating cultural heritage.',
    aspectRatio: 'aspect-[4/3]',
    tag: 'Field Note',
  },
  {
    src: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?q=80&w=1000&auto=format&fit=crop',
    title: 'Elephant Family at Waterhole',
    location: 'Northern Plains, Akagera',
    caption: 'A matriarch leads her family to the lake shore at first light, dust rising off the savanna.',
    aspectRatio: 'aspect-[4/3]',
    tag: 'Big Five',
  },
  {
    src: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1000&auto=format&fit=crop',
    title: 'Chimpanzee in the Canopy',
    location: 'Cyamudongo, Nyungwe',
    caption: 'A juvenile chimpanzee peering through fig leaves high above the forest floor.',
    aspectRatio: 'aspect-[3/4]',
    tag: 'Primate Trek',
  },
  {
    src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
    title: 'Moss-Covered Ancient Forest',
    location: 'Nyungwe National Park',
    caption: 'Giant hardwoods draped in old-man’s beard moss — a forest that survived the last ice age.',
    aspectRatio: 'aspect-[4/3]',
    tag: 'Rainforest',
  },
  {
    src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop',
    title: 'Bourbon Coffee Harvest',
    location: 'Lake Kivu Coffee Hills',
    caption: 'Red ripe cherries hand-picked on steep terraces, destined for the washing station by noon.',
    aspectRatio: 'aspect-[3/4]',
    tag: 'Coffee Trail',
  },
  {
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop',
    title: 'Singing Fishermen at Dusk',
    location: 'Lake Kivu, Rubavu',
    caption: 'Three wooden pirogues returning with lanterns glowing, voices carrying across the dark water.',
    aspectRatio: 'aspect-[4/3]',
    tag: 'Lake Kivu',
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop',
    title: 'Kigali Table & Flame',
    location: 'Kigali, Rwanda',
    caption: 'A candlelit dinner of brochettes and fresh lake tilapia after a day of exploring the capital.',
    aspectRatio: 'aspect-[3/4]',
    tag: 'Gastronomy',
  },
  {
    src: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1000&auto=format&fit=crop',
    title: 'Volcanoes at First Light',
    location: 'Virunga Range, Northern Rwanda',
    caption: 'Five dormant volcanoes emerge from the morning mist above the Kinigi park headquarters.',
    aspectRatio: 'aspect-[4/3]',
    tag: 'Volcanoes',
  },
]

const journalArticles = [
  {
    title: 'Meeting the Agashya Silverback Family',
    date: 'Field Notes • Musanze',
    excerpt:
      'The morning rain cleared just as our naturalist tracker detected fresh bamboo shavings. Ten paces later, the giant matriarch and twin infants emerged.',
  },
  {
    title: 'Night Fishing Melodies on Lake Kivu',
    date: 'Field Notes • Karongi',
    excerpt:
      'As darkness blankets the rift lake, three-boat wooden pirogues set sail with kerosene lamps glowing, singing polyphonic chants passed down across generations.',
  },
  {
    title: 'The Rhino Return to Akagera',
    date: 'Conservation • Eastern Rwanda',
    excerpt:
      'How community anti-poaching canines and African Parks management restored the Big Five to Rwanda’s premier savanna reserve.',
  },
]

function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null)

  return (
    <div className="flex flex-col w-full pb-32">
      {/* =========================================================================
          HERO 8: GALLERY / JOURNAL (MASONRY HERO STRIP WITH LIGHTBOX)
      ========================================================================= */}
      <section className="relative px-6 pt-10 pb-16 max-w-7xl mx-auto w-full">
        {/* Soft mint & sky ambient glow */}
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-mint/20 orb-glow pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full bg-sky/15 orb-glow pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
          <span className="eyebrow text-foreground/50 block mb-2">
            Visual Field Journal
          </span>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-foreground leading-[0.95] tracking-tight">
            Moments in the{' '}
            <span className="bg-gradient-to-r from-foreground via-mint to-foreground bg-clip-text text-transparent">
              Wild
            </span>
          </h1>
          <p className="font-mono text-sm sm:text-base text-foreground/70 mt-4 leading-relaxed">
            Unfiltered captures from our safaris across Rwanda and East Africa. Tap any photo to enter the high-resolution lightbox.
          </p>
        </div>

        {/* Masonry Hero Strip Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 relative z-10">
          {galleryPhotos.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedPhoto(item)}
              className="break-inside-avoid relative rounded-[2rem] overflow-hidden bg-secondary border border-border shadow-soft group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                <span className="font-mono text-[10px] uppercase tracking-widest text-mint flex items-center gap-1.5 mb-1">
                  <MapPin className="h-3 w-3" />
                  {item.location}
                </span>
                <h3 className="font-display text-lg font-bold">
                  {item.title}
                </h3>
              </div>

              {/* Small persistent location pill */}
              <div className="absolute bottom-3 left-3 group-hover:opacity-0 transition-opacity">
                <span className="bg-black/45 backdrop-blur-md border border-white/25 rounded-full px-3 py-1 font-mono text-[10px] text-white">
                  {item.location.split(',')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FIELD JOURNAL STORIES
      ========================================================================= */}
      <section className="py-20 border-t border-foreground/10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="eyebrow text-foreground/50 block mb-2">
              Stories from the Bush
            </span>
            <h2 className="font-display text-3xl font-extrabold text-foreground">
              Guide Field Notes
            </h2>
          </div>
          <Badge variant="mint" withDot>
            Updated Monthly
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalArticles.map((art, i) => (
            <div
              key={i}
              className="rounded-[2rem] border border-border bg-card p-7 shadow-soft flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-mint block mb-3">
                  {art.date}
                </span>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {art.title}
                </h3>
                <p className="font-mono text-xs text-foreground/70 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border flex items-center justify-between font-mono text-xs font-bold text-foreground">
                <span>Read Full Log</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX DIALOG */}
      {selectedPhoto && (
        <Dialog
          open={Boolean(selectedPhoto)}
          onOpenChange={(open) => !open && setSelectedPhoto(null)}
        >
          <DialogContent className="md:max-w-4xl p-0 overflow-hidden bg-black border-none text-white">
            <div className="relative aspect-[16/10] w-full flex items-center justify-center bg-black">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 bg-card text-foreground border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-mint uppercase tracking-widest block mb-1">
                  {selectedPhoto.location}
                </span>
                <h3 className="font-display text-xl font-bold">
                  {selectedPhoto.title}
                </h3>
                <p className="font-mono text-xs text-foreground/70 mt-1">
                  {selectedPhoto.caption}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link to="/tours">
                  <Button size="sm" className="shadow-soft">
                    Plan a Trip Here <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPhoto(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {/* =========================================================================
          JOURNAL CTA
      ========================================================================= */}
      <section className="py-20 border-t border-foreground/10">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-[2.5rem] border border-border bg-card p-10 sm:p-14 text-center shadow-elegant reveal">
            <span className="eyebrow text-foreground/50 block mb-3">Live These Moments</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              The Camera Sees It — You Should Be There
            </h2>
            <p className="font-mono text-sm text-foreground/70 max-w-xl mx-auto mt-4 leading-relaxed">
              Every photo in this journal was taken on a real Sarumba journey. Your turn is one conversation away.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/tours">
                <Button size="lg" className="shadow-soft">
                  Plan Your Safari <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">Ask a Guide</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
