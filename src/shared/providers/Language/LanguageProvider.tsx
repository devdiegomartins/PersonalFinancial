import type { PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";
import i18nConfig from "./i18n.config";

export const LanguageProvider = ({ children }: PropsWithChildren) => {
	return <I18nextProvider i18n={i18nConfig}>{children}</I18nextProvider>;
};
