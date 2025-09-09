import type { MotionProps, Transition } from 'framer-motion'
import type { ReactNode } from 'react'

// A lightweight interface describing an animation preset with initial / animate / exit states.
export interface AnimationPreset {
  initial: MotionProps['initial']
  animate: MotionProps['animate']
  exit: MotionProps['exit']
  transition?: Transition
}

const preset = (cfg: AnimationPreset): AnimationPreset => cfg

// Distance constant (px) for directional animations.
const D = 24

// Entering presets ---------------------------------------------------------
export const FadeIn = preset({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
})
export const FadeInLeft = preset({
  initial: { opacity: 0, x: -D },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -D / 2 },
})
export const FadeInRight = preset({
  initial: { opacity: 0, x: D },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: D / 2 },
})
export const FadeInTop = preset({
  initial: { opacity: 0, y: -D },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -D / 2 },
})
export const FadeInBottom = preset({
  initial: { opacity: 0, y: D },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: D / 2 },
})
export const SlideIn = preset({
  initial: { opacity: 0, y: D },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: D },
})
export const SlideInRight = preset({
  initial: { opacity: 0, x: D },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: D },
})
export const SlideInTop = preset({
  initial: { opacity: 0, y: -D },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -D },
})
export const SlideInBottom = preset({
  initial: { opacity: 0, y: D },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: D },
})

// Exiting presets ----------------------------------------------------------
export const FadeOut = preset({
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
})
export const FadeOutLeft = preset({
  initial: { opacity: 1, x: 0 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -D },
})
export const FadeOutRight = preset({
  initial: { opacity: 1, x: 0 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: D },
})
export const FadeOutTop = preset({
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -D },
})
export const FadeOutBottom = preset({
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: D },
})
export const SlideOut = preset({
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: D },
})
export const SlideOutRight = preset({
  initial: { opacity: 1, x: 0 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: D },
})
export const SlideOutTop = preset({
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -D },
})
export const SlideOutBottom = preset({
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: D },
})

// Union types for better inference in consumer code.
export type EnteringPreset =
  | typeof FadeIn
  | typeof FadeInLeft
  | typeof FadeInRight
  | typeof FadeInTop
  | typeof FadeInBottom
  | typeof SlideIn
  | typeof SlideInRight
  | typeof SlideInTop
  | typeof SlideInBottom

export type ExitingPreset =
  | typeof FadeOut
  | typeof FadeOutLeft
  | typeof FadeOutRight
  | typeof FadeOutTop
  | typeof FadeOutBottom
  | typeof SlideOut
  | typeof SlideOutRight
  | typeof SlideOutTop
  | typeof SlideOutBottom

export interface AnimatedProps {
  children: ReactNode
  entering?: EnteringPreset
  exiting?: ExitingPreset
  transition?: Transition
  delay?: number
  className?: string
  visible?: boolean
  role?: string
  /** HTML tag to render (polymorphic). Default 'div'. */
  as?: keyof JSX.IntrinsicElements
  /** Duration (s) for entering animation override. */
  enteringDuration?: number
  /** Duration (s) for exiting animation override. */
  exitingDuration?: number
  /** Delay (s) before entering starts (overrides delay for enter). */
  enteringDelay?: number
  /** Delay (s) before exit starts. */
  exitingDelay?: number
  /** Stacking context. Applied via style.zIndex */
  zIndex?: number
  /** Custom key generator. Receives internally generated stable id and returns final unique key. */
  key_extractor?: (internalId: string) => string
  /** When true, the animation will only mount and play when the element first becomes visible in the viewport (IntersectionObserver). */
  onlyWhenVisible?: boolean
}

export type AnimatedRef = HTMLDivElement

export const enteringPresets: Record<string, EnteringPreset> = {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeInTop,
  FadeInBottom,
  SlideIn,
  SlideInRight,
  SlideInTop,
  SlideInBottom,
}

export const exitingPresets: Record<string, ExitingPreset> = {
  FadeOut,
  FadeOutLeft,
  FadeOutRight,
  FadeOutTop,
  FadeOutBottom,
  SlideOut,
  SlideOutRight,
  SlideOutTop,
  SlideOutBottom,
}

export type EnteringPresetName = keyof typeof enteringPresets
export type ExitingPresetName = keyof typeof exitingPresets
