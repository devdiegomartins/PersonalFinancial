import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import langConfig from "~/config/lang.json";
import serverConfig from "~/config/server";

i18n
	.use(HttpApi)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		lng: langConfig.fallbackLanguage.default[0],
		fallbackLng: langConfig.fallbackLanguage,
		supportedLngs: langConfig.supportLanguages,
		debug: langConfig.debugI18n,
		ns: langConfig.namespaces,
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ["localStorage", "navigator", "htmlTag"],
			caches: ["localStorage"],
			lookupLocalStorage: "lng",
		},
		backend: {
			loadPath: "/locales/{{lng}}/{{ns}}.json",
			cache: !serverConfig.isDevMode,
			requestOptions: serverConfig.isDevMode
				? {
						cache: "no-cache",
						headers: {
							"Cache-Control": "no-cache, no-store, must-revalidate",
							Pragma: "no-cache",
							Expires: "0",
						},
					}
				: undefined,
		},
	});

export default i18n;
