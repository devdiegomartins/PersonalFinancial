import { cva } from 'class-variance-authority'

export const labelVariants = cva(
  'inline-block font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
      state: {
        default: 'text-neutral-200',
        success: 'text-emerald-400',
        warning: 'text-amber-400',
        danger: 'text-red-400',
        info: 'text-sky-400',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      state: 'default',
      weight: 'medium',
      disabled: false,
    },
  }
)

export const requiredIndicatorVariants = cva('ml-1 text-red-400', {
  variants: {
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})
