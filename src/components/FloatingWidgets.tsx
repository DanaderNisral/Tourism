import * as React from 'react'
import { useState } from 'react'
import { useDiscounts, useSiteData } from '@/hooks/useSiteData'
import { MessageCircle, Tag, Sparkles, Copy, Check } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export function FloatingWidgets() {
  const { data: discounts } = useDiscounts()
  const { data: siteConfig } = useSiteData()
  const [discountModalOpen, setDiscountModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const activeDiscount = discounts?.find((d) => d.active)
  const whatsappNumber = siteConfig?.settings.whatsappNumber || '250788123456'

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* 1. WHATSAPP CIRCLE FIXED BOTTOM-RIGHT */}
      <aside aria-label="Customer Support and Deals" className="contents">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            'Hello Sarumba Travel! I am inquiring about booking a tour in Rwanda.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with our safari specialists on WhatsApp"
          className="fixed bottom-24 right-4 z-40 lg:bottom-6 lg:right-6 h-14 w-14 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-elegant hover:scale-105 active:scale-95 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-whatsapp"
        >
          {/* Slow ping dot indicator */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75 duration-1000" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-mint border-2 border-background" />
          </span>

          <MessageCircle className="h-7 w-7 transition-transform group-hover:scale-110" />
        </a>

        {/* 2. DISCOUNT / OFFER PILL ON OPPOSITE SIDE (BOTTOM-LEFT) */}
        {activeDiscount && (
          <div className="fixed bottom-24 left-4 z-40 lg:bottom-6 lg:left-6">
            <button
              onClick={() => setDiscountModalOpen(true)}
              className="group h-14 rounded-full bg-primary text-primary-foreground p-1.5 flex items-center shadow-elegant hover:scale-102 active:scale-98 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              title="Click to view early-bird promotional code"
            >
              {/* Inner white circle icon */}
              <div className="h-11 w-11 rounded-full bg-primary-foreground text-primary flex items-center justify-center shrink-0">
                <Tag className="h-5 w-5 text-foreground" />
              </div>

              {/* On desktop expands on hover; on mobile hidden until tap */}
              <div className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap px-0 group-hover:px-3.5">
                <span className="font-mono text-xs font-bold tracking-wider">
                  Save {activeDiscount.value}% With {activeDiscount.code}
                </span>
              </div>
            </button>
          </div>
        )}
      </aside>

      {/* DISCOUNT MODAL (Bottom Sheet on mobile, Dialog on desktop) */}
      {activeDiscount && (
        <Dialog open={discountModalOpen} onOpenChange={setDiscountModalOpen}>
          <DialogContent className="md:max-w-md">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-mint" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground/50">
                  Exclusive Promotion
                </span>
              </div>
              <DialogTitle>Early-Bird Safari Discount</DialogTitle>
              <DialogDescription>
                {activeDiscount.message}
              </DialogDescription>
            </DialogHeader>

            <div className="my-4 p-5 rounded-2xl bg-secondary border border-border flex flex-col items-center text-center">
              <span className="font-mono text-xs text-foreground/50 uppercase tracking-widest mb-1.5">
                Your Promo Code
              </span>
              <div className="font-mono text-2xl font-black text-foreground tracking-widest bg-background px-6 py-2 rounded-full border border-border">
                {activeDiscount.code}
              </div>
              {activeDiscount.expires && (
                <span className="font-mono text-[11px] text-foreground/50 mt-2">
                  Valid until {activeDiscount.expires}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2.5">
              <Button
                onClick={() => copyCode(activeDiscount.code)}
                size="lg"
                className="w-full justify-center"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2 text-mint" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Promo Code
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => setDiscountModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
