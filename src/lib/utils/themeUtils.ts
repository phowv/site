export type ThemeMode = "system" | "dark" | "light";
export type Theme = "dark" | "light";

export function applyTheme(mode: ThemeMode) {
	const mq = window.matchMedia("(prefers-color-scheme: dark)");
	const theme = mode === "system" ? (mq.matches ? "dark" : "light") : mode;
	document.documentElement.setAttribute("data-theme", theme);
}
