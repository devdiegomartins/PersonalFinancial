import { cva } from 'class-variance-authority'

export const spinnerVariants = cva('inline-block animate-spin text-current', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
    },
    tone: {
      inherit: '',
      primary: 'text-blue-600 dark:text-blue-500',
      accent: 'text-violet-600 dark:text-violet-500',
      success: 'text-green-600 dark:text-green-500',
      warning: 'text-amber-500 dark:text-amber-400',
      destructive: 'text-red-600 dark:text-red-500',
      muted: 'text-gray-400 dark:text-gray-500',
      white: 'text-white',
    },
  },
  defaultVariants: {
    size: 'sm',
    tone: 'inherit',
  },
})
