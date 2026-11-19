// ============================================================================
// SARUMBA TRAVEL - SITE DEFAULTS & CONTENT CONFIGURATION
// Single typed source of truth. Merged seamlessly with Supabase database rows.
// Royalty-free Unsplash imagery featuring authentic Rwanda & East Africa travel.
// ============================================================================

export interface ItineraryDay {
  day: number
  title: string
  text: string
}

export interface TourReview {
  id: string
  author: string
  country: string
  rating: number
  date: string
  comment: string
}

export interface TourMeta {
  durationDays: number
  groupSize: string
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  season: string
  altitude?: string
  distanceFromKigali?: string
  highlights: string[]
  itinerary: ItineraryDay[]
  included: string[]
  excluded: string[]
  gallery: string[]
  mapEmbedUrl?: string
  faq?: Array<{ question: string; answer: string }>
  reviews?: TourReview[]
}

export interface Tour {
  id: string
  name: string
  slug: string
  category: 'Gorilla trekking' | 'Safari' | 'Culture' | 'Hiking' | 'Lakes'
  price: number // Base "from" price per person in USD
  salePrice?: number // Optional discounted price
  stock?: number // Maximum availability slots
  photos: string[] // Hero and card cover photos
  visible: boolean
  featured?: boolean
  meta: TourMeta
}

export interface Destination {
  id: string
  name: string
  slug: string
  subtitle: string
  description: string
  coverPhoto: string
  bestSeason: string
  altitude: string
  distanceFromKigali: string
  highlights: string[]
  topTourSlug?: string
}

export interface Experience {
  id: string
  title: string
  slug: string
  category: 'Wildlife' | 'Culture' | 'Adventure' | 'Conservation'
  iconName: string
  shortDescription: string
  fullDescription: string
  photo: string
  stats: string
}

export interface Discount {
  id: string
  code: string
  type: 'percent' | 'fixed'
  value: number
  active: boolean
  message: string
  expires?: string
}

export interface SiteSettings {
  name: string
  tagline: string
  description: string
  phone: string
  email: string
  address: string
  hours: string
  whatsappNumber: string // In international format without + or spaces for api.whatsapp.com
  currency: 'USD' | 'RWF'
  announcement: {
    enabled: boolean
    text: string
    linkText?: string
    linkUrl?: string
  }
  socials: {
    instagram: string
    twitter: string
    facebook: string
    tripadvisor: string
  }
}

export interface SiteContent {
  homeHero: {
    eyebrow: string
    title: string
    highlightWord: string
    subtitle: string
    primaryBtn: string
    secondaryBtn: string
    bgPhoto: string
  }
  whyUs: {
    eyebrow: string
    title: string
    subtitle: string
    features: Array<{
      title: string
      description: string
      icon: string
    }>
  }
  howItWorks: {
    eyebrow: string
    title: string
    steps: Array<{
      stepNumber: string
      title: string
      description: string
    }>
  }
  stats: Array<{
    value: string
    label: string
  }>
  testimonials: Array<{
    quote: string
    author: string
    location: string
    trip: string
    avatar: string
  }>
}

export interface SiteConfig {
  settings: SiteSettings
  site: SiteContent
  tours: Tour[]
  destinations: Destination[]
  experiences: Experience[]
  discounts: Discount[]
}

// ----------------------------------------------------------------------------
// DEFAULT BRAND & CONTACT SETTINGS
// ----------------------------------------------------------------------------
export const defaultSettings: SiteSettings = {
  name: 'Sarumba Travel',
  tagline: 'Wander with purpose.',
  description:
    'Bespoke gorilla trekking expeditions, savanna game drives, and community-led journeys across Rwanda and East Africa.',
  phone: '+250 788 123 456',
  email: 'hello@sarumba.rw',
  address: 'KG 7 Ave, Kimihurura, Kigali, Rwanda',
  hours: 'Mon – Sat: 08:00 – 19:00 (CAT)',
  whatsappNumber: '250788123456',
  currency: 'USD',
  announcement: {
    enabled: true,
    text: '2026/2027 Gorilla trekking permits & Great Migration itineraries now open for booking',
    linkText: 'Explore Tours',
    linkUrl: '/tours',
  },
  socials: {
    instagram: 'https://instagram.com/sarumbatravel',
    twitter: 'https://twitter.com/sarumbatravel',
    facebook: 'https://facebook.com/sarumbatravel',
    tripadvisor: 'https://tripadvisor.com',
  },
}

