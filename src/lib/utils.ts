import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency: 'USD' | 'RWF' = 'USD'): string {
  if (currency === 'RWF') {
    // Standard conversion e.g. 1 USD = ~1,350 RWF
    const rwfAmount = Math.round(amount * 1350)
    return `${rwfAmount.toLocaleString('en-US')} RWF`
  }
  return `$${amount.toLocaleString('en-US')}`
}

export function formatReferenceId(prefix = 'IMB'): string {
  const year = new Date().getFullYear()
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `${prefix}-${year}-${randomPart}`
}
