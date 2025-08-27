import type { VariantProps } from 'class-variance-authority'
import type { buttonVariants } from './ButtonStyles'

// Base props shared across both anchor and button render targets
interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
  /** Which underlying element to render. Defaults to 'button'. */
  element?: 'button' | 'a'
}

// Button-specific props (default case when element not provided)
export type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    element?: 'button'
  }

// Anchor-specific props (must explicitly set element = 'a')
export type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    element: 'a'
  }

// Public prop type (discriminated union based on element)
export type ButtonProps = NativeButtonProps | AnchorButtonProps

// Ref type exposed by the component
export type ButtonRef = HTMLButtonElement | HTMLAnchorElement
