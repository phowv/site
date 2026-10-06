import { useEffect, useState } from "react";
import { PhotoSize } from "../../lib/api/photoApi";
import cl from "./SettingsPage.module.css";
import { applyTheme, type ThemeMode } from "../../lib/utils/themeUtils";

const SettingsPage = () => {
	const [feedImageColumnsCount, setFeedImageColumnsCount] = useState(
		() => localStorage.getItem("feedImageColumnsCount") ?? "5",
	);
	const [themeMode, setThemeMode] = useState<ThemeMode>(
		(localStorage.getItem("theme-mode") || "system") as ThemeMode,
	);

	useEffect(() => {
		const apply = () => applyTheme(themeMode);
		apply();

		if (themeMode === "system") {
			const mq = window.matchMedia("(prefers-color-scheme: dark)");
			mq.addEventListener("change", apply);
			return () => mq.removeEventListener("change", apply);
		}
	}, [themeMode]);

	return (
		<section style={{ padding: "10px" }} className={cl.container}>
			<label className={cl.settings_line}>
				<p>Feed image columns count: {feedImageColumnsCount}</p>
				<input
					type="range"
					min="2"
					max="12"
					onChange={(e) => {
						const value = e.target.value;
						setFeedImageColumnsCount(value);
						localStorage.setItem("feedImageColumnsCount", value);
						localStorage.setItem("feedImageRequireSize", PhotoSize.small);
					}}
					value={feedImageColumnsCount}
				/>
			</label>

			<label className={cl.settings_line}>
				<p>Theme mode: </p>
				<select
					value={themeMode}
					onChange={(e) => {
						setThemeMode(e.target.value as ThemeMode);
						localStorage.setItem("theme-mode", e.target.value);
					}}
					className={cl.settings_droplist}
				>
					<option value="system">System</option>
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</select>
			</label>
		</section>
	);
};

export default SettingsPage;
