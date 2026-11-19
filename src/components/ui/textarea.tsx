import * as React from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/60">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'w-full min-h-[110px] rounded-3xl border border-foreground/15 bg-background p-4.5 font-mono text-sm text-foreground placeholder:text-foreground/40 transition-colors',
            'focus:outline-none focus:border-foreground focus:ring-1 focus:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-50 resize-y',
            error && 'border-foreground border-l-4',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <div className="flex items-center gap-1.5 pl-2 border-l-2 border-foreground mt-0.5">
            <AlertCircle className="h-3.5 w-3.5 text-foreground shrink-0" />
            <span className="font-mono text-xs text-foreground/80">{error}</span>
          </div>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
