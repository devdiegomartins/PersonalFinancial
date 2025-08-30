import React from 'react'
import { cn } from '~/ui/utils'
import { Skeleton } from '../Skeleton/SkeletonComponent'
import { Spinner } from '../Spinner/SpinnerComponent'
import { buttonVariants } from './ButtonStyles'
import type { ButtonProps, ButtonRef } from './ButtonTypes'

const Button = React.forwardRef<ButtonRef, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      element = 'button',
      isLoading,
      isFetching,
      fullWidth,
      startIcon,
      endIcon,
      children,
      ...rest
    },
    ref
  ) => {
    const classes = cn(
      buttonVariants({ variant, size, shape, loading: !!isLoading }),
      fullWidth && 'w-full',
      className
    )

    const content = (
      <>
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner
              size={size?.startsWith('icon') ? 'md' : 'sm'}
              tone="inherit"
              label="Carregando"
              className={cn(size?.startsWith('icon') && 'size-5')}
            />
          </span>
        )}
        <span
          className={cn(
            'inline-flex items-center gap-2',
            (isLoading || isFetching) && 'opacity-0'
          )}
        >
          {startIcon && <span className="-ml-1 flex items-center">{startIcon}</span>}
          {children}
          {endIcon && <span className="-mr-1 flex items-center">{endIcon}</span>}
        </span>
        {isFetching && !isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Skeleton
              decorative
              animation="pulse"
              tone="contrast"
              className={cn(
                'w-full h-full',
                shape === 'pill' && 'rounded-full',
                shape === 'square' && 'rounded-md'
              )}
            />
          </span>
        )}
      </>
    )

    if (element === 'a') {
      const { disabled, ...anchorProps } =
        rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean }
      const anchorDisabled = disabled || isLoading || isFetching
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(
            classes,
            anchorDisabled && 'cursor-not-allowed pointer-events-none opacity-60'
          )}
          aria-disabled={anchorDisabled || undefined}
          {...anchorProps}
        >
          {content}
        </a>
      )
    }

    const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(classes, (isLoading || isFetching) && 'cursor-wait')}
        disabled={isLoading || isFetching || buttonProps.disabled}
        {...buttonProps}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
