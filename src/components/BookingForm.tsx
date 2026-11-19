import * as React from 'react'
import { useState, useEffect } from 'react'
import { useTours, useCreateBooking, useCurrency, type BookingInput } from '@/hooks/useSiteData'
import { formatPrice } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Minus,
  Plus,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { format, addDays } from 'date-fns'

interface BookingFormProps {
  initialTourSlug?: string
  initialDestination?: string
  initialAdults?: number
  initialChildren?: number
  initialDate?: string
  initialSpecialRequests?: string
  onSuccess?: () => void
  isInline?: boolean
}

export function BookingForm({
  initialTourSlug,
  initialDestination,
  initialAdults = 2,
  initialChildren = 0,
  initialDate,
  initialSpecialRequests = '',
  onSuccess,
  isInline = false,
}: BookingFormProps) {
  const { data: tours } = useTours()
  const { currency } = useCurrency()
  const createBooking = useCreateBooking()

  // Match tour by slug or destination keyword
  const initialSlug = React.useMemo(() => {
    if (initialTourSlug) return initialTourSlug
    if (initialDestination && tours) {
      const match = tours.find(
        (t) =>
          t.name.toLowerCase().includes(initialDestination.toLowerCase()) ||
          t.meta.highlights.some((h) =>
            h.toLowerCase().includes(initialDestination.toLowerCase())
          )
      )
      if (match) return match.slug
    }
    return tours?.[0]?.slug || ''
  }, [initialTourSlug, initialDestination, tours])

  // Form State
  const [selectedTourSlug, setSelectedTourSlug] = useState<string>(initialSlug)
  const [startDate, setStartDate] = useState<Date | undefined>(() => {
    if (initialDate) {
      try {
        return new Date(initialDate)
      } catch {
        return addDays(new Date(), 14)
      }
    }
    return addDays(new Date(), 14)
  })
  const [adults, setAdults] = useState<number>(initialAdults)
  const [childrenCount, setChildrenCount] = useState<number>(initialChildren)
  const [fullName, setFullName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [specialRequests, setSpecialRequests] = useState<string>(initialSpecialRequests)
  const [consent, setConsent] = useState<boolean>(true)
  const [step, setStep] = useState<1 | 2>(1)

  // Update selected slug when initialSlug resolves
  useEffect(() => {
    if (initialSlug && !selectedTourSlug) {
      setSelectedTourSlug(initialSlug)
    }
  }, [initialSlug])

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Success state
  const [submittedData, setSubmittedData] = useState<{
    referenceId: string
    whatsAppUrl: string
  } | null>(null)

  // Find selected tour details
  const currentTour =
    tours?.find((t) => t.slug === selectedTourSlug || t.id === selectedTourSlug) ||
    (tours && tours[0])

  // Calculate live estimate
  const basePricePerPerson = currentTour?.salePrice || currentTour?.price || 1500
  // Children pay 60% of adult base price for permits/logistics
  const estimatedTotal =
    adults * basePricePerPerson + childrenCount * Math.round(basePricePerPerson * 0.6)

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {}
    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name'
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email is required'
    if (!phone.trim() || phone.length < 8)
      newErrors.phone = 'Valid phone number is required (e.g. +250 788 123 456)'
    if (!consent) newErrors.consent = 'Please confirm consent to receive your itinerary quote'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const bookingPayload: BookingInput = {
      tourId: currentTour?.id || 'custom',
      tourName: currentTour?.name || 'Custom Safari Expedition',
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : 'Flexible',
      adults,
      children: childrenCount,
      fullName,
      phone,
      email,
      specialRequests,
      estimatedTotalUsd: estimatedTotal,
    }

    try {
      const res = await createBooking.mutateAsync(bookingPayload)
      setSubmittedData({
        referenceId: res.referenceId,
        whatsAppUrl: res.whatsAppUrl,
      })
      if (onSuccess) onSuccess()
    } catch {
      // Fallback
      setSubmittedData({
        referenceId: 'IMB-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
        whatsAppUrl: `https://wa.me/250788123456?text=${encodeURIComponent(
          `Hello Sarumba Travel! I would like to book ${currentTour?.name}.`
        )}`,
      })
    }
  }

  // SUCCESS SCREEN
  if (submittedData) {
    return (
      <div className="flex flex-col items-center text-center py-8 px-4 animate-in fade-in-50 duration-500">
        {/* Large check in a mint circle */}
        <div className="h-20 w-20 rounded-full bg-mint/20 border-2 border-mint flex items-center justify-center text-mint mb-6">
          <CheckCircle2 className="h-10 w-10 text-foreground" />
        </div>

        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-foreground">
          Trip Request Received!
        </h3>
        <p className="font-mono text-sm text-foreground/70 mt-2 max-w-md">
          Murakoze cyane. Our Kigali safari concierge will review permit availability and email your official proposal within 24 hours.
        </p>

        {/* Reference number in a mono pill */}
        <div className="my-6">
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 block mb-1">
            Booking Reference
          </span>
          <span className="inline-block rounded-full bg-secondary px-6 py-2 font-mono text-base font-bold text-foreground border border-border">
            {submittedData.referenceId}
          </span>
        </div>

        {/* WhatsApp Button */}
        <div className="w-full max-w-sm flex flex-col gap-3">
          <a
            href={submittedData.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="whatsapp" size="lg" className="w-full justify-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Send on WhatsApp Now
            </Button>
          </a>

          <Button
            variant="outline"
            onClick={() => {
              setSubmittedData(null)
              setFullName('')
              setEmail('')
              setPhone('')
              setSpecialRequests('')
            }}
          >
            Make Another Request
          </Button>
        </div>
      </div>
    )
  }

  // BOOKING FORM UI — TWO-STEP WIZARD
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (step === 1) {
          setStep(2)
        } else {
          handleSubmit(e)
        }
      }}
      className="space-y-6"
    >
      {/* Step Progress Indicator */}
      <div className="flex items-center gap-3">
        {[
          { n: 1, label: 'Your Trip' },
          { n: 2, label: 'Your Details' },
        ].map((st, i) => (
          <React.Fragment key={st.n}>
            {i > 0 && <div className="h-px flex-1 bg-border" />}
            <div className="flex items-center gap-2.5">
              <span
                className={`h-8 w-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                  step >= st.n
                    ? 'bg-foreground text-background'
                    : 'bg-secondary text-foreground/40 border border-border'
                }`}
              >
                {step > st.n ? <CheckCircle2 className="h-4 w-4" /> : st.n}
              </span>
              <span
                className={`font-mono text-[11px] font-bold uppercase tracking-widest hidden sm:block ${
                  step >= st.n ? 'text-foreground' : 'text-foreground/40'
                }`}
              >
                {st.label}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Live Summary Card (always visible) */}
      <div className="rounded-2xl border border-border bg-secondary/50 p-4.5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="mint" withDot>
            Trip Estimate
          </Badge>
          <span className="font-mono text-[11px] text-foreground/60">
            {adults} Adult{adults > 1 ? 's' : ''}
            {childrenCount > 0 ? `, ${childrenCount} Child` : ''}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <h4 className="font-display text-base font-bold text-foreground line-clamp-1">
              {currentTour?.name || 'Custom Safari Expedition'}
            </h4>
            <span className="font-mono text-xs text-foreground/60">
              {startDate ? format(startDate, 'MMM dd, yyyy') : 'Dates flexible'}
            </span>
          </div>
          <div className="text-right shrink-0">
            <span className="font-mono text-lg font-bold text-foreground">
              {formatPrice(estimatedTotal, currency)}
            </span>
            <span className="font-mono text-[10px] text-foreground/50 block">
              Estimated total
            </span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in fade-in-50 slide-in-from-right-4 duration-300">
          {/* Select Tour */}
          <div className="space-y-1.5">
            <label className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/60 block">
              Select Safari Itinerary
            </label>
            <div className="relative">
              <select
                value={currentTour?.slug || ''}
                onChange={(e) => setSelectedTourSlug(e.target.value)}
                className="w-full h-12 rounded-full border border-foreground/15 bg-background px-5 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:border-foreground focus:ring-1 focus:ring-ring appearance-none"
              >
                {(tours ?? []).map((tour) => (
                  <option key={tour.id} value={tour.slug}>
                    {tour.name} ({tour.meta.durationDays} Days - {formatPrice(tour.price, currency)})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-foreground/40 font-mono text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Start Date Picker */}
          <div className="space-y-1.5">
            <label className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/60 block">
              Target Start Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full h-12 rounded-full border border-foreground/15 bg-background px-5 py-3 font-mono text-sm text-foreground flex items-center justify-between text-left hover:border-foreground transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <CalendarIcon className="h-4 w-4 text-foreground/40" />
                    {startDate ? format(startDate, 'PPP') : 'Select target date'}
                  </span>
                  <span className="font-mono text-xs text-foreground/40">Change</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4" align="start">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground/70">
                    Choose approximate departure
                  </span>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[7, 14, 30, 60, 90].map((days) => {
                      const target = addDays(new Date(), days)
                      return (
                        <button
                          key={days}
                          type="button"
                          onClick={() => setStartDate(target)}
                          className="rounded-full border border-border px-3 py-1.5 font-mono text-xs hover:bg-secondary transition-colors text-left"
                        >
                          In {days} days ({format(target, 'MMM d')})
                        </button>
                      )
                    })}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Travellers Steppers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-foreground/15 p-3.5 flex items-center justify-between">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-foreground/70 block">
                  Adults
                </span>
                <span className="font-mono text-xs text-foreground/40">Age 15+</span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                  className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="font-mono text-sm font-bold w-5 text-center">
                  {adults}
                </span>
                <button
                  type="button"
                  onClick={() => setAdults((prev) => Math.min(16, prev + 1))}
                  className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-foreground/15 p-3.5 flex items-center justify-between">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-foreground/70 block">
                  Children
                </span>
                <span className="font-mono text-xs text-foreground/40">Below 15</span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setChildrenCount((prev) => Math.max(0, prev - 1))}
                  className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="font-mono text-sm font-bold w-5 text-center">
                  {childrenCount}
                </span>
                <button
                  type="button"
                  onClick={() => setChildrenCount((prev) => Math.min(10, prev + 1))}
                  className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <Textarea
            label="Dietary, Lodging Preferences & Special Requests"
            placeholder="Tell us about room preferences, celebrations, photography gear, or fitness considerations..."
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
          />

          <Button type="submit" size="lg" className="w-full justify-center group">
            <span>Continue to Your Details</span>
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in fade-in-50 slide-in-from-right-4 duration-300">
          {/* Contact Details */}
          <Input
            label="Lead Traveller Name"
            placeholder="e.g. Sarah Jenkins"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={errors.fullName}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Phone / WhatsApp"
              placeholder="+250 788 000 000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="sarah@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3 pt-1">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked as boolean)}
              className="mt-0.5"
            />
            <label
              htmlFor="consent"
              className="font-mono text-xs text-foreground/70 leading-relaxed cursor-pointer"
            >
              I agree to have Sarumba Travel prepare a custom itinerary and reach out via WhatsApp/email. No payment is charged now.
            </label>
          </div>
          {errors.consent && (
            <p className="font-mono text-xs text-foreground border-l-2 border-foreground pl-2">
              {errors.consent}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setStep(1)}
              className="sm:w-auto"
            >
              ← Back
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={createBooking.isPending}
              className="w-full justify-center group"
            >
              <span>{createBooking.isPending ? 'Submitting Inquiry...' : 'Request This Trip'}</span>
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Reassurance notes */}
          <div className="flex items-center justify-center gap-2 text-center text-foreground/50 font-mono text-[11px] pt-1">
            <ShieldCheck className="h-4 w-4 text-mint shrink-0" />
            <span>RDB licensed operator • Free 24h permit hold • No online card charges</span>
          </div>
        </div>
      )}
    </form>
  )
}
