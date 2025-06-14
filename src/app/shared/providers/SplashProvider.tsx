import { useEffect } from 'react'
import { BootstrapProvider } from './BootstrapProvider'
import { Window } from '@tauri-apps/api/window'
import { invoke } from '@tauri-apps/api/core'

export function SplashProvider() {
	useEffect(() => {
		async function boot() {
			const currentWindow = Window.getCurrent().label
			console.log({ currentWindow })

			if (currentWindow === 'splash') {
				await invoke('app_initialize')
			}
		}

		boot()
	}, [])

	return <BootstrapProvider>SplashProvider</BootstrapProvider>
}
