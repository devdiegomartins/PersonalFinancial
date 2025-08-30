import { forwardRef } from 'react'
import { cn } from '~/ui/utils'
import { skeletonVariants } from './SkeletonStyles'
import type { SkeletonProps } from './SkeletonTypes'

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      shape,
      animation,
      tone,
      width,
      height,
      decorative = true,
      style,
      ...rest
    },
    ref
  ) => {
    const inlineStyle: React.CSSProperties = { ...style }
    if (width !== undefined)
      inlineStyle.width = typeof width === 'number' ? `${width}px` : width
    if (height !== undefined)
      inlineStyle.height = typeof height === 'number' ? `${height}px` : height

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ shape, animation, tone }), className)}
        aria-hidden={decorative || undefined}
        role={decorative ? undefined : 'status'}
        {...rest}
        style={inlineStyle}
      >
        {animation !== 'pulse' && (
          <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 dark:via-white/10 to-transparent" />
        )}
      </div>
    )
  }
)

Skeleton.displayName = 'Skeleton'

export { Skeleton }
