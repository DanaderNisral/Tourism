import * as React from 'react'
import { useEffect } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { FloatingWidgets } from '@/components/FloatingWidgets'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import { BookingDialog } from '@/components/BookingDialog'
import { BookingModalProvider, useBookingModal } from '@/hooks/useBookingModal'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

export const Route = createRootRoute({
  component: RootComponent,
})

function InnerLayout() {
  const { isOpen, data, openBooking, closeBooking } = useBookingModal()

  // Scroll reveal: IntersectionObserver for .reveal elements. A MutationObserver
  // re-scans the DOM so content rendered after mount (async data, route changes)
  // is always observed — otherwise late-loading sections stay invisible.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    const observeReveals = () => {
      document
        .querySelectorAll('.reveal:not(.is-visible)')
        .forEach((el) => observer.observe(el))
    }

    observeReveals()

    const mutationObserver = new MutationObserver(() => observeReveals())
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-mint selection:text-foreground">
      <Navbar onOpenBooking={() => openBooking()} />

      <main className="flex-1 pb-20 lg:pb-0">
        <Outlet />
      </main>

      <Footer />

      <FloatingWidgets />
      <MobileBottomNav />

      <BookingDialog
        open={isOpen}
        onOpenChange={(open) => !open && closeBooking()}
        initialTourSlug={data.tourSlug}
        initialDestination={data.destination}
        initialAdults={data.adults}
        initialChildren={data.children}
        initialDate={data.date}
        initialSpecialRequests={data.specialRequests}
      />
    </div>
  )
}

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookingModalProvider>
        <InnerLayout />
      </BookingModalProvider>
    </QueryClientProvider>
  )
}
