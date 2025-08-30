import { cva } from 'class-variance-authority'

// Centralize transition & layout primitives; icon sizing via descendent selector
export const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-white dark:ring-offset-gray-900 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 select-none cursor-pointer disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        // Primary: flat blue tone with strong hover and white text for contrast
        default: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
        success:
          'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500',
        warning:
          'bg-amber-500 text-black hover:bg-amber-600 focus-visible:ring-amber-500',
        accent:
          'bg-violet-600 text-white hover:bg-violet-700 focus-visible:ring-violet-500',
        // Secondary: red ↔ pink gradient blend with white text
        secondary:
          'bg-gradient-to-r from-rose-500 via-pink-500 to-red-600 text-white hover:from-rose-600 hover:via-pink-600 hover:to-red-700 focus-visible:ring-rose-400',
        outline:
          'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-300',
        subtle:
          'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-700',
        elevated:
          'bg-white text-gray-900 shadow-sm hover:shadow-md hover:bg-gray-50 border border-gray-200 transition-shadow dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-600',
        ghost:
          'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white focus-visible:ring-gray-200 dark:focus-visible:ring-gray-700',
        link: 'text-blue-600 underline-offset-4 hover:underline shadow-none px-0 h-auto dark:text-blue-400 focus-visible:ring-transparent',
        gradient:
          'text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:brightness-110 focus-visible:ring-indigo-500',
        'gradient-success':
          'text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:brightness-110 focus-visible:ring-emerald-500',
        'gradient-warning':
          'text-neutral-900 bg-gradient-to-r from-amber-400 to-orange-600 hover:brightness-110 focus-visible:ring-amber-500',
      },
      size: {
        xs: 'h-8 px-3 text-xs',
        sm: 'h-9 px-3 text-sm',
        default: 'h-10 px-4 text-sm',
        lg: 'h-11 px-6 text-base',
        xl: 'h-12 px-8 text-base',
        icon: 'h-10 w-10 [&_svg]:size-5',
        'icon-sm': 'h-8 w-8 [&_svg]:size-4',
        'icon-lg': 'h-12 w-12 [&_svg]:size-6',
      },
      shape: {
        default: '',
        pill: 'rounded-full',
        square: 'aspect-square p-0',
      },
      loading: {
        true: 'cursor-wait',
        false: '',
      },
    },
    compoundVariants: [
      // Ensure link variant ignores height padding unless icon-size
      { variant: 'link', size: 'icon', class: 'h-10 w-auto px-0' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
      loading: false,
    },
  }
)
