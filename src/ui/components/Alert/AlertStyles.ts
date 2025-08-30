import { cva } from 'class-variance-authority'

export const alertVariants = cva(
  'relative w-full rounded-3xl border flex flex-col p-4 gap-3',
  {
    variants: {
      variant: {
        success: 'text-green-500 bg-green-500/10 border-green-800',
        danger: 'text-red-500 bg-red-500/10 border-red-800',
        warning: 'text-orange-500 bg-orange-500/10 border-orange-800',
        info: 'text-cyan-500 bg-cyan-500/10 border-cyan-800',
      },
    },
  }
)
