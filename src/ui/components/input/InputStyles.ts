import { cva } from 'class-variance-authority'

export const inputVariants = cva(
  'flex w-full rounded-md border bg-slate-800/50 backdrop-blur-sm px-3 py-2 text-neutral-200 transition-all duration-200 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 readonly:cursor-default readonly:opacity-75',
  {
    variants: {
      variant: {
        default:
          'border-slate-600/50 shadow-sm shadow-slate-950/20 hover:shadow-md hover:shadow-slate-950/30 hover:border-slate-500/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-400 focus-visible:shadow-lg focus-visible:shadow-slate-950/40 focus-visible:border-slate-400/70',
        primary:
          'border-amber-600/50 shadow-sm shadow-amber-950/20 hover:shadow-md hover:shadow-amber-950/30 hover:border-amber-500/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400 focus-visible:shadow-lg focus-visible:shadow-amber-950/40 focus-visible:border-amber-400/70',
        secondary:
          'border-blue-600/50 shadow-sm shadow-blue-950/20 hover:shadow-md hover:shadow-blue-950/30 hover:border-blue-500/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400 focus-visible:shadow-lg focus-visible:shadow-blue-950/40 focus-visible:border-blue-400/70',
        success:
          'border-green-600/50 shadow-sm shadow-green-950/20 hover:shadow-md hover:shadow-green-950/30 hover:border-green-500/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-400 focus-visible:shadow-lg focus-visible:shadow-green-950/40 focus-visible:border-green-400/70',
        warning:
          'border-orange-600/50 shadow-sm shadow-orange-950/20 hover:shadow-md hover:shadow-orange-950/30 hover:border-orange-500/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-400 focus-visible:shadow-lg focus-visible:shadow-orange-950/40 focus-visible:border-orange-400/70',
        danger:
          'border-red-600/50 shadow-sm shadow-red-950/20 hover:shadow-md hover:shadow-red-950/30 hover:border-red-500/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-400 focus-visible:shadow-lg focus-visible:shadow-red-950/40 focus-visible:border-red-400/70',
        info: 'border-cyan-600/50 shadow-sm shadow-cyan-950/20 hover:shadow-md hover:shadow-cyan-950/30 hover:border-cyan-500/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400 focus-visible:shadow-lg focus-visible:shadow-cyan-950/40 focus-visible:border-cyan-400/70',
        accent:
          'border-violet-600/50 shadow-sm shadow-violet-950/20 hover:shadow-md hover:shadow-violet-950/30 hover:border-violet-500/60 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-400 focus-visible:shadow-lg focus-visible:shadow-violet-950/40 focus-visible:border-violet-400/70',
      },
      state: {
        default: '',
        success: 'border-green-500/70 ring-1 ring-inset ring-green-400/20',
        warning: 'border-orange-500/70 ring-1 ring-inset ring-orange-400/20',
        danger: 'border-red-500/70 ring-1 ring-inset ring-red-400/20',
        info: 'border-cyan-500/70 ring-1 ring-inset ring-cyan-400/20',
      },
      size: {
        sm: 'h-8 px-2',
        default: 'h-10 px-3',
        lg: 'h-12 px-4',
      },
      fontSize: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
      },
      hasIcon: {
        true: 'pl-10',
        false: '',
      },
      hasPrepend: {
        true: 'pl-0',
        false: '',
      },
      hasAppend: {
        true: 'pr-0',
        false: '',
      },
      hasPasswordToggle: {
        true: 'pr-10',
        false: '',
      },
    },
    compoundVariants: [
      {
        hasIcon: true,
        hasPrepend: true,
        class: 'pl-0', // Prepend overrides icon padding
      },
      {
        hasAppend: true,
        hasPasswordToggle: true,
        class: 'pr-0', // Append overrides password toggle padding
      },
    ],
    defaultVariants: {
      variant: 'default',
      state: 'default',
      size: 'default',
      fontSize: 'sm',
      hasIcon: false,
      hasPrepend: false,
      hasAppend: false,
      hasPasswordToggle: false,
    },
  }
)

export const inputWrapperVariants = cva('relative flex items-center w-full', {
  variants: {
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

export const inputIconVariants = cva(
  'absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-gray-500 dark:text-gray-400',
  {
    variants: {
      size: {
        sm: '[&_svg]:size-3',
        default: '[&_svg]:size-4',
        lg: '[&_svg]:size-5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

export const inputPrependVariants = cva(
  'flex items-center border-r bg-slate-700/50 px-3 text-slate-300',
  {
    variants: {
      size: {
        sm: 'h-8 text-xs',
        default: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
      variant: {
        default: 'border-slate-600/50 bg-slate-700/50',
        primary: 'border-amber-600/50 bg-amber-900/30',
        secondary: 'border-blue-600/50 bg-blue-900/30',
        success: 'border-green-600/50 bg-green-900/30',
        warning: 'border-orange-600/50 bg-orange-900/30',
        danger: 'border-red-600/50 bg-red-900/30',
        info: 'border-cyan-600/50 bg-cyan-900/30',
        accent: 'border-violet-600/50 bg-violet-900/30',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
)

export const inputAppendVariants = cva(
  'flex items-center border-l bg-slate-700/50 px-3 text-slate-300',
  {
    variants: {
      size: {
        sm: 'h-8 text-xs',
        default: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
      variant: {
        default: 'border-slate-600/50 bg-slate-700/50',
        primary: 'border-amber-600/50 bg-amber-900/30',
        secondary: 'border-blue-600/50 bg-blue-900/30',
        success: 'border-green-600/50 bg-green-900/30',
        warning: 'border-orange-600/50 bg-orange-900/30',
        danger: 'border-red-600/50 bg-red-900/30',
        info: 'border-cyan-600/50 bg-cyan-900/30',
        accent: 'border-violet-600/50 bg-violet-900/30',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
)

export const inputSkeletonVariants = cva('animate-pulse rounded-md', {
  variants: {
    size: {
      sm: 'h-8',
      default: 'h-10',
      lg: 'h-12',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export const passwordToggleVariants = cva(
  'absolute right-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-slate-400 hover:text-slate-300 transition-colors duration-150 focus:outline-none focus:text-slate-300',
  {
    variants: {
      size: {
        sm: '[&_svg]:size-3',
        default: '[&_svg]:size-4',
        lg: '[&_svg]:size-5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

export const helperTextVariants = cva('mt-1.5 text-sm leading-tight', {
  variants: {
    state: {
      default: 'text-slate-400',
      success: 'text-emerald-400',
      warning: 'text-amber-400',
      danger: 'text-red-400',
      info: 'text-sky-400',
    },
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    state: 'default',
    size: 'default',
  },
})
