import React from 'react'
import { cn } from '~/ui/utils'
import { boxVariants } from './BoxStyles'
import type { BoxProps } from './BoxTypes'

const Box = React.forwardRef<HTMLElement, BoxProps>(
  (
    {
      className,
      variant,
      size,
      radius,
      interactive,
      disabled,
      clickable,
      element = 'div',
      children,
      ...rest
    },
    ref
  ) => {
    // If clickable is true, force interactive to true
    const isInteractive = clickable || interactive

    const baseProps = {
      ref,
      className: cn(
        boxVariants({
          variant,
          size,
          radius,
          interactive: isInteractive,
          disabled,
        }),
        className
      ),
      children,
      ...rest,
    }

    switch (element) {
      case 'section':
        return <section {...(baseProps as React.ComponentProps<'section'>)} />
      case 'article':
        return <article {...(baseProps as React.ComponentProps<'article'>)} />
      case 'aside':
        return <aside {...(baseProps as React.ComponentProps<'aside'>)} />
      case 'main':
        return <main {...(baseProps as React.ComponentProps<'main'>)} />
      case 'header':
        return <header {...(baseProps as React.ComponentProps<'header'>)} />
      case 'footer':
        return <footer {...(baseProps as React.ComponentProps<'footer'>)} />
      case 'nav':
        return <nav {...(baseProps as React.ComponentProps<'nav'>)} />
      default:
        return <div {...(baseProps as React.ComponentProps<'div'>)} />
    }
  }
)

Box.displayName = 'Box'

export { Box }
