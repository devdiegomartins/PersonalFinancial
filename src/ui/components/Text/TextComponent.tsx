import type { PropsWithChildren } from 'react'
import { cn } from '~/ui/utils'
import { textStyles } from './TextStyles'
import type { TextProps } from './TextTypes'

export const Text = ({
  children,
  style = 'body',
  element = 'span',
  className,
  weight,
  tone,
  align,
  transform,
  italic,
  underline,
  strike,
  truncate,
}: PropsWithChildren<TextProps>) => {
  const Element = element
  return (
    <Element
      className={cn(
        textStyles({
          style,
          weight,
          tone,
          align,
          transform,
          italic,
          underline,
          strike,
          truncate,
        }),
        className
      )}
    >
      {children}
    </Element>
  )
}
