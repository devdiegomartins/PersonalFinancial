import type { VariantProps } from 'class-variance-authority'
import type { IconsNames } from '../Icon/IconTypes'
import type { alertVariants } from './AlertStyles'

type AlertVariantType = VariantProps<typeof alertVariants>

export type AlertProps = Omit<AlertVariantType, 'variant'> & {
  variant: Exclude<AlertVariantType['variant'], null | undefined>
  title: string
  description?: string
  customIcon?: IconsNames
  ref?: React.Ref<HTMLDivElement>
}
