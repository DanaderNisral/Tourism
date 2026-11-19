import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured, shopId } from '@/lib/supabase'
import {
  defaultSiteConfig,
  type Tour,
  type SiteSettings,
  type SiteContent,
  type Discount,
  type Destination,
  type Experience,
} from '@/data/site.defaults'
import { formatReferenceId } from '@/lib/utils'

// ----------------------------------------------------------------------------
// CURRENCY STATE HOOK
// ----------------------------------------------------------------------------
export function useCurrency() {
  const [currency, setCurrency] = useState<'USD' | 'RWF'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('imbuto_currency')
      if (saved === 'RWF' || saved === 'USD') return saved
    }
    return 'USD'
  })

  useEffect(() => {
    localStorage.setItem('imbuto_currency', currency)
  }, [currency])

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'RWF' : 'USD'))
  }

  return { currency, setCurrency, toggleCurrency }
}

// ----------------------------------------------------------------------------
// SITE SETTINGS & CONTENT HOOK (15s refetch interval for live admin updates)
// ----------------------------------------------------------------------------
export function useSiteData() {
  return useQuery({
    queryKey: ['site-config', shopId],
    queryFn: async (): Promise<{ settings: SiteSettings; site: SiteContent }> => {
      if (!isSupabaseConfigured || !supabase) {
        return {
          settings: defaultSiteConfig.settings,
          site: defaultSiteConfig.site,
        }
      }

      try {
        let query = supabase.from('site_kv').select('key, value')
        if (shopId) {
          query = query.eq('shop_id', shopId)
        }

        const { data, error } = await query

        if (error || !data || data.length === 0) {
          return {
            settings: defaultSiteConfig.settings,
            site: defaultSiteConfig.site,
          }
        }

        const settingsRow = data.find((row) => row.key === 'settings')
        const siteRow = data.find((row) => row.key === 'site')

        return {
          settings: settingsRow?.value
            ? { ...defaultSiteConfig.settings, ...settingsRow.value }
            : defaultSiteConfig.settings,
          site: siteRow?.value
            ? { ...defaultSiteConfig.site, ...siteRow.value }
            : defaultSiteConfig.site,
        }
      } catch {
        return {
          settings: defaultSiteConfig.settings,
          site: defaultSiteConfig.site,
        }
      }
    },
    refetchInterval: 15000, // Refetch every 15s to capture live admin changes without redeployment
    staleTime: 10000,
  })
}

// ----------------------------------------------------------------------------
// TOURS (PRODUCTS) HOOK
// ----------------------------------------------------------------------------
export function useTours(options?: {
  category?: string
  search?: string
  sortBy?: 'price-asc' | 'price-desc' | 'duration' | 'featured'
  maxPrice?: number
}) {
  return useQuery({
    queryKey: ['tours', shopId, options],
    queryFn: async (): Promise<Tour[]> => {
      let tourList = defaultSiteConfig.tours

      if (isSupabaseConfigured && supabase) {
        try {
          let query = supabase
            .from('products')
            .select('*')
            .eq('visible', true)

          if (shopId) {
            query = query.eq('shop_id', shopId)
          }

          const { data, error } = await query

          if (!error && data && data.length > 0) {
            // Map Supabase products rows to Tour type
            tourList = data.map((item: any) => ({
              id: item.id,
              name: item.name,
              slug: item.slug || item.id,
              category: item.category || 'Safari',
              price: Number(item.price) || 0,
              salePrice: item.sale_price ? Number(item.sale_price) : undefined,
              stock: item.stock,
              photos: Array.isArray(item.photos) && item.photos.length > 0 ? item.photos : defaultSiteConfig.tours[0].photos,
              visible: item.visible ?? true,
              featured: item.meta?.featured ?? false,
              meta: item.meta || defaultSiteConfig.tours[0].meta,
            }))
          }
        } catch {
          // Fall back gracefully to default tours
        }
      }

      // Client-side filtering & sorting
      let filtered = [...tourList]

      if (options?.category && options.category !== 'All') {
        filtered = filtered.filter(
          (t) => t.category.toLowerCase() === options.category?.toLowerCase()
        )
      }

      if (options?.search) {
        const query = options.search.toLowerCase()
        filtered = filtered.filter(
          (t) =>
            t.name.toLowerCase().includes(query) ||
            t.meta.highlights.some((h) => h.toLowerCase().includes(query)) ||
            t.category.toLowerCase().includes(query)
        )
      }

      if (options?.maxPrice) {
        filtered = filtered.filter((t) => t.price <= options.maxPrice!)
      }

      if (options?.sortBy === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price)
      } else if (options?.sortBy === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price)
      } else if (options?.sortBy === 'duration') {
        filtered.sort((a, b) => (b.meta.durationDays || 0) - (a.meta.durationDays || 0))
      } else {
        // default: featured first
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      }

      return filtered
    },
    staleTime: 60000,
  })
}

