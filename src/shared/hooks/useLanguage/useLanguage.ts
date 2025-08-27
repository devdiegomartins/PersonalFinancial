import { useTranslation } from 'react-i18next'
import type langConfig from '~/config/lang.json'

type SupportLanguage = (typeof langConfig)['supportLanguages'][number]

export const useLanguage = () => {
  const { i18n } = useTranslation()

  async function changeLanguage(lng: SupportLanguage) {
    // TODO add invoke to backend to save user preference
    await i18n.changeLanguage(lng)
  }

  return {
    language: i18n.language,
    changeLanguage,
  }
}
