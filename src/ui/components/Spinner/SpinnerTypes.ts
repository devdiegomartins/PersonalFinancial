import type { VariantProps } from 'class-variance-authority'
import type { spinnerVariants } from './SpinnerStyles'

export interface SpinnerProps
  extends React.HTMLAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  /** Accessible label (will be hidden & applied via aria-label). */
  label?: string
}
