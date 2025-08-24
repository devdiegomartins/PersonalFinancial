import type { PropsWithChildren } from 'react'
import { textStyles } from './TextStyles'
import type { TextProps } from './TextTypes'

export const Text = ({
  children,
  style = 'body',
  element = 'span',
}: PropsWithChildren<TextProps>) => {
  const Element = element
  return <Element className={textStyles({ style })}>{children}</Element>
}
