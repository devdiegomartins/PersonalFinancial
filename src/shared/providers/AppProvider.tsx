import { useTranslation } from "react-i18next";
import { LanguageProvider } from "./Language/LanguageProvider";

export const AppProvider = () => {
	const { t } = useTranslation();

	return <LanguageProvider>{t("common:test")}</LanguageProvider>;
};
