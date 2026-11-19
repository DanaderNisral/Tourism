import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  MapPin,
  Calendar,
  Users,
  Compass,
  ArrowRight,
  Check,
  ChevronDown,
  Sparkles,
  Minus,
  Plus,
  TreePine,
  Footprints,
  Sailboat,
  Globe2,
  Hotel,
} from 'lucide-react'
import { addDays, format } from 'date-fns'

interface TourismHeroWidgetProps {
  onBookNow: (details: {
    category: string
    destination: string
    tripType: string
    tier: string
    date: string
    adults: number
    children: number
  }) => void
}

const tourismTabs = [
  { id: 'all', label: 'All Tours', icon: Globe2 },
  { id: 'gorilla', label: 'Gorilla Trekking', icon: Footprints },
  { id: 'safari', label: 'Big Five Safari', icon: Compass },
  { id: 'hiking', label: 'Canopy & Hiking', icon: TreePine },
  { id: 'lakes', label: 'Lake Kivu', icon: Sailboat },
  { id: 'hotels', label: 'Book Hotel', icon: Hotel },
]

const destinationOptions = [
  {
    name: 'Volcanoes National Park',
    region: 'Northern Rwanda • Virungas',
    tag: 'Mountain Gorillas',
    category: 'gorilla',
  },
  {
    name: 'Akagera National Park',
    region: 'Eastern Rwanda • Savanna',
    tag: 'Big Five & Lake Ihema',
    category: 'safari',
  },
  {
    name: 'Nyungwe National Park',
    region: 'Southern Rwanda • Rainforest',
    tag: 'Canopy & Chimpanzees',
    category: 'hiking',
  },
  {
    name: 'Lake Kivu Riviera',
    region: 'Western Rwanda • Rift Valley',
    tag: 'Coffee Trail & Kayaking',
    category: 'lakes',
  },
  {
    name: 'Serengeti & Maasai Mara',
    region: 'East Africa Ecosystem',
    tag: 'Great Migration',
    category: 'safari',
  },
  {
    name: 'Bisate Lodge — Volcanoes',
    region: 'Musanze • Virunga Foothills',
    tag: 'Gorilla-side Luxury Villa',
    category: 'hotels',
  },
  {
    name: 'Lake Kivu Serena Village',
    region: 'Rubavu • Lake Shore',
    tag: 'Lakeside Resort & Spa',
    category: 'hotels',
  },
  {
    name: 'Nyungwe Forest Lodge',
    region: 'Gisakura • Rainforest Edge',
    tag: 'Canopy View Eco-Lodge',
    category: 'hotels',
  },
  {
    name: 'Kigali Marriott Hotel',
    region: 'KG 7 Ave • City Centre',
    tag: 'Business & City Stay',
    category: 'hotels',
  },
]

