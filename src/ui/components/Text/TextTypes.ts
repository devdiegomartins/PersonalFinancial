export type TextStyleType = 'heading64' | 'heading32' | 'heading16' | 'body' | 'caption'

export type TextProps = {
  style?: TextStyleType
  element?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label'
}
