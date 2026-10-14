import { useEffect } from "react";
import { applyTheme, type ThemeMode } from "./lib/utils/themeUtils";
import MainLayout from "./layouts/MainLayout";

function App() {
	useEffect(() => {
		const theme = (localStorage.getItem("theme-mode") || "system") as ThemeMode;
		const apply = () => applyTheme(theme);
		apply();

		if (theme === "system") {
			const mq = window.matchMedia("(prefers-color-scheme: dark)");
			mq.addEventListener("change", apply);
			return () => mq.removeEventListener("change", apply);
		}
	}, []);

	return <MainLayout />;
}

export default App;
