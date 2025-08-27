import { useTranslation } from 'react-i18next'
import type { TranslateFn } from './useTextTypes'

export const useText = <TKeys extends string[]>(keys: TKeys) => {
  const { t } = useTranslation()

  const translators = keys.map<TranslateFn>(fullKey => {
    const [namespace, ...baseParts] = fullKey.split('.')
    const base = baseParts.join('.')

    const fn: TranslateFn = (subKey, options) => {
      const rest = [base, subKey].filter(Boolean).join('.')
      const finalKey = rest ? `${namespace}:${rest}` : `${namespace}`
      const result = t(finalKey, options as unknown as Record<string, unknown>)
      return typeof result === 'string' ? result : String(result)
    }
    return fn
  })

  return translators as { [K in keyof TKeys]: TranslateFn }
}
