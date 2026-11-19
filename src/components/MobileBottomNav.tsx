import * as React from 'react'
import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import {
  Home,
  Map,
  Compass,
  Menu,
  X,
  MessageCircle,
  CalendarCheck,
  ArrowRight,
} from 'lucide-react'
import { useBookingModal } from '@/hooks/useBookingModal'
import { useSiteData } from '@/hooks/useSiteData'

const MAIN_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Tours', href: '/tours', icon: Map },
  { label: 'Destinations', href: '/destinations', icon: Compass },
]

const MORE_LINKS = [
  { label: 'Experiences', href: '/experiences', desc: 'Beyond the game drive' },
  { label: 'About Us', href: '/about', desc: 'Our story & pillars' },
  { label: 'Journal', href: '/gallery', desc: 'Photo stories' },
  { label: 'Contact', href: '/contact', desc: 'Talk to the team' },
]

export function MobileBottomNav() {
  const [moreOpen, setMoreOpen] = useState(false)
  const { openBooking } = useBookingModal()
  const { data: siteConfig } = useSiteData()
  const path = useRouterState({ select: (s) => s.location.pathname })
  const whatsappNumber = siteConfig?.settings.whatsappNumber || '250788123456'

  const isActive = (href: string) =>
    href === '/' ? path === '/' : path.startsWith(href)

  return (
    <>
      {/* Bottom navigation bar — mobile only */}
      <nav
        aria-label="Mobile navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-border/60 pb-[env(safe-area-inset-bottom)]"
      >
        <div className="grid grid-cols-4 h-16">
          {MAIN_ITEMS.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  active ? 'text-primary' : 'text-foreground/50'
                }`}
              >
                <item.icon className={`h-5 w-5 ${active ? 'stroke-[2.5]' : ''}`} />
                <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${active ? '' : 'opacity-70'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              moreOpen ? 'text-primary' : 'text-foreground/50'
            }`}
          >
            {moreOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider opacity-70">
              More
            </span>
          </button>
        </div>
      </nav>

      {/* More sheet — slides up from bottom */}
      {moreOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-foreground/45 backdrop-blur-sm animate-in fade-in-0 duration-200"
            onClick={() => setMoreOpen(false)}
          />
          <div className="absolute bottom-0 inset-x-0 bg-card border-t border-border rounded-t-3xl p-6 pb-8 space-y-4 animate-in slide-in-from-bottom duration-300 max-h-[75dvh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-foreground/50">Explore</span>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {MORE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center justify-between rounded-2xl border border-border bg-secondary/40 px-5 py-4 hover:bg-secondary transition-colors group"
                >
                  <div>
                    <span className="font-display text-base font-extrabold text-foreground block">
                      {link.label}
                    </span>
                    <span className="font-mono text-[11px] text-foreground/55">{link.desc}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMoreOpen(false)
                  openBooking()
                }}
                className="flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground h-12 font-mono text-xs font-bold uppercase tracking-widest shadow-soft"
              >
                <CalendarCheck className="h-4 w-4" />
                Plan My Trip
              </button>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  'Hello Sarumba Travel! I would like to plan a trip.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-whatsapp text-white h-12 font-mono text-xs font-bold uppercase tracking-widest"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
