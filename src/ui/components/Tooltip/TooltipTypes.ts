import type { VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'
import type { tooltipVariants } from './TooltipStyles'

// Position priority for smart positioning
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

// Imperative handle for controlling tooltip
export interface TooltipHandle {
  show: () => void
  hide: () => void
  toggle: () => void
  isVisible: boolean
}

// Additional custom props
interface AdditionalTooltipProps {
  /** Position priority array - tooltip will try positions in order until one fits */
  position?: TooltipPosition[]
  /** Text content for the tooltip */
  value?: string
  /** JSX content for more complex tooltip displays */
  content?: ReactNode
  /** Show/hide the tooltip programmatically */
  isVisible?: boolean
  /** Delay in milliseconds before showing tooltip on hover */
  showDelay?: number
  /** Delay in milliseconds before hiding tooltip */
  hideDelay?: number
  /** Disable hover/focus interactions (useful for imperative control) */
  disabled?: boolean
  /** Offset from the target element in pixels */
  offset?: number
  /** Maximum width of the tooltip (CSS value) */
  maxWidth?: string | number
  /** Custom class name for the tooltip container */
  className?: string
  /** Custom class name for the arrow */
  arrowClassName?: string
  /** Tooltip trigger element(s) */
  children: ReactNode
}

// Base props from variant system
type VariantOnlyProps = VariantProps<typeof tooltipVariants>

// Merge variant props with custom props
export interface TooltipProps extends VariantOnlyProps, AdditionalTooltipProps {}

// Ref type exposed by the component
export type TooltipRef = TooltipHandle
