import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { BookingForm } from '@/components/BookingForm'

export interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialTourSlug?: string
  initialDestination?: string
  initialAdults?: number
  initialChildren?: number
  initialDate?: string
  initialSpecialRequests?: string
}

export function BookingDialog({
  open,
  onOpenChange,
  initialTourSlug,
  initialDestination,
  initialAdults,
  initialChildren,
  initialDate,
  initialSpecialRequests,
}: BookingDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Request This Safari Journey</DialogTitle>
          <DialogDescription>
            Confirm your party details and dates. Our team will verify gorilla permits with the Rwanda Development Board and email your official quote within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <BookingForm
          initialTourSlug={initialTourSlug}
          initialDestination={initialDestination}
          initialAdults={initialAdults}
          initialChildren={initialChildren}
          initialDate={initialDate}
          initialSpecialRequests={initialSpecialRequests}
          onSuccess={() => {
            // Keep modal open to show the reference and WhatsApp button
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
