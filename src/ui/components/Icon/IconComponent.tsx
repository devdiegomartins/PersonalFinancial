import type { IconProps } from './IconTypes'
import { icons } from './icons'

export const Icon = ({ name, ...rest }: IconProps) => {
  const Component = icons?.[name]

  if (!Component) throw new Error(`Icon '${name}' not found`)

  return <Component {...rest} />
}
