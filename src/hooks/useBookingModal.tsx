import * as React from 'react'

export interface BookingModalData {
  tourSlug?: string
  destination?: string
  adults?: number
  children?: number
  date?: string
  specialRequests?: string
}

interface BookingModalContextType {
  isOpen: boolean
  data: BookingModalData
  openBooking: (data?: BookingModalData) => void
  closeBooking: () => void
}

const BookingModalContext = React.createContext<BookingModalContextType | undefined>(undefined)

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [data, setData] = React.useState<BookingModalData>({})

  const openBooking = (modalData?: BookingModalData) => {
    if (modalData) setData(modalData)
    setIsOpen(true)
  }

  const closeBooking = () => {
    setIsOpen(false)
  }

  return (
    <BookingModalContext.Provider value={{ isOpen, data, openBooking, closeBooking }}>
      {children}
    </BookingModalContext.Provider>
  )
}

export function useBookingModal() {
  const ctx = React.useContext(BookingModalContext)
  if (!ctx) {
    throw new Error('useBookingModal must be used within BookingModalProvider')
  }
  return ctx
}
