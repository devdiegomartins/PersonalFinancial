export interface ProgressBaseProps {
  /** Current value (ignored when indeterminate). */
  value?: number
  /** Maximum value. */
  max?: number
  /** Visual style: bar (linear) or circular. */
  variant?: 'bar' | 'circular'
  /** Size token. */
  size?: 'sm' | 'md' | 'lg'
  /** Semantic tone / color. */
  tone?: 'primary' | 'accent' | 'success' | 'warning' | 'destructive' | 'muted'
  /** Indeterminate (intermitente) mode. Value is ignored. */
  indeterminate?: boolean
  /** Accessible label (screen readers). */
  label?: string
  /** Show numeric percent text inline (bar) or centered (circular). */
  showLabel?: boolean
  className?: string
  style?: React.CSSProperties
}

export type ProgressProps = ProgressBaseProps & React.HTMLAttributes<HTMLDivElement>
