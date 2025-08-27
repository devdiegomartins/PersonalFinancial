interface I18nOptions extends Record<string, unknown> {
  defaultValue?: string
}
export type TranslateFn = (subKey?: string | null, options?: I18nOptions) => string
