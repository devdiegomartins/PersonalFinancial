import { LanguageProvider } from "./Language/LanguageProvider";
import { RouterProvider } from "./RouterProvider";

export const AppProvider = () => {
	return (
		<LanguageProvider>
			<RouterProvider />
		</LanguageProvider>
	);
};
