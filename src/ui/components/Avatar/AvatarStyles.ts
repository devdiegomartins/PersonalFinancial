import { cva } from 'class-variance-authority'

export const avatarVariants = cva(
  'relative inline-flex items-center justify-center overflow-hidden font-medium select-none shrink-0 aspect-square',
  {
    variants: {
      size: {
        xs: 'h-8 w-8 text-xs',
        sm: 'h-10 w-10 text-sm',
        default: 'h-12 w-12 text-base',
        lg: 'h-16 w-16 text-lg',
        xl: 'h-20 w-20 text-xl',
        '2xl': 'h-24 w-24 text-2xl',
        '3xl': 'h-32 w-32 text-3xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-2xl',
      },
      variant: {
        default: 'bg-slate-700 text-white',
        primary: 'bg-amber-500 text-neutral-800',
        secondary: 'bg-blue-500 text-white',
        success: 'bg-green-700 text-white',
        warning: 'bg-orange-600 text-neutral-800',
        danger: 'bg-red-700 text-white',
        info: 'bg-blue-300 text-neutral-800',
        accent: 'bg-violet-600 text-white',
      },
    },
    defaultVariants: {
      size: 'default',
      shape: 'circle',
      variant: 'default',
    },
  }
)

export const avatarImageVariants = cva(
  'absolute inset-0 bg-cover bg-center bg-no-repeat',
  {
    variants: {
      shape: {
        circle: 'rounded-full',
        square: 'rounded-2xl',
      },
    },
    defaultVariants: {
      shape: 'circle',
    },
  }
)

export const avatarInitialsVariants = cva(
  'relative z-10 font-semibold uppercase tracking-wide',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        default: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

export const avatarIconVariants = cva('relative z-10', {
  variants: {
    size: {
      xs: '[&_svg]:size-4',
      sm: '[&_svg]:size-5',
      default: '[&_svg]:size-6',
      lg: '[&_svg]:size-8',
      xl: '[&_svg]:size-10',
      '2xl': '[&_svg]:size-12',
      '3xl': '[&_svg]:size-14',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})