// ----------------------------------------------------------------------------
// SINGLE TOUR LOOKUP HOOK
// ----------------------------------------------------------------------------
export function useTour(slug: string) {
  const { data: tours, isLoading } = useTours()
  const tour = tours?.find((t) => t.slug === slug || t.id === slug) || defaultSiteConfig.tours.find((t) => t.slug === slug || t.id === slug)
  return { tour, isLoading }
}

// ----------------------------------------------------------------------------
// DESTINATIONS & EXPERIENCES HOOKS
// ----------------------------------------------------------------------------
export function useDestinations(): Destination[] {
  return defaultSiteConfig.destinations
}

export function useExperiences(): Experience[] {
  return defaultSiteConfig.experiences
}

// ----------------------------------------------------------------------------
// DISCOUNTS HOOK
// ----------------------------------------------------------------------------
export function useDiscounts() {
  return useQuery({
    queryKey: ['discounts', shopId],
    queryFn: async (): Promise<Discount[]> => {
      if (isSupabaseConfigured && supabase) {
        try {
          let query = supabase
            .from('discounts')
            .select('*')
            .eq('active', true)

          if (shopId) {
            query = query.eq('shop_id', shopId)
          }

          const { data, error } = await query
          if (!error && data && data.length > 0) {
            return data.map((d: any) => ({
              id: d.id,
              code: d.code,
              type: d.type,
              value: Number(d.value),
              active: d.active,
              message: d.message,
              expires: d.expires,
            }))
          }
        } catch {
          // Graceful fallback
        }
      }
      return defaultSiteConfig.discounts
    },
    staleTime: 60000,
  })
}

// ----------------------------------------------------------------------------
// BOOKING INQUIRY SUBMISSION HOOK
// ----------------------------------------------------------------------------
export interface BookingInput {
  tourId: string
  tourName: string
  startDate: string
  adults: number
  children: number
  fullName: string
  phone: string
  email: string
  specialRequests?: string
  estimatedTotalUsd: number
}

export interface BookingResult {
  success: boolean
  referenceId: string
  whatsAppUrl: string
  message: string
}

export function useCreateBooking() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: BookingInput): Promise<BookingResult> => {
      const referenceId = formatReferenceId('IMB')
      const travellersText = `${input.adults} Adult${input.adults > 1 ? 's' : ''}${
        input.children > 0 ? `, ${input.children} Child${input.children > 1 ? 'ren' : ''}` : ''
      }`

      // Create WhatsApp deep-link message
      const whatsAppMessage = `Hello Sarumba Travel! 🌿\n\nI would like to request a booking for:\n*Tour:* ${input.tourName}\n*Ref:* ${referenceId}\n*Date:* ${input.startDate || 'Flexible'}\n*Travellers:* ${travellersText}\n*Contact:* ${input.fullName} (${input.phone})\n*Email:* ${input.email}\n${input.specialRequests ? `*Notes:* ${input.specialRequests}\n` : ''}\nCould you please confirm permit availability and send the official quote? Thank you!`

      const whatsAppUrl = `https://wa.me/250788123456?text=${encodeURIComponent(
        whatsAppMessage
      )}`

      // If Supabase is connected, insert row into `orders`
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('orders').insert({
            order_number: referenceId,
            customer_name: input.fullName,
            customer_email: input.email,
            customer_phone: input.phone,
            total_amount: input.estimatedTotalUsd,
            status: 'inquiry_pending',
            shop_id: shopId,
            meta: {
              type: 'booking',
              tour_id: input.tourId,
              tour_name: input.tourName,
              start_date: input.startDate,
              adults: input.adults,
              children: input.children,
              special_requests: input.specialRequests,
              created_at: new Date().toISOString(),
            },
          })
        } catch {
          // Log or continue; customer receives WhatsApp & confirmation either way
        }
      }

      return {
        success: true,
        referenceId,
        whatsAppUrl,
        message: 'Your booking inquiry has been recorded. Our team will contact you shortly.',
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
