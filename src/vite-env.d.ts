/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly APP_VERSION: string | null;
	readonly APP_NAME: string | null;
	readonly APP_FILE_EXT: string | null;
	readonly SIGN_PRIVATE: string | null;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