export function TourismHeroWidget({ onBookNow }: TourismHeroWidgetProps) {
  const [activeTab, setActiveTab] = useState('gorilla')
  const [tripType, setTripType] = useState<'private' | 'group' | 'custom'>('private')
  const [lodgeTier, setLodgeTier] = useState('Luxury Eco-Lodge')

  // Inputs
  const [destination, setDestination] = useState('Volcanoes National Park')
  const [destinationQuery, setDestinationQuery] = useState('')
  const [destDropdownOpen, setDestDropdownOpen] = useState(false)

  // Dates
  const [startDate, setStartDate] = useState<Date>(addDays(new Date(), 21))
  const [nights, setNights] = useState(3)
  const [datesDropdownOpen, setDatesDropdownOpen] = useState(false)

  // Travellers
  const [adults, setAdults] = useState(2)
  const [childrenCount, setChildrenCount] = useState(0)
  const [guestsDropdownOpen, setGuestsDropdownOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDestDropdownOpen(false)
        setDatesDropdownOpen(false)
        setGuestsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter destinations based on query
  const filteredDestinations = destinationOptions.filter((d) =>
    d.name.toLowerCase().includes(destinationQuery.toLowerCase()) ||
    d.region.toLowerCase().includes(destinationQuery.toLowerCase()) ||
    d.tag.toLowerCase().includes(destinationQuery.toLowerCase())
  )

  const handleBookNowClick = () => {
    onBookNow({
      category: activeTab,
      destination,
      tripType,
      tier: lodgeTier,
      date: format(startDate, 'yyyy-MM-dd'),
      adults,
      children: childrenCount,
    })
  }

  return (
    <div className="w-full max-w-5xl mx-auto relative z-30" ref={dropdownRef}>
      {/* 1. TOP FLOATING TABS (Gorilla Trekking, Big Five, Canopy, Lake Kivu, All) */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 mb-0 px-2 select-none">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-t-[1.75rem] bg-background/90 backdrop-blur-xl border-t border-x border-foreground/15 shadow-sm">
          {tourismTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id)
                  // auto-select destination if relevant
                  const matched = destinationOptions.find((d) => d.category === tab.id)
                  if (matched) setDestination(matched.name)
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-foreground text-background shadow-soft ring-1 ring-ring'
                    : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-mint' : 'text-foreground/50'}`} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. MAIN WHITE / GLASS HERO BOOKING CARD */}
      <div className="rounded-[2.25rem] sm:rounded-[2.5rem] bg-card/95 backdrop-blur-2xl border border-border p-5 sm:p-7 shadow-elegant text-foreground relative">
        {/* Sub-options Bar (Trip Type Radios & Accommodation Tier Dropdown) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-border/80 text-xs font-mono">
          {/* Trip Type Radios */}
          <div className="flex flex-wrap items-center gap-5">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-foreground">
              <input
                type="radio"
                name="tripType"
                checked={tripType === 'private'}
                onChange={() => setTripType('private')}
                className="accent-foreground h-4 w-4"
              />
              <span>Private Guided</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-foreground/75 hover:text-foreground">
              <input
                type="radio"
                name="tripType"
                checked={tripType === 'group'}
                onChange={() => setTripType('group')}
                className="accent-foreground h-4 w-4"
              />
              <span>Small Group</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-foreground/75 hover:text-foreground">
              <input
                type="radio"
                name="tripType"
                checked={tripType === 'custom'}
                onChange={() => setTripType('custom')}
                className="accent-foreground h-4 w-4"
              />
              <span>Custom Tailored</span>
            </label>
          </div>

          {/* Accommodation Tier Dropdown */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-foreground/50 uppercase tracking-widest text-[10px]">Tier:</span>
            <select
              value={lodgeTier}
              onChange={(e) => setLodgeTier(e.target.value)}
              className="bg-secondary rounded-full px-3.5 py-1.5 font-mono text-xs font-bold text-foreground border border-border focus:outline-none cursor-pointer"
            >
              <option value="Luxury Eco-Lodge">Luxury Eco-Lodge</option>
              <option value="Boutique Wilderness Camp">Boutique Wilderness Camp</option>
              <option value="Mid-Range Heritage Lodge">Mid-Range Heritage Lodge</option>
            </select>
          </div>
        </div>

        {/* 3. MAIN CONNECTED INPUT ROW (Segmented Bar) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-2 items-center bg-secondary/50 p-2 rounded-[2rem] border border-border/80">
          {/* SEGMENT 1: DESTINATION / NATIONAL PARK (md:col-span-4) */}
          <div className="md:col-span-4 relative">
            <button
              type="button"
              onClick={() => {
                setDestDropdownOpen(!destDropdownOpen)
                setDatesDropdownOpen(false)
                setGuestsDropdownOpen(false)
              }}
              className="w-full text-left bg-background rounded-full px-5 py-3 border border-border hover:border-foreground/40 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-mint" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 leading-tight">
                    Destination / Park
                  </span>
                  <span className="font-mono text-sm font-bold text-foreground truncate mt-0.5">
                    {destination}
                  </span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-foreground/40 group-hover:text-foreground shrink-0 ml-2" />
            </button>

            {/* Rich Destination Autocomplete Dropdown (styled like the screenshot's Vancouver/Bangkok popup) */}
            {destDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-full sm:w-[360px] bg-background rounded-[1.75rem] border border-border shadow-elegant p-3 z-50 animate-in fade-in-50 zoom-in-95 duration-200">
                <div className="px-3 py-2 border-b border-border/60 mb-2">
                  <input
                    type="text"
                    placeholder="Search national park or region..."
                    value={destinationQuery}
                    onChange={(e) => setDestinationQuery(e.target.value)}
                    className="w-full font-mono text-xs bg-secondary rounded-full px-3 py-2 text-foreground focus:outline-none"
                    autoFocus
                  />
                </div>

                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {filteredDestinations.map((opt) => (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => {
                        setDestination(opt.name)
                        setDestDropdownOpen(false)
                        setDestinationQuery('')
                      }}
                      className={`w-full text-left p-2.5 rounded-2xl flex items-start gap-3 transition-colors hover:bg-secondary ${
                        destination === opt.name ? 'bg-secondary/70 border border-border' : ''
                      }`}
                    >
                      <div className="h-8 w-8 rounded-full bg-mint/20 text-foreground flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="h-4 w-4 text-foreground" />
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="font-display text-xs font-bold text-foreground leading-tight">
                          {opt.name}
                        </span>
                        <span className="font-mono text-[10px] text-foreground/50 mt-0.5">
                          {opt.region}
                        </span>
                        <span className="font-mono text-[9px] text-mint uppercase tracking-wider font-semibold mt-0.5">
                          {opt.tag}
                        </span>
                      </div>
                      {destination === opt.name && (
                        <Check className="h-4 w-4 text-mint shrink-0 self-center" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SEGMENT 2: TRAVEL DATES & DURATION (md:col-span-3) */}
          <div className="md:col-span-3 relative">
            <button
              type="button"
              onClick={() => {
                setDatesDropdownOpen(!datesDropdownOpen)
                setDestDropdownOpen(false)
                setGuestsDropdownOpen(false)
              }}
              className="w-full text-left bg-background rounded-full px-5 py-3 border border-border hover:border-foreground/40 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Calendar className="h-4 w-4 text-sky" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 leading-tight">
                    Departure Date
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="font-mono text-xs font-bold text-foreground">
                      {format(startDate, 'MMM d, yyyy')}
                    </span>
                    <span className="font-mono text-[10px] text-foreground/50">
                      ({nights}d)
                    </span>
                  </div>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-foreground/40 group-hover:text-foreground shrink-0 ml-1" />
            </button>

            {/* Dates Popover */}
            {datesDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-full sm:w-[320px] bg-background rounded-[1.75rem] border border-border shadow-elegant p-4 z-50 animate-in fade-in-50 zoom-in-95 duration-200">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-foreground/60 block mb-3">
                  Select Approximate Dates
                </span>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[14, 21, 30, 60, 90].map((d) => {
                    const target = addDays(new Date(), d)
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setStartDate(target)
                        }}
                        className={`rounded-xl border p-2 text-left font-mono text-xs transition-colors ${
                          format(startDate, 'yyyy-MM-dd') === format(target, 'yyyy-MM-dd')
                            ? 'border-foreground bg-secondary font-bold'
                            : 'border-border hover:bg-secondary'
                        }`}
                      >
                        In {d} days
                        <span className="block text-[10px] text-foreground/50">
                          {format(target, 'MMM d, yyyy')}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <span className="font-mono text-xs text-foreground/60">Safari Duration:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setNights(Math.max(1, nights - 1))}
                      className="h-6 w-6 rounded-full border border-border flex items-center justify-center font-bold hover:bg-secondary"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs font-bold">{nights} Days</span>
                    <button
                      type="button"
                      onClick={() => setNights(Math.min(14, nights + 1))}
                      className="h-6 w-6 rounded-full border border-border flex items-center justify-center font-bold hover:bg-secondary"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full mt-4 justify-center"
                  onClick={() => setDatesDropdownOpen(false)}
                >
                  Done
                </Button>
              </div>
            )}
          </div>

          {/* SEGMENT 3: TRAVELLERS / GUESTS (md:col-span-3) */}
          <div className="md:col-span-3 relative">
            <button
              type="button"
              onClick={() => {
                setGuestsDropdownOpen(!guestsDropdownOpen)
                setDestDropdownOpen(false)
                setDatesDropdownOpen(false)
              }}
              className="w-full text-left bg-background rounded-full px-5 py-3 border border-border hover:border-foreground/40 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4 text-mint" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 leading-tight">
                    Travellers
                  </span>
                  <span className="font-mono text-xs font-bold text-foreground truncate mt-0.5">
                    {adults} Adult{adults > 1 ? 's' : ''}
                    {childrenCount > 0 ? `, ${childrenCount} Child` : ''}
                  </span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-foreground/40 group-hover:text-foreground shrink-0 ml-1" />
            </button>

            {/* Travellers Stepper Popover */}
            {guestsDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-full sm:w-[280px] bg-background rounded-[1.75rem] border border-border shadow-elegant p-4 z-50 animate-in fade-in-50 zoom-in-95 duration-200">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-foreground/60 block mb-3">
                  Safari Party Size
                </span>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold block">Adults</span>
                      <span className="font-mono text-[10px] text-foreground/50">Age 15+ (Gorilla min)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-mono text-sm font-bold w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(Math.min(12, adults + 1))}
                        className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <span className="font-mono text-xs font-bold block">Children</span>
                      <span className="font-mono text-[10px] text-foreground/50">Savanna only (&lt;15)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                        className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-mono text-sm font-bold w-4 text-center">{childrenCount}</span>
                      <button
                        type="button"
                        onClick={() => setChildrenCount(Math.min(6, childrenCount + 1))}
                        className="h-7 w-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full mt-4 justify-center"
                  onClick={() => setGuestsDropdownOpen(false)}
                >
                  Done
                </Button>
              </div>
            )}
          </div>

          {/* SEGMENT 4: "BOOK NOW" ACTION BUTTON (md:col-span-2) */}
          <div className="md:col-span-2">
            <Button
              type="button"
              onClick={handleBookNowClick}
              size="lg"
              className="w-full h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-soft group"
            >
              <span>Book Now</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Bottom Trust Guarantee Note */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-foreground/50 font-mono text-[11px] px-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            <span>Guaranteed RDB Gorilla Trekking Permits</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>• No immediate card charges</span>
            <span>• Free 24h custom itinerary quote</span>
          </div>
        </div>
      </div>
    </div>
  )
}
