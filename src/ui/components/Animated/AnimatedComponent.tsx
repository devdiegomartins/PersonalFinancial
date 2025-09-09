import { AnimatePresence, motion } from 'framer-motion'
import React, { useId, useMemo } from 'react'
import { useElementVisibility } from '~/shared/hooks/useElementVisibility/useElementVisibility'
import { cn } from '~/ui/utils'
import { animatedBase } from './AnimatedStyles'
import type {
  AnimatedProps,
  AnimatedRef,
  EnteringPreset,
  ExitingPreset,
} from './AnimatedTypes'

/**
 * Animated component centralizes common enter / exit animation presets built on framer-motion.
 * It conditionally mounts children when visible; unmount triggers exit animation.
 */
export const Animated = React.forwardRef<AnimatedRef, AnimatedProps>(
  (
    {
      children,
      entering,
      exiting,
      transition,
      delay = 0,
      className,
      visible = true,
      role,
      as: Tag = 'div',
      enteringDuration,
      exitingDuration,
      enteringDelay,
      exitingDelay,
      zIndex,
      key_extractor,
      onlyWhenVisible = false,
    },
    ref
  ) => {
    // Fallbacks: if only entering provided reuse its exit; or default fade.
    const defaultFade: EnteringPreset & ExitingPreset = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }

    const inPreset = entering || defaultFade
    const outPreset = exiting || entering || defaultFade

    const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

    // internal id for key generation
    const internalId = useId()
    const finalKey = useMemo(
      () =>
        typeof key_extractor === 'function' ? key_extractor(internalId) : internalId,
      [key_extractor, internalId]
    )

    // Build separate transitions so exit can differ.
    const baseEnter = {
      duration:
        enteringDuration ?? transition?.duration ?? inPreset.transition?.duration ?? 0.35,
      delay: enteringDelay ?? delay,
      ease: inPreset.transition?.ease || transition?.ease || easeOut,
    }
    const baseExit = {
      duration:
        exitingDuration ?? transition?.duration ?? outPreset.transition?.duration ?? 0.25,
      delay: exitingDelay ?? 0,
      ease: outPreset.transition?.ease || transition?.ease || easeOut,
    }

    // merge any provided transition stuff (except duration/delay we've overridden explicitly)
    const enterTransition = { ...transition, ...inPreset.transition, ...baseEnter }
    const exitTransition = { ...transition, ...outPreset.transition, ...baseExit }

    // Select motion.* element dynamically
    const motionRecord = motion as unknown as Record<
      string,
      React.ComponentType<Record<string, unknown>>
    >
    const MotionEl = motionRecord[Tag as string] || motion.div

    let exitVariant = outPreset.exit as unknown
    if (
      exitVariant &&
      typeof exitVariant === 'object' &&
      !Array.isArray(exitVariant) &&
      (exitVariant as Record<string, unknown>)
    ) {
      exitVariant = { ...(exitVariant as object), transition: exitTransition }
    }

    // Visibility gating ----------------------------------------------------
    const { ref: visibilityRef, isVisible } = useElementVisibility({ once: true })
    const shouldRender = visible && (!onlyWhenVisible || isVisible)

    return (
      <AnimatePresence mode="wait">
        {shouldRender && (
          <MotionEl
            key={finalKey}
            ref={(node: HTMLElement | null) => {
              // forward ref
              if (typeof ref === 'function') ref(node as AnimatedRef)
              else if (ref)
                (ref as React.MutableRefObject<AnimatedRef | null>).current =
                  node as unknown as AnimatedRef | null
                // observe
              ;(visibilityRef as React.MutableRefObject<HTMLElement | null>).current =
                node as HTMLElement
            }}
            className={cn(animatedBase(), className)}
            role={role}
            style={zIndex !== undefined ? { zIndex } : undefined}
            initial={inPreset.initial}
            animate={inPreset.animate}
            exit={exitVariant}
            transition={enterTransition}
          >
            {children}
          </MotionEl>
        )}
      </AnimatePresence>
    )
  }
)

Animated.displayName = 'Animated'

export default Animated
