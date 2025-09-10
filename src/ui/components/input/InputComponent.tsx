import React, { useId, useState } from 'react'
import { cn } from '~/ui/utils'
import { Icon } from '../Icon/IconComponent'
import { Label } from '../Label/LabelComponent'
import { Skeleton } from '../Skeleton/SkeletonComponent'
import { Text } from '../Text/TextComponent'
import {
  helperTextVariants,
  inputAppendVariants,
  inputIconVariants,
  inputPrependVariants,
  inputSkeletonVariants,
  inputVariants,
  inputWrapperVariants,
  passwordToggleVariants,
} from './InputStyles'
import type { InputProps } from './InputTypes'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      labelClassName,
      helperClassName,
      variant,
      state,
      size,
      fontSize,
      icon,
      prepend,
      append,
      isLoading,
      showPasswordToggle = true,
      helperText,
      label,
      disabled,
      readOnly,
      required,
      id,
      type,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)
    const generatedId = useId()
    const inputId = id || generatedId

    const isPasswordType = type === 'password'
    const hasIcon = Boolean(icon && !prepend)
    const hasPrepend = Boolean(prepend)
    const hasAppend = Boolean(append)
    const hasPasswordToggle = Boolean(isPasswordType && showPasswordToggle && !append)

    // Determine the effective variant based on state
    const effectiveVariant = state && state !== 'default' ? state : variant

    // Update input type based on password visibility
    React.useEffect(() => {
      if (isPasswordType) {
        setInputType(showPassword ? 'text' : 'password')
      } else {
        setInputType(type)
      }
    }, [showPassword, isPasswordType, type])

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    if (isLoading) {
      return (
        <div className="space-y-2">
          {label && <Skeleton className="h-4 w-20 bg-slate-700/50" decorative />}
          <div className={cn(inputWrapperVariants({ disabled }), wrapperClassName)}>
            <Skeleton
              className={cn(inputSkeletonVariants({ size }), 'w-full bg-slate-700/50')}
              decorative
            />
          </div>
          {helperText && <Skeleton className="h-3 w-32 bg-slate-700/50" decorative />}
        </div>
      )
    }

    return (
      <div className="space-y-2">
        {/* Label */}
        {label && (
          <Label
            htmlFor={inputId}
            size={size}
            state={state}
            required={required}
            disabled={disabled}
            className={labelClassName}
          >
            {label}
          </Label>
        )}

        {/* Input wrapper */}
        <div className={cn(inputWrapperVariants({ disabled }), wrapperClassName)}>
          {/* Prepend element */}
          {prepend && (
            <div
              className={cn(
                inputPrependVariants({ size, variant: effectiveVariant }),
                'rounded-l-md first:rounded-l-md'
              )}
            >
              {prepend}
            </div>
          )}

          {/* Icon (only shown if no prepend) */}
          {hasIcon && icon && (
            <span className={cn(inputIconVariants({ size }))}>
              <Icon name={icon} />
            </span>
          )}

          {/* Input element */}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={cn(
              inputVariants({
                variant: effectiveVariant,
                state,
                size,
                fontSize,
                hasIcon,
                hasPrepend,
                hasAppend,
                hasPasswordToggle,
              }),
              // Adjust border radius based on prepend/append
              hasPrepend && !hasAppend && 'rounded-l-none',
              hasAppend && !hasPrepend && 'rounded-r-none',
              hasPrepend && hasAppend && 'rounded-none',
              className
            )}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            {...rest}
          />

          {/* Password toggle button */}
          {hasPasswordToggle && (
            <button
              type="button"
              className={cn(passwordToggleVariants({ size }))}
              onClick={togglePasswordVisibility}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <Icon name={showPassword ? 'RiEyeOffLine' : 'RiEyeLine'} />
            </button>
          )}

          {/* Append element */}
          {append && (
            <div
              className={cn(
                inputAppendVariants({ size, variant: effectiveVariant }),
                'rounded-r-md last:rounded-r-md'
              )}
            >
              {append}
            </div>
          )}
        </div>

        {/* Helper text */}
        {helperText && (
          <Text
            style="bodySmall"
            tone={
              state === 'danger'
                ? 'danger'
                : state === 'warning'
                  ? 'warning'
                  : state === 'success'
                    ? 'success'
                    : state === 'info'
                      ? 'info'
                      : 'muted'
            }
            className={cn(helperTextVariants({ state, size }), helperClassName)}
          >
            {helperText}
          </Text>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