// ----------------------------------------------------------------------------
// DEFAULT HOMEPAGE & EDITORIAL COPY
// ----------------------------------------------------------------------------
export const defaultSiteContent: SiteContent = {
  homeHero: {
    eyebrow: 'Rwanda & East Africa Expeditions',
    title: 'See Africa',
    highlightWord: 'Differently',
    subtitle:
      'Immersive gorilla encounters, untamed savannas, and conservation journeys curated by local experts with heart and heritage.',
    primaryBtn: 'Explore Itineraries',
    secondaryBtn: 'Plan Custom Trip',
    bgPhoto:
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1920&auto=format&fit=crop', // Silverback gorilla in misty bamboo forest
  },
  whyUs: {
    eyebrow: 'Our Philosophy',
    title: 'Why Travel With Sarumba',
    subtitle:
      'Every expedition directly fuels indigenous conservation and empowers East African communities.',
    features: [
      {
        title: 'Native Naturalist Guides',
        description:
          'Led by certified Rwandan and regional trackers who grew up walking these slopes and savannas.',
        icon: 'Compass',
      },
      {
        title: 'Conservation First',
        description:
          '10% of every journey directly funds local community forest cooperatives and ranger welfare.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Private Bespoke Fleet',
        description:
          'Custom 4x4 safari cruisers with pop-up photography roofs, mini-fridges, and high-frequency radios.',
        icon: 'Car',
      },
      {
        title: 'Permit Guarantee & VIP Concierge',
        description:
          'Direct licensing with the Rwanda Development Board ensuring secured mountain gorilla permits.',
        icon: 'KeyRound',
      },
    ],
  },
  howItWorks: {
    eyebrow: 'Simple Process',
    title: 'Crafting Your Journey',
    steps: [
      {
        stepNumber: '01',
        title: 'Select or Request',
        description:
          'Pick from curated itineraries or tell us your dream dates, group size, and wildlife bucket list.',
      },
      {
        stepNumber: '02',
        title: 'Tailored Proposal',
        description:
          'Within 24 hours, our Kigali specialists send a detailed day-by-day plan with clear quotes.',
      },
      {
        stepNumber: '03',
        title: 'Secured Logistics',
        description:
          'We secure your gorilla & chimp permits, eco-lodge suites, and private 4x4 cruiser ahead of time.',
      },
      {
        stepNumber: '04',
        title: 'Wander Rwanda',
        description:
          'Touch down in Kigali to our warm welcome, dedicated private driver-guide, and 24/7 care.',
      },
    ],
  },
  stats: [
    { value: '14+', label: 'Years in East Africa' },
    { value: '3,800+', label: 'Travellers Hosted' },
    { value: '99.4%', label: 'Permit Success Rate' },
    { value: '5.0', label: 'TripAdvisor Rating' },
  ],
  testimonials: [
    {
      quote:
        'Standing ten feet from a 450lb silverback in the Volcanoes mist changed me forever. Sarumba’s tracker Jean-Paul was legendary.',
      author: 'Marcus & Claire Sterling',
      location: 'London, United Kingdom',
      trip: 'Silverback Encounter (3 Days)',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    },
    {
      quote:
        'Akagera at dawn was spellbinding. We spotted lions within forty minutes, and the boat safari on Lake Ihema was tranquil perfection.',
      author: 'Dr. Elena Rostova',
      location: 'Zurich, Switzerland',
      trip: 'Akagera Big Five Classic',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    },
    {
      quote:
        'Flawless coordination from airport pickup to our forest lodge in Nyungwe. The suspension bridge walk over the canopy is a must!',
      author: 'Tariq & Amina Al-Mansoor',
      location: 'Dubai, UAE',
      trip: 'Nyungwe Canopy & Chimpanzee Trek',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    },
  ],
}

