import { cva } from 'class-variance-authority'

export const progressWrapperVariants = cva('relative inline-flex select-none', {
  variants: {
    variant: {
      bar: 'w-full',
      circular: 'align-middle',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'bar',
    size: 'md',
  },
})

export const barTrackVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-3.5',
      },
    },
    defaultVariants: { size: 'md' },
  }
)

export const barIndicatorVariants = cva(
  'h-full rounded-full transition-[width] duration-300 ease-out',
  {
    variants: {
      tone: {
        primary: 'bg-blue-600',
        accent: 'bg-violet-600',
        success: 'bg-green-600',
        warning: 'bg-amber-500',
        destructive: 'bg-red-600',
        muted: 'bg-gray-400 dark:bg-gray-500',
      },
    },
    defaultVariants: { tone: 'primary' },
  }
)

export const circularSizeVariants: Record<string, { size: number; stroke: number }> = {
  sm: { size: 28, stroke: 3 },
  md: { size: 40, stroke: 4 },
  lg: { size: 56, stroke: 5 },
}

export const circularToneClasses: Record<string, string> = {
  primary: 'text-blue-600',
  accent: 'text-violet-600',
  success: 'text-green-600',
  warning: 'text-amber-500',
  destructive: 'text-red-600',
  muted: 'text-gray-400 dark:text-gray-500',
}
