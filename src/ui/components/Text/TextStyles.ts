import { cva } from 'class-variance-authority'

export const textStyles = cva('antialiased', {
  variants: {
    style: {
      heading64: 'text-4xl font-bold',
      heading32: 'text-2xl font-bold',
      heading16: 'text-lg font-bold',
      body: 'text-base',
      caption: 'text-sm text-gray-500',
    },
  },
  defaultVariants: {
    style: 'body',
  },
})
