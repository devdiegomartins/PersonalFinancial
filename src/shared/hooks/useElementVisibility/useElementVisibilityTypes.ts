import type { RefObject } from 'react'

export interface UseElementVisibilityOptions {
  /** Root element for IntersectionObserver (defaults to viewport) */
  root?: Element | null
  /** Margin around root. */
  rootMargin?: string
  /** Visibility threshold(s). Defaults to 0.1 */
  threshold?: number | number[]
  /** If true, unobserve after first visibility (good for one-time entrance animations). */
  once?: boolean
  /** Optional initial visibility state (SSR). */
  initialVisible?: boolean
}

export interface UseElementVisibilityReturn {
  /** Ref to attach to the element you want to observe. */
  ref: RefObject<HTMLElement | null>
  /** Whether the element is currently intersecting. */
  isVisible: boolean
  /** Manually force re-observation (disconnect and observe again). */
  refresh: () => void
}
