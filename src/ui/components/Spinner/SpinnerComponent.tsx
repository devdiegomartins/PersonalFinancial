import { forwardRef } from 'react'
import { cn } from '~/ui/utils'
import { spinnerVariants } from './SpinnerStyles'
import type { SpinnerProps } from './SpinnerTypes'

export const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, tone, label = 'Carregando...', ...props }, ref) => {
    return (
      <svg
        ref={ref}
        aria-label={label || undefined}
        aria-hidden={label ? undefined : true}
        className={cn(spinnerVariants({ size, tone }), className)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    )
  }
)

Spinner.displayName = 'Spinner'
