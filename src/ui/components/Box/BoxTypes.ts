import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes, ReactNode } from 'react'
import type { boxVariants } from './BoxStyles'

// Additional custom props that aren't encoded in cva variants
interface AdditionalBoxProps {
  /** Which underlying element to render. Defaults to 'div'. */
  element?: 'div' | 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer' | 'nav'
  /** Content to render inside the box */
  children?: ReactNode
  /** Whether the box should have hover/focus effects (for interactive content) */
  clickable?: boolean
}

// Base props shared across all element types, merges variant props & additions
type VariantOnlyProps = VariantProps<typeof boxVariants>
export interface BaseBoxProps extends VariantOnlyProps, AdditionalBoxProps {}

// Generic element props (covers div, section, article, etc.)
export type BoxElementProps = HTMLAttributes<HTMLElement> &
  BaseBoxProps & {
    element?:
      | 'div'
      | 'section'
      | 'article'
      | 'aside'
      | 'main'
      | 'header'
      | 'footer'
      | 'nav'
  }

// Public prop type
export type BoxProps = BoxElementProps

// Ref type exposed by the component
export type BoxRef = HTMLElement
