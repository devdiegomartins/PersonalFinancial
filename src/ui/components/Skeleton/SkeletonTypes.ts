import type { VariantProps } from 'class-variance-authority'
import type { skeletonVariants } from './SkeletonStyles'

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /** Largura custom (ex: w-full, w-32, 120px) */
  width?: string | number
  /** Altura custom (ex: h-4, 2rem, 40) */
  height?: string | number
  /** Esconde elemento de tecnologias assistivas quando meramente decorativo */
  decorative?: boolean
}
