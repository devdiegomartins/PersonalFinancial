import type { VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'
import type { buttonVariants } from './ButtonStyles'

// Additional custom props that aren't encoded in cva variants
interface AdditionalButtonProps {
  /** Which underlying element to render. Defaults to 'button'. */
  element?: 'button' | 'a'
  /** Display a spinner & disable interactions (keeps width). */
  isLoading?: boolean
  /** Force the button to expand to full container width. */
  fullWidth?: boolean
  /** Optional leading icon element. */
  startIcon?: ReactNode
  /** Optional trailing icon element. */
  endIcon?: ReactNode
}

// Base props shared across both anchor and button render targets, merges variant props & additions
type VariantOnlyProps = VariantProps<typeof buttonVariants>
// Merge manually to avoid name collisions between cva generated keys & custom props
export interface BaseButtonProps extends VariantOnlyProps, AdditionalButtonProps {}

// Button-specific props (default case when element not provided)
export type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
> & {
  disabled?: boolean
} & BaseButtonProps & { element?: 'button' }

// Anchor-specific props (must explicitly set element = 'a')
export type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  BaseButtonProps & { element: 'a' }

// Public prop type (discriminated union based on element)
export type ButtonProps = NativeButtonProps | AnchorButtonProps

// Ref type exposed by the component
export type ButtonRef = HTMLButtonElement | HTMLAnchorElement
