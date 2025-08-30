import { cva } from 'class-variance-authority'

export const skeletonVariants = cva(
  'relative inline-block overflow-hidden bg-gray-200 dark:bg-gray-700 select-none rounded-md',
  {
    variants: {
      shape: {
        rect: '',
        pill: 'rounded-full',
        circle: 'rounded-full aspect-square',
      },
      animation: {
        pulse: 'animate-pulse',
        none: '',
      },
      tone: {
        default: '',
        muted: 'bg-gray-100 dark:bg-gray-800',
        contrast: 'bg-gray-300 dark:bg-gray-600',
      },
    },
    defaultVariants: {
      shape: 'rect',
      animation: 'pulse',
      tone: 'default',
    },
  }
)
