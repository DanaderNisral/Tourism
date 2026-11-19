import * as React from 'react'
import { useState, useEffect } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { useSiteData, useCurrency } from '@/hooks/useSiteData'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Menu,
  X,
  Compass,
  Phone,
  MessageCircle,
  Moon,
  Sun,
  Search,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

interface NavbarProps {
  onOpenBooking: () => void
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const { data: siteConfig } = useSiteData()
  const { currency, toggleCurrency } = useCurrency()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const router = useRouterState()
  const currentPath = router.location.pathname

  // Dark mode toggle
  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  // Scroll listener for sticky transparent -> glass transition at 12px
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [currentPath])

  const settings = siteConfig?.settings

  const navLinks = [
    { label: 'Tours', href: '/tours' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Journal', href: '/gallery' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar (mono 11px, subtle glow animation, controlled by data) */}
      {settings?.announcement?.enabled && (
        <div className="relative z-50 bg-foreground text-background py-2 px-4 text-center font-mono text-[11px] overflow-hidden flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse shrink-0" />
          <span className="tracking-wide">{settings.announcement.text}</span>
          {settings.announcement.linkText && (
            <Link
              to="/tours"
              className="underline font-bold hover:text-mint transition-colors ml-1 hidden sm:inline"
            >
              {settings.announcement.linkText} →
            </Link>
          )}
        </div>
      )}

      {/* Main Nav Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-glass py-2.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className={`mx-auto max-w-7xl px-6 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'max-w-6xl rounded-full border border-border/60 bg-card/70 backdrop-blur-xl px-5 py-1.5 shadow-soft' : ''}`}>
          {/* Logo / Brand Wordmark */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <img
              src="/logo.png"
              alt="Sarumba Travel logo"
              className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display text-lg font-extrabold tracking-tight text-foreground leading-none">
                SARUMBA
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50 leading-none mt-1">
                TRAVEL
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (mono, 13px) */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-mono text-[13px] tracking-wide transition-all duration-200 rounded-full px-3.5 py-1.5 ${
                    isActive
                      ? 'text-primary font-bold bg-primary/10'
                      : 'text-foreground/60 hover:text-foreground hover:bg-secondary/70'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-mint rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Action Icons & Primary Button */}
          <div className="flex items-center gap-2.5">
            {/* Currency Switcher */}
            <button
              onClick={toggleCurrency}
              title={`Switch currency (Current: ${currency})`}
              className="h-10 px-3 rounded-full border border-border bg-background/50 hover:bg-secondary font-mono text-xs font-bold text-foreground transition-colors hidden sm:flex items-center justify-center"
            >
              {currency}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              title="Toggle theme"
              className="h-10 w-10 rounded-full border border-border bg-background/50 hover:bg-secondary text-foreground flex items-center justify-center transition-colors"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Primary Action Button: "Plan my trip" */}
            <Button
              onClick={onOpenBooking}
              size="default"
              className="hidden md:inline-flex group shadow-soft"
            >
              <span>Plan my trip</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-10 w-10 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Height Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[90px] z-50 bg-background/95 backdrop-blur-xl flex flex-col justify-between p-6 animate-in slide-in-from-top-4 duration-300 overflow-y-auto">
          <div className="flex flex-col space-y-4 pt-4">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-foreground/40">
              Navigation
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-display text-3xl font-extrabold text-foreground hover:text-mint transition-colors py-1 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-foreground/40">→</span>
              </Link>
            ))}

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={toggleCurrency}
                className="rounded-full border border-border px-4 py-2 font-mono text-xs font-bold text-foreground"
              >
                Currency: {currency}
              </button>
            </div>
          </div>

          {/* Bottom mobile bar: Contact & WhatsApp */}
          <div className="pt-8 border-t border-border flex flex-col gap-3">
            <Button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenBooking()
              }}
              size="lg"
              className="w-full justify-center"
            >
              Plan my trip
            </Button>

            <a
              href="https://wa.me/250788123456"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                variant="whatsapp"
                size="lg"
                className="w-full justify-center"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp Safari Team
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
