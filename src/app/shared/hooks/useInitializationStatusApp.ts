import { invoke } from '@tauri-apps/api/core'
import { Window } from '@tauri-apps/api/window'

export const useInitializationStatusApp = () => {
	const currentWindow = Window.getCurrent().label

	async function boot() {
		if (currentWindow === 'splash') {
			await invoke('app_initialize')
			await invoke('initialize_db')
		}
	}

	return boot
}
