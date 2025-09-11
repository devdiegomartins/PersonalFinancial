import { cva } from 'class-variance-authority'

export const boxVariants = cva(
  'relative rounded-lg transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
  {
    variants: {
      variant: {
        default: 'bg-slate-800/60 backdrop-blur-sm border border-slate-700/50',
        primary: 'bg-amber-900/30 backdrop-blur-sm border border-amber-700/40',
        secondary: 'bg-blue-900/30 backdrop-blur-sm border border-blue-700/40',
        success: 'bg-green-900/30 backdrop-blur-sm border border-green-700/40',
        warning: 'bg-orange-900/30 backdrop-blur-sm border border-orange-700/40',
        danger: 'bg-red-900/30 backdrop-blur-sm border border-red-700/40',
        info: 'bg-cyan-900/30 backdrop-blur-sm border border-cyan-700/40',
        accent: 'bg-violet-900/30 backdrop-blur-sm border border-violet-700/40',
        transparent: 'bg-transparent border border-transparent',
        elevated:
          'bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 shadow-lg shadow-slate-950/20',
      },
      size: {
        xs: 'p-2',
        sm: 'p-3',
        default: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
        none: 'p-0',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        default: 'rounded-lg',
        lg: 'rounded-xl',
        xl: 'rounded-2xl',
        full: 'rounded-full',
      },
      interactive: {
        true: 'cursor-pointer select-none',
        false: '',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    compoundVariants: [
      // Remove hover effects when disabled
      {
        disabled: true,
        class: 'hover:bg-slate-800/60 hover:border-slate-700/50',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      radius: 'default',
      interactive: false,
      disabled: false,
    },
  }
)
