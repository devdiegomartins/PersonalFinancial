import React from 'react'
import { cn } from '~/ui/utils'
import { buttonVariants } from './ButtonStyles'
import type { ButtonProps, ButtonRef } from './ButtonTypes'

// NOTE: cn is intentionally left as-is per user instruction.

const Button = React.forwardRef<ButtonRef, ButtonProps>(
  ({ className, variant, size, element = 'button', ...props }, ref) => {
    const Component = element
    if (Component === 'a') {
      const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>
      return (
        <a
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...anchorProps}
        />
      )
    }
    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...buttonProps}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
