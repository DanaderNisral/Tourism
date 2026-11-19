import * as React from 'react'
import { Sparkles, Compass, Footprints, Trees, Mountain } from 'lucide-react'

interface MarqueeStripProps {
  items?: string[]
  className?: string
}

export function MarqueeStrip({
  items = [
    'VOLCANOES MOUNTAIN GORILLAS',
    'AKAGERA BIG FIVE SAFARI',
    'NYUNGWE CANOPY SUSPENSION',
    'LAKE KIVU SUNSET KAYAK',
    'CONSERVATION LED EXPEDITIONS',
    'NATIVE NATURALIST TRACKERS',
    'TAILORED PRIVATE 4X4 CRUISERS',
  ],
  className = '',
}: MarqueeStripProps) {
  // Duplicate list to achieve continuous infinite marquee loop
  const duplicatedItems = [...items, ...items, ...items]

  return (
    <div
      className={`w-full overflow-hidden border-y border-foreground/10 bg-secondary/30 py-3 select-none ${className}`}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee space-x-8 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/60">
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-6">
            <span>{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          </div>
        ))}
      </div>
    </div>
  )
}
