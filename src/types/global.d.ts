declare global {
	namespace Meta {}

	namespace NodeJS {
		interface ProcessEnv {
			TAURI_DEV_HOST?: string;
		}
	}
}
