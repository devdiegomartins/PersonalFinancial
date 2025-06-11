import { useTranslation } from 'react-i18next'
import { I18nProvider } from './I18nProvider'
import { ThemeProvider } from './ThemeProvider'
import type { PropsWithChildren } from 'react'

export function BootstrapProvider({ children }: PropsWithChildren) {
	const { t } = useTranslation()

	return (
		<I18nProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</I18nProvider>
	)
}
