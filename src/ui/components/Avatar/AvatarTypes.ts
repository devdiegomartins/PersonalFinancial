import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import type {
  avatarIconVariants,
  avatarImageVariants,
  avatarInitialsVariants,
  avatarVariants,
} from './AvatarStyles'

export interface AvatarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** Image source URL for the avatar */
  src?: string
  /** Alt text for the image */
  alt?: string
  /** User's name - used to generate initials if no src provided */
  name?: string
  /** Custom className to apply to the avatar container */
  className?: string
}

export type AvatarImageProps = VariantProps<typeof avatarImageVariants>
export type AvatarInitialsProps = VariantProps<typeof avatarInitialsVariants>
export type AvatarIconProps = VariantProps<typeof avatarIconVariants>
