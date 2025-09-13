import { cva } from 'class-variance-authority'

export const tooltipVariants = cva(
  'rounded-md px-2 py-1 text-sm font-medium shadow-lg border backdrop-blur-sm z-tooltip select-text w-max',
  {
    variants: {
      variant: {
        // Primary dark theme with white text
        default: 'bg-gray-900/95 text-white border-gray-700/50',
        // Primary blue theme matching button primary
        primary: 'bg-blue-600/95 text-white border-blue-500/50',
        // Light theme with dark text
        light: 'bg-white/95 text-gray-900 border-gray-200/50',
        // Accent colors
        success: 'bg-green-600/95 text-white border-green-500/50',
        warning: 'bg-amber-500/95 text-black border-amber-400/50',
        destructive: 'bg-red-600/95 text-white border-red-500/50',
        accent: 'bg-violet-600/95 text-white border-violet-500/50',
        // Subtle variants
        subtle:
          'bg-gray-100/95 text-gray-800 border-gray-300/50 dark:bg-gray-800/95 dark:text-gray-100 dark:border-gray-700/50',
        // Inverse colors
        inverse:
          'bg-white/95 text-gray-900 border-gray-200/50 dark:bg-gray-900/95 dark:text-white dark:border-gray-700/50',
      },
      size: {
        xs: 'px-1.5 py-0.5 text-xs max-w-40',
        sm: 'px-2 py-1 text-xs max-w-56',
        default: 'px-2 py-1 text-sm max-w-72',
        lg: 'px-3 py-1.5 text-sm max-w-80',
        xl: 'px-4 py-2 text-base max-w-96',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export const tooltipArrowVariants = cva('absolute w-2 h-2 rotate-45 border', {
  variants: {
    variant: {
      default: 'bg-gray-900/95 border-gray-700/50',
      primary: 'bg-blue-600/95 border-blue-500/50',
      light: 'bg-white/95 border-gray-200/50',
      success: 'bg-green-600/95 border-green-500/50',
      warning: 'bg-amber-500/95 border-amber-400/50',
      destructive: 'bg-red-600/95 border-red-500/50',
      accent: 'bg-violet-600/95 border-violet-500/50',
      subtle:
        'bg-gray-100/95 border-gray-300/50 dark:bg-gray-800/95 dark:border-gray-700/50',
      inverse:
        'bg-white/95 border-gray-200/50 dark:bg-gray-900/95 dark:border-gray-700/50',
    },
    position: {
      top: '-bottom-1 left-1/2 -translate-x-1/2 border-b-0 border-r-0',
      bottom: '-top-1 left-1/2 -translate-x-1/2 border-t-0 border-l-0',
      left: '-right-1 top-1/2 -translate-y-1/2 border-t-0 border-r-0',
      right: '-left-1 top-1/2 -translate-y-1/2 border-b-0 border-l-0',
    },
  },
  defaultVariants: {
    variant: 'default',
    position: 'bottom',
  },
})
