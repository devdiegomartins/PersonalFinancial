// Core size/style scale (extended)
export type TextStyleType =
  | 'display'
  | 'heading64'
  | 'heading48'
  | 'heading32'
  | 'heading24'
  | 'heading16'
  | 'subtitle'
  | 'bodyLarge'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'overline'
  | 'code'
  | 'mono'

export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold'
export type TextTone =
  | 'default'
  | 'muted'
  | 'subtle'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info'
  | 'inverted'
export type TextAlign = 'left' | 'center' | 'right' | 'justify'
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize'

export type TextProps = {
  /** Visual size/style (formerly `style` – kept for backward compatibility) */
  style?: TextStyleType
  /** Underlying HTML element */
  element?:
    | 'span'
    | 'p'
    | 'div'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'label'
    | 'code'
  /** Font weight override */
  weight?: TextWeight
  /** Semantic color tone */
  tone?: TextTone
  /** Text alignment */
  align?: TextAlign
  /** Text transform */
  transform?: TextTransform
  /** Apply single-line truncation with ellipsis */
  truncate?: boolean
  /** Italic style */
  italic?: boolean
  /** Underline decoration */
  underline?: boolean
  /** Strikethrough decoration */
  strike?: boolean
  /** Additional class names */
  className?: string
}