// ----------------------------------------------------------------------------
// DEFAULT TOURS (PRODUCTS) - MAPPED TO DATABASE SCHEMA
// ----------------------------------------------------------------------------
export const defaultTours: Tour[] = [
  {
    id: 'tour-1',
    name: 'Volcanoes Silverback Encounter',
    slug: 'volcanoes-silverback-encounter',
    category: 'Gorilla trekking',
    price: 1850,
    salePrice: 1720,
    stock: 8,
    visible: true,
    featured: true,
    photos: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200&auto=format&fit=crop', // Gorilla
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop', // Savanna/mist
      'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1000&auto=format&fit=crop', // Volcano view
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1000&auto=format&fit=crop', // Forest flora
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop', // Safari 4x4
    ],
    meta: {
      durationDays: 3,
      groupSize: 'Max 6 travellers',
      difficulty: 'Moderate',
      season: 'Year-round (Best: Jun-Sep, Dec-Feb)',
      altitude: '2,400m - 3,200m',
      distanceFromKigali: '2.5 hrs by scenic paved highway',
      highlights: [
        'Official RDB Mountain Gorilla trekking permit in Volcanoes NP',
        'One magical, face-to-face hour in the presence of a habituated gorilla family',
        'Visit to the Ellen DeGeneres Campus of the Dian Fossey Gorilla Fund',
        'Luxury mountain lodge stay with roaring stone fireplace and volcano views',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Kigali & Scenic Drive to Musanze',
          text: 'Arrive at Kigali International Airport, meet your private naturalist guide, visit the Kigali Genocide Memorial, then ascend through the emerald terraced hills to Musanze foothills.',
        },
        {
          day: 2,
          title: 'The Silverback Trek in Volcanoes National Park',
          text: 'Early briefing at Kinigi headquarters. Trek through misty bamboo groves with expert trackers. Spend a life-altering 60 minutes observing gorilla interactions, grooming, and play. Afternoon tea at lodge.',
        },
        {
          day: 3,
          title: 'Golden Monkeys or Dian Fossey Tomb & Return to Kigali',
          text: 'Morning trek to see the rare bamboo-dwelling golden monkeys or hike to Dian Fossey’s historic research camp. Return to Kigali for artisan shopping and departure flight.',
        },
      ],
      included: [
        '1x Mountain Gorilla trekking permit ($1,500 RDB official pass)',
        'Private 4x4 Land Cruiser with pop-up safari roof and fuel',
        'English/French speaking native naturalist guide',
        '2 nights boutique lodge accommodation with all meals',
        'Kigali airport transfers & bottled mountain spring water',
      ],
      excluded: [
        'International flights and entry visas',
        'Porter fees ($15-$20 recommended per trek)',
        'Personal travel & evacuation insurance',
        'Gratuities for lodge staff and ranger team',
      ],
      gallery: [
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1000&auto=format&fit=crop',
      ],
      faq: [
        {
          question: 'How physically demanding is the gorilla trek?',
          answer:
            'Treks range from 1 to 4 hours depending on where the family nested the previous evening. Rangers adjust pacing to the slowest hiker, and porters are on hand to carry your daypack and assist with terrain.',
        },
        {
          question: 'What is the minimum age for gorilla trekking in Rwanda?',
          answer:
            'The Rwanda Development Board strictly requires all trekkers to be at least 15 years old on the day of the trek.',
        },
      ],
      reviews: [
        {
          id: 'rev-1',
          author: 'David H.',
          country: 'United States',
          rating: 5,
          date: 'October 2025',
          comment:
            'Worth every single dollar. Our guide Claude made sure we found the Agashya group smoothly. A bucket list memory!',
        },
      ],
    },
  },
  {
    id: 'tour-2',
    name: 'Akagera Big Five & Lake Ihema Boat Safari',
    slug: 'akagera-big-five-safari',
    category: 'Safari',
    price: 980,
    visible: true,
    featured: true,
    photos: [
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1200&auto=format&fit=crop', // Lion in savanna
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop', // Acacia sunset
      'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?q=80&w=1000&auto=format&fit=crop', // Elephants
      'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1000&auto=format&fit=crop', // Savanna view
    ],
    meta: {
      durationDays: 3,
      groupSize: 'Max 6 travellers',
      difficulty: 'Easy',
      season: 'Year-round (Best: Dry months Jun-Sep)',
      altitude: '1,250m - 1,800m',
      distanceFromKigali: '2.5 hrs to Southern Gate',
      highlights: [
        'Complete Big Five tracking: lions, rhinos, leopards, elephants, and cape buffaloes',
        'Private sunset boat safari on Lake Ihema witnessing hippos and giant Nile crocodiles',
        'Overnight at an eco-tented camp on the edge of the wetlands',
        'Scenic full-day game drive through northern rolling plains',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Kigali to Akagera & Lake Ihema Boat Cruise',
          text: 'Depart Kigali early through the eastern savannah plains. Check into your camp, then embark on a 2-hour afternoon cruise on Lake Ihema surrounded by waterbirds and hippos.',
        },
        {
          day: 2,
          title: 'Full Day Northern Savanna Game Drive',
          text: 'Traverse the entire length of Akagera National Park towards the Mutumba hills and Kilala plains. Spot black rhinos, giraffes, zebras, and prides of lions.',
        },
        {
          day: 3,
          title: 'Morning Bush Walk & Return to Kigali',
          text: 'Accompanied by an armed park ranger, experience a walking safari to interpret animal tracks, medicinal plants, and birdlife before your return transfer to Kigali.',
        },
      ],
      included: [
        'All Akagera National Park entry & conservation vehicle fees',
        'Private 4x4 cruiser with open roof hatch',
        'Lake Ihema sunset boat safari tickets',
        'Full board tented lodge accommodation',
        'Professional safari guide + ranger',
      ],
      excluded: ['Tips', 'Alcoholic drinks not specified', 'Travel insurance'],
      gallery: [
        'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1000&auto=format&fit=crop',
      ],
    },
  },
  {
    id: 'tour-3',
    name: 'Nyungwe Canopy Walk & Chimpanzee Trek',
    slug: 'nyungwe-canopy-chimpanzee-trek',
    category: 'Hiking',
    price: 1150,
    visible: true,
    featured: true,
    photos: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop', // Forest canopy / nature
      'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1000&auto=format&fit=crop', // Primate
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop', // Rainforest
    ],
    meta: {
      durationDays: 4,
      groupSize: 'Max 6 travellers',
      difficulty: 'Challenging',
      season: 'Year-round',
      altitude: '1,600m - 2,950m',
      distanceFromKigali: '5.5 hrs scenic drive via Butare',
      highlights: [
        'East Africa’s highest suspended canopy walkway (70m above forest floor)',
        'Chimpanzee tracking in Cyamudongo isolated ancient forest fragment',
        'Trek with 400-strong troops of black-and-white Angolan Colobus monkeys',
        'Tea plantation walk at Gisakura estate with local leaf plucking',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Kigali to Nyungwe via Nyanza King’s Palace',
          text: 'Travel through the southern cultural corridor. Stop at the Nyanza Royal Palace to meet the sacred long-horned Inyambo cattle, continuing through cloud forests to Gisakura.',
        },
        {
          day: 2,
          title: 'Chimpanzee Tracking at Dawn',
          text: '5:00 AM wake-up for chimpanzee trekking. Listen to their booming pant-hoots across the ancient ravine and watch them feed high in the wild fig branches.',
        },
        {
          day: 3,
          title: 'The High Canopy Walkway & Isumo Waterfall Hike',
          text: 'Step out onto the thrilling 160-meter steel suspension bridge hanging 70 meters over the rainforest canopy. Afternoon hike to the thundering Isumo Waterfall.',
        },
        {
          day: 4,
          title: 'Colobus Monkeys & Lake Kivu Panorama Drive',
          text: 'Morning walk among hundreds of acrobatic Angolan Colobus monkeys, then drive alongside the majestic sapphire waters of Lake Kivu back to Kigali.',
        },
      ],
      included: [
        'Chimpanzee tracking permit',
        'Canopy walkway permit',
        '3 nights forest lodge with all meals',
        'Dedicated 4x4 cruiser and driver',
      ],
      excluded: ['Personal porter fees', 'Tips', 'Laundry'],
      gallery: [
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1000&auto=format&fit=crop',
      ],
    },
  },
  {
    id: 'tour-4',
    name: 'Lake Kivu Serenity & Coffee Trail',
    slug: 'lake-kivu-serenity-coffee-trail',
    category: 'Lakes',
    price: 620,
    visible: true,
    featured: false,
    photos: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop', // Blue lake / shore
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop', // Coffee beans
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop', // Kayak / boat on lake
    ],
    meta: {
      durationDays: 3,
      groupSize: 'Max 8 travellers',
      difficulty: 'Easy',
      season: 'Year-round',
      altitude: '1,460m',
      distanceFromKigali: '3.5 hrs to Gisenyi / Karongi',
      highlights: [
        'Sunset boat cruise following traditional three-boat night fishermen singing rhythmic melodies',
        'Crop-to-cup speciality Bourbon coffee washing station tour and tasting',
        'Island hopping kayak tour on calm, bilharzia-free crystal waters',
        'Beachfront relaxation with fresh Lake Kivu Sambaza and grilled tilapia',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Kigali to Rubavu (Gisenyi) & Waterfront Relaxation',
          text: 'Arrive at the shores of Lake Kivu. Settle into your boutique lakeside lodge with private palm gardens. Sunset cocktails overlooking the Congo Nile divide.',
        },
        {
          day: 2,
          title: 'Bourbon Coffee Island Tour & Traditional Singing Fishermen',
          text: 'Board a wooden boat to Kinunu coffee plantation. Participate in harvesting, pulping, and roasting. At dusk, follow the singing night fishermen as they light their lanterns.',
        },
        {
          day: 3,
          title: 'Morning Kayak & Return via Musanze',
          text: 'Leisurely paddle across peaceful inlets with views of the volcanic chain. Return to Kigali in the afternoon.',
        },
      ],
      included: [
        '2 nights lakeside boutique hotel',
        'Boat excursions and coffee plantation entrance',
        'Private transport and driver-guide',
      ],
      excluded: ['Personal shopping', 'Gratuities'],
      gallery: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop',
      ],
    },
  },
  {
    id: 'tour-5',
    name: 'Grand East Africa: Rwanda Gorillas & Serengeti Migration',
    slug: 'grand-east-africa-gorillas-serengeti',
    category: 'Safari',
    price: 4600,
    salePrice: 4350,
    stock: 4,
    visible: true,
    featured: true,
    photos: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop', // Savanna sunset wildebeest
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1000&auto=format&fit=crop', // Gorilla
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1000&auto=format&fit=crop', // Lion
    ],
    meta: {
      durationDays: 8,
      groupSize: 'Max 6 travellers',
      difficulty: 'Moderate',
      season: 'Jun - Oct (Peak river crossings)',
      highlights: [
        'The ultimate combination: mountain gorillas in Rwanda + Great Migration in the Serengeti',
        'Seamless regional bush flight connections',
        'Overnights in luxury tented mobile migration camps',
        'Ngorongoro Crater UNESCO World Heritage caldera safari',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Kigali Arrival & Transfer to Volcanoes NP',
          text: 'Welcome to Rwanda. Direct private transfer to Musanze luxury lodge.',
        },
        {
          day: 2,
          title: 'Rwanda Mountain Gorilla Trek',
          text: 'Spend the morning tracking endangered mountain gorillas in Volcanoes NP.',
        },
        {
          day: 3,
          title: 'Fly Kigali to Kilimanjaro & Arusha',
          text: 'Fly across to Tanzania, relaxing evening in the lush coffee estates of Arusha.',
        },
        {
          day: 4,
          title: 'Ngorongoro Crater Conservation Area',
          text: 'Descend 600m into the caldera for unmatched wildlife density.',
        },
        {
          day: 5,
          title: 'Central Serengeti National Park',
          text: 'Drive into the boundless plains of the Serengeti tracking leopard and cheetah.',
        },
        {
          day: 6,
          title: 'Northern Serengeti & Mara River Crossing',
          text: 'Witness dramatic wildebeest and zebra herds braving river currents.',
        },
        {
          day: 7,
          title: 'Hot Air Balloon Safari & Bush Breakfast',
          text: 'Drift silently over the dawn savanna, followed by champagne bush brunch.',
        },
        {
          day: 8,
          title: 'Bush Flight to Kilimanjaro & Departure',
          text: 'Morning airstrip transfer for international connections.',
        },
      ],
      included: [
        'Gorilla permit ($1,500) + all Tanzania national park and crater fees',
        'Regional flight transfers',
        'All luxury accommodations and gourmet meals',
        'Hot air balloon flight and champagne breakfast',
      ],
      excluded: ['Tanzania and Rwanda visas', 'International long-haul flights'],
      gallery: [
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1000&auto=format&fit=crop',
      ],
    },
  },
  {
    id: 'tour-6',
    name: 'Kigali Arts, Heritage & Gastronomy Walk',
    slug: 'kigali-arts-heritage-walk',
    category: 'Culture',
    price: 140,
    visible: true,
    featured: false,
    photos: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop', // Art / crafts / colorful
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop', // Dining / cafe
    ],
    meta: {
      durationDays: 1,
      groupSize: 'Max 10 travellers',
      difficulty: 'Easy',
      season: 'Year-round',
      altitude: '1,567m',
      distanceFromKigali: 'Inside Kigali city limits',
      highlights: [
        'Nyamirambo Women’s Center guided walking tour and traditional cooking class',
        'Inema Arts Center contemporary African gallery visit with resident artists',
        'Specialty single-origin pour-over tasting at Question Coffee',
        'Kimironko vibrant fabric market with bespoke tailor matching',
      ],
      itinerary: [
        {
          day: 1,
          title: 'A Day in Africa’s Cleanest & Most Dynamic Capital',
          text: 'Explore Nyamirambo’s vibrant streets, learn traditional Imigongo cow-dung art geometric painting, savor a home-cooked lunch with local hostesses, and conclude with modern cocktails overlooking Kigali’s thousand illuminated hills.',
        },
      ],
      included: [
        'Private city air-conditioned transport',
        'Local community host guide',
        'Cooking workshop lunch & coffee tasting',
        'All gallery entry passes',
      ],
      excluded: ['Fabric purchases at Kimironko'],
      gallery: [
        'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop',
      ],
    },
  },
]

