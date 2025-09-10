import { cva } from 'class-variance-authority'

export const boxVariants = cva(
  'relative rounded-lg transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900',
  {
    variants: {
      variant: {
        default:
          'bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:bg-slate-700/60 hover:border-slate-600/60 focus-visible:ring-slate-400',
        primary:
          'bg-amber-900/30 backdrop-blur-sm border border-amber-700/40 hover:bg-amber-800/40 hover:border-amber-600/50 focus-visible:ring-amber-400',
        secondary:
          'bg-blue-900/30 backdrop-blur-sm border border-blue-700/40 hover:bg-blue-800/40 hover:border-blue-600/50 focus-visible:ring-blue-400',
        success:
          'bg-green-900/30 backdrop-blur-sm border border-green-700/40 hover:bg-green-800/40 hover:border-green-600/50 focus-visible:ring-green-400',
        warning:
          'bg-orange-900/30 backdrop-blur-sm border border-orange-700/40 hover:bg-orange-800/40 hover:border-orange-600/50 focus-visible:ring-orange-400',
        danger:
          'bg-red-900/30 backdrop-blur-sm border border-red-700/40 hover:bg-red-800/40 hover:border-red-600/50 focus-visible:ring-red-400',
        info: 'bg-cyan-900/30 backdrop-blur-sm border border-cyan-700/40 hover:bg-cyan-800/40 hover:border-cyan-600/50 focus-visible:ring-cyan-400',
        accent:
          'bg-violet-900/30 backdrop-blur-sm border border-violet-700/40 hover:bg-violet-800/40 hover:border-violet-600/50 focus-visible:ring-violet-400',
        transparent: 'bg-transparent border border-transparent',
        elevated:
          'bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 shadow-lg shadow-slate-950/20 hover:bg-slate-700/80 hover:border-slate-500/60 hover:shadow-xl hover:shadow-slate-950/30 focus-visible:ring-slate-400',
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
