import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useSiteData } from '@/hooks/useSiteData'
import { useBookingModal } from '@/hooks/useBookingModal'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  const { data: siteConfig } = useSiteData()
  const { openBooking } = useBookingModal()
  const settings = siteConfig?.settings

  return (
    <div className="flex flex-col w-full pb-32">
      {/* =========================================================================
          HERO 7: CONTACT (CALM LIGHT HERO)
          3 glass contact cards (WhatsApp, phone, email), opening hours, map link, and enquiry form
      ========================================================================= */}
      <section className="relative px-6 pt-10 pb-16 max-w-7xl mx-auto w-full">
        {/* Ambient mint & sky glow orbs */}
        <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-mint/20 orb-glow pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full bg-sky/15 orb-glow pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
          <span className="eyebrow text-foreground/50 block mb-2">
            Get in Touch
          </span>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-foreground leading-[0.95] tracking-tight">
            Start Your{' '}
            <span className="bg-gradient-to-r from-foreground via-mint to-foreground bg-clip-text text-transparent">
              Conversation
            </span>
          </h1>
          <p className="font-mono text-sm sm:text-base text-foreground/70 mt-6 leading-relaxed">
            Whether you want a private silverback gorilla trek or an 8-day East African savanna migration, our Kigali team is ready to assist.
          </p>
        </div>

        {/* 3 Glass Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-16">
          {/* Card 1: WhatsApp */}
          <a
            href={`https://wa.me/${settings?.whatsappNumber || '250788123456'}?text=${encodeURIComponent(
              'Hello Sarumba Travel! I would like to inquire about a private trip.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-[2rem] p-7 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-glass border border-foreground/10 group focus:outline-none"
          >
            <div>
              <div className="h-12 w-12 rounded-full bg-whatsapp/20 text-whatsapp flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <MessageCircle className="h-6 w-6" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 block mb-1">
                Fastest Response
              </span>
              <h2 className="font-display text-xl font-extrabold text-foreground mb-2">
                WhatsApp Concierge
              </h2>
              <p className="font-mono text-xs text-foreground/70 leading-relaxed">
                Connect directly with a licensed naturalist tracker for real-time permit checks and answers.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-border font-mono text-xs font-bold text-foreground flex items-center justify-between">
              <span>{settings?.phone || '+250 788 123 456'}</span>
              <span className="text-whatsapp">Chat →</span>
            </div>
          </a>

          {/* Card 2: Phone */}
          <a
            href={`tel:${settings?.phone || '+250788123456'}`}
            className="glass rounded-[2rem] p-7 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-glass border border-foreground/10 group focus:outline-none"
          >
            <div>
              <div className="h-12 w-12 rounded-full bg-mint/20 text-foreground flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <Phone className="h-6 w-6 text-foreground" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 block mb-1">
                Direct Line
              </span>
              <h2 className="font-display text-xl font-extrabold text-foreground mb-2">
                Telephone Call
              </h2>
              <p className="font-mono text-xs text-foreground/70 leading-relaxed">
                Speak directly with our operations desk in Kigali for bespoke group logistics and lodge bookings.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-border font-mono text-xs font-bold text-foreground flex items-center justify-between">
              <span>{settings?.phone || '+250 788 123 456'}</span>
              <span className="text-mint">Call →</span>
            </div>
          </a>

          {/* Card 3: Email */}
          <a
            href={`mailto:${settings?.email || 'hello@sarumba.rw'}`}
            className="glass rounded-[2rem] p-7 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-glass border border-foreground/10 group focus:outline-none"
          >
            <div>
              <div className="h-12 w-12 rounded-full bg-sky/20 text-foreground flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <Mail className="h-6 w-6 text-foreground" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 block mb-1">
                Written Proposal
              </span>
              <h2 className="font-display text-xl font-extrabold text-foreground mb-2">
                Email Inquiry
              </h2>
              <p className="font-mono text-xs text-foreground/70 leading-relaxed">
                Send flight dates, bespoke passenger lists, or agent B2B partnership requests.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-border font-mono text-xs font-bold text-foreground flex items-center justify-between">
              <span>{settings?.email || 'hello@sarumba.rw'}</span>
              <span className="text-sky">Email →</span>
            </div>
          </a>
        </div>

        {/* Office Hours & Kigali Map Bar */}
        <div className="rounded-[2rem] border border-border bg-card p-6 sm:p-8 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5 text-mint" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 block">
                Office Location
              </span>
              <span className="font-mono text-xs font-bold text-foreground">
                {settings?.address || 'KG 7 Ave, Kimihurura, Kigali, Rwanda'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5 text-sky" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 block">
                Business Hours
              </span>
              <span className="font-mono text-xs font-bold text-foreground">
                {settings?.hours || 'Mon – Sat: 08:00 – 19:00 (CAT)'}
              </span>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Kigali+Rwanda"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-mono text-xs font-semibold hover:bg-secondary transition-colors"
          >
            <span>Open in Maps</span>
            <ExternalLink className="h-3.5 w-3.5 text-foreground/60" />
          </a>
        </div>

        {/* COMPACT TRIP REQUEST CARD — opens the booking dialog */}
        <div className="max-w-3xl mx-auto rounded-[2.5rem] border border-border bg-card p-8 sm:p-12 shadow-elegant text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-mint/10 orb-glow pointer-events-none" />
          <div className="relative z-10">
            <Badge variant="mint" withDot className="mb-3">
              Trip Request
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              Ready to Plan Your Trip?
            </h2>
            <p className="font-mono text-sm text-foreground/65 mt-3 max-w-md mx-auto leading-relaxed">
              Our guided booking takes under a minute — pick your safari or hotel, dates, and travellers, and we will confirm permits within 24 hours.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="shadow-soft" onClick={() => openBooking()}>
                <span>Start Trip Request</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <a
                href={`https://wa.me/${settings?.whatsappNumber || '250788123456'}?text=${encodeURIComponent(
                  'Hello Sarumba Travel! I would like to plan a trip.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="lg">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* =========================================================================
          WHAT HAPPENS NEXT (3 STEPS)
      ========================================================================= */}
      <section className="py-20 border-t border-foreground/10 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal">
            <span className="eyebrow text-foreground/50 block mb-2">After You Write</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground leading-[0.95]">
              What Happens Next
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'We Read Every Message',
                desc: 'A senior planner — not a bot — reviews your dates, group size, and dream list within a few hours during business days.',
              },
              {
                step: '02',
                title: 'Tailored Proposal in 24h',
                desc: 'You receive a day-by-day itinerary with lodge options, park fees, and a transparent all-in quote. No obligation.',
              },
              {
                step: '03',
                title: 'We Handle the Rest',
                desc: 'Permits, lodges, transfers, and guides are secured for you. You simply pack and arrive in Kigali.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-[2rem] border border-border bg-card p-8 shadow-soft reveal">
                <span className="font-mono text-3xl font-extrabold text-mint/80 block mb-4">{item.step}</span>
                <h3 className="font-display text-lg font-extrabold text-foreground mb-2">{item.title}</h3>
                <p className="font-mono text-xs text-foreground/65 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
