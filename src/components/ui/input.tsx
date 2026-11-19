import * as React from 'react'
import { cn } from '@/lib/utils'
import { X, AlertCircle } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  onClear?: () => void
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, onClear, value, onChange, ...props }, ref) => {
    const hasValue = value !== undefined && value !== ''

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/60">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4.5 pointer-events-none text-foreground/40 flex items-center justify-center">
              {icon}
            </div>
          )}
          <input
            type={type}
            value={value}
            onChange={onChange}
            className={cn(
              'w-full h-12 rounded-full border border-foreground/15 bg-background px-5 py-3 font-mono text-sm text-foreground placeholder:text-foreground/40 transition-colors',
              'focus:outline-none focus:border-foreground focus:ring-1 focus:ring-ring',
              'disabled:cursor-not-allowed disabled:opacity-50',
              icon ? 'pl-11' : '',
              onClear && hasValue ? 'pr-11' : '',
              error && 'border-foreground border-l-4',
              className
            )}
            ref={ref}
            {...props}
          />
          {onClear && hasValue && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3.5 h-6 w-6 rounded-full flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
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
Input.displayName = 'Input'
