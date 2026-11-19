import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-widest select-none transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-secondary text-foreground border border-foreground/10',
        glass:
          'glass text-foreground shadow-sm',
        outline:
          'border border-foreground/20 text-foreground bg-transparent',
        mint:
          'bg-mint/20 text-foreground border border-mint/40',
        sky:
          'bg-sky/20 text-foreground border border-sky/40',
        dark:
          'bg-foreground text-background border border-background/20',
        whatsapp:
          'bg-whatsapp/15 text-foreground border border-whatsapp/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  withDot?: boolean
}

export function Badge({ className, variant, withDot = false, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {withDot && (
        <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
      )}
      {children}
    </div>
  )
}
