import { useTranslation } from 'react-i18next'
import { I18nProvider } from '../I18nProvider'
import { ThemeProvider } from '../ThemeProvider'
import { useEffect } from 'react'
import { invoke } from '@tauri-apps/api/core'

export function AppProvider() {
	const { t, i18n } = useTranslation()

	useEffect(() => {
		invoke('get_app_info_db')
			.then(console.log)
			.catch((err) => console.error(`Erro de conexão: ${err}`))
	}, [])

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
