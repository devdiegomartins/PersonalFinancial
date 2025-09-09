import { cva } from 'class-variance-authority'

// Minimal styling; mostly acts as a passthrough container. Variants reserved for future.
export const animatedBase = cva('relative inline-block will-change-transform')
