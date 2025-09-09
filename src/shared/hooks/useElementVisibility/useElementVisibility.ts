import { useCallback, useEffect, useRef, useState } from 'react'
import type {
  UseElementVisibilityOptions,
  UseElementVisibilityReturn,
} from './useElementVisibilityTypes'

export function useElementVisibility(
  options: UseElementVisibilityOptions = {}
): UseElementVisibilityReturn {
  const {
    root = null,
    rootMargin,
    threshold = 0.1,
    once = false,
    initialVisible = false,
  } = options
  const elementRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(initialVisible)

  const disconnect = useCallback(() => {
    observerRef.current?.disconnect()
    observerRef.current = null
  }, [])

  const observe = useCallback(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
    const el = elementRef.current
    if (!el) return
    disconnect()
    observerRef.current = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { root, rootMargin, threshold }
    )
    observerRef.current.observe(el)
  }, [disconnect, once, root, rootMargin, threshold])

  const refresh = useCallback(() => {
    observe()
  }, [observe])

  // Auto observe on mount & when deps change
  useEffect(() => {
    observe()
    return () => disconnect()
  }, [observe, disconnect])

  // Attempt reobserve if ref element changes
  useEffect(() => {
    if (!elementRef.current) return
    observe()
  }, [observe])

  return { ref: elementRef, isVisible, refresh }
}
