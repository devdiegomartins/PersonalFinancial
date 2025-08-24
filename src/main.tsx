import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./shared/providers/AppProvider";
import "./ui/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AppProvider />
	</React.StrictMode>,
);
