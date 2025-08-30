import { cva } from 'class-variance-authority'

export const textStyles = cva('antialiased leading-snug', {
  variants: {
    style: {
      display: 'text-5xl font-bold tracking-tight',
      heading64: 'text-4xl font-bold tracking-tight',
      heading48: 'text-3xl font-bold tracking-tight',
      heading32: 'text-2xl font-bold',
      heading24: 'text-xl font-semibold',
      heading16: 'text-lg font-semibold',
      subtitle: 'text-base font-medium tracking-wide',
      bodyLarge: 'text-lg',
      body: 'text-base',
      bodySmall: 'text-sm',
      caption: 'text-xs',
      overline: 'text-[10px] uppercase tracking-widest font-medium',
      code: 'font-mono text-sm px-1 py-0.5 rounded bg-neutral-800/60',
      mono: 'font-mono text-sm',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    tone: {
      default: 'text-neutral-200',
      muted: 'text-neutral-400',
      subtle: 'text-neutral-500',
      danger: 'text-red-400',
      warning: 'text-amber-400',
      success: 'text-emerald-400',
      info: 'text-sky-400',
      inverted: 'text-white',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    transform: {
      none: '',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    },
    italic: { true: 'italic', false: '' },
    underline: { true: 'underline underline-offset-2', false: '' },
    strike: { true: 'line-through', false: '' },
    truncate: { true: 'truncate', false: '' },
  },
  compoundVariants: [
    // Ensure code style readability
    { style: 'code', tone: 'default', class: 'text-neutral-100' },
  ],
  defaultVariants: {
    style: 'body',
    weight: 'regular',
    tone: 'default',
    align: 'left',
    transform: 'none',
    italic: false,
    underline: false,
    strike: false,
    truncate: false,
  },
})
