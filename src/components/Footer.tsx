import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { useSiteData } from '@/hooks/useSiteData'
import { Instagram, Twitter, Facebook, Compass, MapPin, Clock, Mail, Phone } from 'lucide-react'

export function Footer() {
  const { data: siteConfig } = useSiteData()
  const settings = siteConfig?.settings

  return (
    <footer className="w-full bg-foreground text-background relative overflow-hidden pt-20 pb-12">
      {/* Subtle Slow Spinning Ring Border or Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-background/5 animate-spin-slow pointer-events-none" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-mint/10 orb-glow pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Responsive Brand Header in Footer */}
        <div className="w-full text-center py-8 overflow-hidden">
          <h2 className="font-display font-black uppercase tracking-tight text-background leading-none whitespace-nowrap text-[clamp(1.9rem,8vw,5.5rem)]">
            SARUMBA&nbsp;<span className="text-mint">TRAVEL</span>
          </h2>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-mint mt-3 block">
            Rwanda & East Africa Luxury Expeditions
          </span>
        </div>

        {/* 1px divider */}
        <div className="h-[1px] w-full bg-background/15 my-8" />

        {/* Middle Section: Centered Inverted Logo & Tagline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start pb-12">
          {/* Column 1: Address & Hours */}
          <div className="space-y-3 font-mono text-xs text-background/70">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-background/40 block mb-2">
              Kigali Headquarters
            </span>
            <p className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-mint shrink-0 mt-0.5" />
              <span>{settings?.address || 'KG 7 Ave, Kimihurura, Kigali, Rwanda'}</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-sky shrink-0" />
              <span>{settings?.hours || 'Mon – Sat: 08:00 – 19:00 (CAT)'}</span>
            </p>
          </div>

          {/* Column 2: Centered Inverted Logo & Tagline */}
          <div className="flex flex-col items-center text-center space-y-4">
            <img
              src="/logo.png"
              alt="Sarumba Travel logo"
              className="h-14 w-14 object-contain"
            />
            <p className="font-mono text-sm tracking-wide text-background/80 font-medium">
              "{settings?.tagline || 'Wander with purpose.'}"
            </p>
            <p className="font-mono text-xs text-background/50 max-w-xs">
              Direct Rwanda Development Board licensed tour operator empowering communities and conserving mountain wildlife.
            </p>
          </div>

          {/* Column 3: Contact & Direct Inquiries */}
          <div className="space-y-3 font-mono text-xs text-background/70 md:text-right">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-background/40 block mb-2">
              Direct Inquiries
            </span>
            <p className="flex items-center gap-2 md:justify-end">
              <Phone className="h-4 w-4 text-mint shrink-0" />
              <a
                href={`tel:${settings?.phone || '+250788123456'}`}
                className="hover:text-background transition-colors"
              >
                {settings?.phone || '+250 788 123 456'}
              </a>
            </p>
            <p className="flex items-center gap-2 md:justify-end">
              <Mail className="h-4 w-4 text-sky shrink-0" />
              <a
                href={`mailto:${settings?.email || 'hello@sarumba.rw'}`}
                className="hover:text-background transition-colors"
              >
                {settings?.email || 'hello@sarumba.rw'}
              </a>
            </p>
          </div>
        </div>

        {/* Row of Round Social Icon Buttons */}
        <div className="flex items-center justify-center gap-3 pt-6 pb-10">
          <a
            href={settings?.socials.instagram || 'https://instagram.com'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="h-10 w-10 rounded-full border border-background/20 flex items-center justify-center text-background/80 hover:bg-background hover:text-foreground transition-all duration-200"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href={settings?.socials.twitter || 'https://twitter.com'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="h-10 w-10 rounded-full border border-background/20 flex items-center justify-center text-background/80 hover:bg-background hover:text-foreground transition-all duration-200"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a
            href={settings?.socials.facebook || 'https://facebook.com'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="h-10 w-10 rounded-full border border-background/20 flex items-center justify-center text-background/80 hover:bg-background hover:text-foreground transition-all duration-200"
          >
            <Facebook className="h-4 w-4" />
          </a>
        </div>

        {/* Bottom Small Links & Copyright */}
        <div className="pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-background/50">
          <div className="flex flex-wrap items-center gap-5 justify-center">
            <Link to="/tours" className="hover:text-background transition-colors">
              Tours
            </Link>
            <Link to="/destinations" className="hover:text-background transition-colors">
              Destinations
            </Link>
            <Link to="/experiences" className="hover:text-background transition-colors">
              Experiences
            </Link>
            <Link to="/about" className="hover:text-background transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-background transition-colors">
              Contact
            </Link>
            <Link to="/gallery" className="hover:text-background transition-colors">
              Journal
            </Link>
          </div>

          <div className="text-center sm:text-right">
            © {new Date().getFullYear()} Sarumba Travel Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
