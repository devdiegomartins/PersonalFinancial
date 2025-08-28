import type { icons } from './icons'

export type IconsNames = keyof typeof icons

export type IconProps = {
  name: IconsNames
  size?: number
  width?: number
  height?: number
}
