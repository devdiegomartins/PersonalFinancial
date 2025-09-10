import React from 'react'
import { cn } from '~/ui/utils'
import { Icon } from '../Icon/IconComponent'
import {
  avatarIconVariants,
  avatarImageVariants,
  avatarInitialsVariants,
  avatarVariants,
} from './AvatarStyles'
import type { AvatarProps } from './AvatarTypes'

/**
 * Extracts initials from a name string
 * @param name - Full name
 * @returns Initials (first letter of first name + first letter of last name, or just first letter if single name)
 */
const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/).filter(Boolean)

  if (words.length === 0) return ''
  if (words.length === 1) return words[0].charAt(0).toUpperCase()

  // Get first letter of first name and first letter of last name
  const firstInitial = words[0].charAt(0).toUpperCase()
  const lastInitial = words[words.length - 1].charAt(0).toUpperCase()

  return `${firstInitial}${lastInitial}`
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, shape, variant, src, alt, name, ...rest }, ref) => {
    const initials = name ? getInitials(name) : ''

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, shape, variant }), className)}
        {...rest}
      >
        {/* Image layer - highest priority */}
        {src && (
          <div
            className={cn(avatarImageVariants({ shape }))}
            style={{
              backgroundImage: `url(${src})`,
            }}
            role="img"
            aria-label={alt || name || 'Avatar'}
          />
        )}

        {/* Initials layer - second priority */}
        {!src && initials && (
          <span
            className={cn(
              avatarInitialsVariants({ size }),
              'flex items-center justify-center'
            )}
          >
            {initials}
          </span>
        )}

        {/* Icon layer - fallback */}
        {!src && !initials && (
          <span
            className={cn(
              avatarIconVariants({ size }),
              'flex items-center justify-center'
            )}
          >
            <Icon name="RiUser3Line" />
          </span>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export { Avatar }