// ----------------------------------------------------------------------------
// DEFAULT DESTINATIONS
// ----------------------------------------------------------------------------
export const defaultDestinations: Destination[] = [
  {
    id: 'dest-1',
    name: 'Volcanoes National Park',
    slug: 'volcanoes-national-park',
    subtitle: 'Realm of the Mountain Gorillas & Virunga Peaks',
    description:
      'A chain of dormant volcanic peaks swathed in cloud forests, bamboo thickets, and rich biodiversity. Home to more than a third of the world’s surviving mountain gorillas.',
    coverPhoto:
      'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1200&auto=format&fit=crop',
    bestSeason: 'June to September & December to February',
    altitude: '2,400m - 4,507m (Karisimbi peak)',
    distanceFromKigali: '116 km (2.5 hours)',
    highlights: ['Gorilla trekking', 'Golden monkeys', 'Bisoke Crater hike', 'Dian Fossey Campus'],
    topTourSlug: 'volcanoes-silverback-encounter',
  },
  {
    id: 'dest-2',
    name: 'Akagera National Park',
    slug: 'akagera-national-park',
    subtitle: 'Classic Central African Savanna & Wetlands',
    description:
      'One of Africa’s greatest conservation comeback stories. Managed jointly by African Parks and RDB, Akagera boasts the complete Big Five roaming sweeping plains, lakes, and papyrus swamps.',
    coverPhoto:
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop',
    bestSeason: 'June to September (animals gather around water sources)',
    altitude: '1,250m - 1,825m',
    distanceFromKigali: '110 km (2.5 hours to South Gate)',
    highlights: ['Big Five game drives', 'Lake Ihema boat cruise', 'Night safari drives', 'Bush walking'],
    topTourSlug: 'akagera-big-five-safari',
  },
  {
    id: 'dest-3',
    name: 'Nyungwe National Park',
    slug: 'nyungwe-national-park',
    subtitle: 'Africa’s Oldest Montane Rainforest',
    description:
      'A primeval mountain rainforest that survived the last ice age. A biodiversity sanctuary boasting 13 primate species, 322 bird species, and ancient moss-draped giant hardwoods.',
    coverPhoto:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
    bestSeason: 'Year-round (Chimpanzees track best during rainy seasons)',
    altitude: '1,600m - 2,950m',
    distanceFromKigali: '220 km (5.5 hours)',
    highlights: ['70m Suspended Canopy Walk', 'Chimpanzee tracking', 'Colobus monkey troops', 'Isumo Waterfall'],
    topTourSlug: 'nyungwe-canopy-chimpanzee-trek',
  },
  {
    id: 'dest-4',
    name: 'Lake Kivu',
    slug: 'lake-kivu',
    subtitle: 'The Riviera of Rwanda & Congo Nile Divide',
    description:
      'A breathtaking inland sea bordered by terraced mountains, secluded sandy coves, and coffee plantations. Famous for its singing fishermen and tranquil sunset kayak outings.',
    coverPhoto:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    bestSeason: 'Year-round pleasant subtropical climate',
    altitude: '1,460m',
    distanceFromKigali: '160 km (3.5 hours)',
    highlights: ['Singing fishermen boat tours', 'Bourbon coffee trail', 'Island hopping kayak', 'Congo Nile Trail'],
    topTourSlug: 'lake-kivu-serenity-coffee-trail',
  },
  {
    id: 'dest-5',
    name: 'Kigali City',
    slug: 'kigali-city',
    subtitle: 'The Clean, Green & Creative Capital',
    description:
      'Spanning across lush green ridges, Kigali is celebrated as Africa’s cleanest city. A welcoming hub of cutting-edge contemporary art galleries, world-class dining, and poignant history.',
    coverPhoto:
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop',
    bestSeason: 'Year-round',
    altitude: '1,567m',
    distanceFromKigali: '0 km (Departure point)',
    highlights: ['Genocide Memorial', 'Inema Arts Center', 'Nyamirambo Walking Tour', 'Question Coffee Cafe'],
    topTourSlug: 'kigali-arts-heritage-walk',
  },
]

