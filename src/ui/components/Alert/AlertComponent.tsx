import { Icon } from '../Icon/IconComponent'
import type { IconsNames } from '../Icon/IconTypes'
import { Text } from '../Text/TextComponent'
import { alertVariants } from './AlertStyles'
import type { AlertProps } from './AlertTypes'

const variantIcon: Record<NonNullable<AlertProps['variant']>, IconsNames> = {
  success: 'RiCheckDoubleLine',
  danger: 'RiErrorWarningLine',
  warning: 'RiAlertLine',
  info: 'RiInformationLine',
}

const sizeIcon: Record<NonNullable<AlertProps['size']>, number> = {}

const Alert = ({ variant, size, title, description, customIcon, ref }: AlertProps) => {
  const variantIconName = variantIcon[variant]

  return (
    <div className={alertVariants({ variant, size })} ref={ref}>
      <div className="flex flex-row items-start justify-start gap-2">
        <div>
          <Icon name={customIcon ?? variantIconName} />
        </div>

        <Text element="h3" style="heading32">
          {title}
        </Text>
      </div>

      {description && (
        <Text element="div" style="body">
          {description}
        </Text>
      )}
    </div>
  )
}

Alert.displayName = 'Alert'

export { Alert }
