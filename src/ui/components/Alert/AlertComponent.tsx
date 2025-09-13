import { Icon } from '../Icon/IconComponent'
import type { IconsNames } from '../Icon/IconTypes'
import { Text } from '../Text/TextComponent'
import { alertVariants } from './AlertStyles'
import type { AlertProps } from './AlertTypes'

const variantIcon: Record<NonNullable<AlertProps['variant']>, IconsNames> = {
  success: 'RiCheckLine',
  danger: 'RiSpam2Line',
  warning: 'RiAlertLine',
  info: 'RiInformationLine',
}

const Alert = ({
  variant,
  title,
  description,
  customDescription,
  customIcon,
  ref,
}: AlertProps) => {
  const variantIconName = variantIcon[variant]

  return (
    <div className={alertVariants({ variant })} ref={ref}>
      <div className="flex flex-row items-center justify-start gap-2">
        <div className="text-3xl">
          <Icon name={customIcon ?? variantIconName} />
        </div>

        <Text element="h3" style="heading32">
          {title}
        </Text>
      </div>

      {(customDescription || description) && (
        <div className="border-t border-white/10 pt-2 text-neutral-200">
          {customDescription ? (
            customDescription
          ) : (
            <Text element="div" style="body">
              {description}
            </Text>
          )}
        </div>
      )}
    </div>
  )
}

Alert.displayName = 'Alert'

export { Alert }
