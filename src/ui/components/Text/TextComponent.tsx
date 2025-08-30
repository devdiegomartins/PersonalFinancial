import type { PropsWithChildren } from 'react'
import { cn } from '~/ui/utils'
import { textStyles } from './TextStyles'
import type { TextProps } from './TextTypes'

export const Text = ({
  children,
  style = 'body',
  element = 'span',
  className,
}: PropsWithChildren<TextProps>) => {
  const Element = element
  return <Element className={cn(className, textStyles({ style }))}>{children}</Element>
}