// ----------------------------------------------------------------------------
// DEFAULT EXPERIENCES
// ----------------------------------------------------------------------------
export const defaultExperiences: Experience[] = [
  {
    id: 'exp-1',
    title: 'Wildlife & Primate Encounters',
    slug: 'wildlife-primates',
    category: 'Wildlife',
    iconName: 'Footprints',
    shortDescription: 'Lock eyes with gentle mountain gorillas and playful chimpanzees.',
    fullDescription:
      'Trek through emerald bamboo corridors into the presence of giant silverbacks, watch golden monkeys leap across sunlit branches, and witness lion prides resting beneath acacia trees.',
    photo:
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1000&auto=format&fit=crop',
    stats: '1,000+ gorillas protected',
  },
  {
    id: 'exp-2',
    title: 'Living Heritage & Gastronomy',
    slug: 'heritage-gastronomy',
    category: 'Culture',
    iconName: 'HeartHandshake',
    shortDescription: 'Discover the traditions, music, and flavors of the Thousand Hills.',
    fullDescription:
      'Share a harvest lunch in rural Musanze cooperatives, learn royal drum rhythms and Intore warrior dances, and cup award-winning high-altitude Arabica coffees directly with farming communities.',
    photo:
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop',
    stats: '12 partner villages',
  },
  {
    id: 'exp-3',
    title: 'High-Altitude Active Adventures',
    slug: 'active-adventures',
    category: 'Adventure',
    iconName: 'Mountain',
    shortDescription: 'Suspension canopies, volcanic crater climbs, and tranquil lake paddles.',
    fullDescription:
      'Scale Mount Bisoke’s fog-crowned crater lake, step across East Africa’s highest treetop bridge suspended 70m above Nyungwe, and paddle silent kayaks across Lake Kivu at dusk.',
    photo:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop',
    stats: '4,507m peak elevation',
  },
  {
    id: 'exp-4',
    title: 'Regenerative Conservation',
    slug: 'conservation-impact',
    category: 'Conservation',
    iconName: 'Trees',
    shortDescription: 'Travel that actively restores ecosystems and protects endangered species.',
    fullDescription:
      'Visit veterinary orphan sanctuaries, plant indigenous saplings along the Volcanoes buffer corridor, and see firsthand how responsible tourism has brought the mountain gorilla back from the brink.',
    photo:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
    stats: '10% revenue reinvested',
  },
]

// ----------------------------------------------------------------------------
// DEFAULT DISCOUNTS & PROMOTIONAL OFFERS
// ----------------------------------------------------------------------------
export const defaultDiscounts: Discount[] = [
  {
    id: 'disc-1',
    code: 'SAFARI2026',
    type: 'percent',
    value: 10,
    active: true,
    message: 'Early-Bird Safaris: Save 10% on all 2026/2027 custom itineraries booked this month.',
    expires: '2026-12-31',
  },
]

// ----------------------------------------------------------------------------
// COMPLETE COMPOSITE CONFIG
// ----------------------------------------------------------------------------
export const defaultSiteConfig: SiteConfig = {
  settings: defaultSettings,
  site: defaultSiteContent,
  tours: defaultTours,
  destinations: defaultDestinations,
  experiences: defaultExperiences,
  discounts: defaultDiscounts,
}
