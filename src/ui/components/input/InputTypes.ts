import type { VariantProps } from 'class-variance-authority'
import type { InputHTMLAttributes, ReactNode } from 'react'
import type { IconsNames } from '../Icon/IconTypes'
import type {
  helperTextVariants,
  inputAppendVariants,
  inputIconVariants,
  inputPrependVariants,
  inputSkeletonVariants,
  inputVariants,
  inputWrapperVariants,
  passwordToggleVariants,
} from './InputStyles'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Icon to display on the left side of the input */
  icon?: IconsNames
  /** Element to prepend to the input (overrides icon if both are provided) */
  prepend?: ReactNode
  /** Element to append to the input */
  append?: ReactNode
  /** Whether the input is in a loading state (shows skeleton) */
  isLoading?: boolean
  /** Whether to show password toggle button for password type inputs */
  showPasswordToggle?: boolean
  /** Helper text to display below the input */
  helperText?: ReactNode
  /** Label text to display above the input */
  label?: ReactNode
  /** Custom className for the input element */
  className?: string
  /** Custom className for the wrapper container */
  wrapperClassName?: string
  /** Custom className for the label */
  labelClassName?: string
  /** Custom className for the helper text */
  helperClassName?: string
}

export type InputWrapperProps = VariantProps<typeof inputWrapperVariants>
export type InputIconProps = VariantProps<typeof inputIconVariants>
export type InputPrependProps = VariantProps<typeof inputPrependVariants>
export type InputAppendProps = VariantProps<typeof inputAppendVariants>
export type InputSkeletonProps = VariantProps<typeof inputSkeletonVariants>
export type PasswordToggleProps = VariantProps<typeof passwordToggleVariants>
export type HelperTextProps = VariantProps<typeof helperTextVariants>
