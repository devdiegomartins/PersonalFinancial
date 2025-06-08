import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

export const SUPPORTED_LANGUAGES = ['en', 'br', 'es']

const namespaces = ['common']

i18next.use(LanguageDetector).use(initReactI18next).use(Backend).init({
  returnObjects: true,
  supportedLngs: SUPPORTED_LANGUAGES,
  lng: SUPPORTED_LANGUAGES[1],
  fallbackLng: SUPPORTED_LANGUAGES[1],
  ns: namespaces,
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json"
  },
  interpolation: {
    escapeValue: false,
  },
  nonExplicitSupportedLngs: true,
  debug: false,
});

export const i18n = i18next;