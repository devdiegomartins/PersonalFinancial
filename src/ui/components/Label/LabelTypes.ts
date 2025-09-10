import type { VariantProps } from 'class-variance-authority'
import type { LabelHTMLAttributes, ReactNode } from 'react'
import type { labelVariants, requiredIndicatorVariants } from './LabelStyles'

export interface LabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  /** Whether the field is required */
  required?: boolean
  /** Custom required indicator text/element (defaults to "*") */
  requiredIndicator?: ReactNode
  /** Custom className for the label */
  className?: string
}

export type RequiredIndicatorProps = VariantProps<typeof requiredIndicatorVariants>
