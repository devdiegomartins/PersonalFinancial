import React from 'react'
import { cn } from '~/ui/utils'
import { labelVariants, requiredIndicatorVariants } from './LabelStyles'
import type { LabelProps } from './LabelTypes'

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      className,
      size,
      state,
      weight,
      disabled,
      required,
      requiredIndicator = '*',
      children,
      htmlFor,
      ...rest
    },
    ref
  ) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn(labelVariants({ size, state, weight, disabled }), className)}
        {...rest}
      >
        {children}
        {required && (
          <span className={cn(requiredIndicatorVariants({ size }))}>
            {requiredIndicator}
          </span>
        )}
      </label>
    )
  }
)

Label.displayName = 'Label'

export { Label }
