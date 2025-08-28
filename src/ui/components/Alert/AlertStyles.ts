import { cva } from 'class-variance-authority'

export const alertVariants = cva('relative w-full rounded-lg border flex flex-col p-4', {
  variants: {
    variant: {
      success: '',
      danger: '',
      warning: '',
      info: '',
    },
    size: {},
  },
  defaultVariants: {},
})
