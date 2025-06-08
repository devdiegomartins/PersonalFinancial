import { useTranslation } from 'react-i18next'
import { I18nProvider } from './I18nProvider'
import { ThemeProvider } from './ThemeProvider'

export function AppProvider() {
	const { t, i18n } = useTranslation()
	return (
		<I18nProvider>
			<ThemeProvider>
				<div className="w-dvw h-dvh flex justify-center items-center text-3xl antialiased font-bold">
					{t('common:test')} - {i18n.language}
				</div>
			</ThemeProvider>
		</I18nProvider>
	)
}
