import { useEffect, useState } from "react";
import { PhotoSize } from "../../lib/api/photoApi";
import cl from "./SettingsPage.module.css";

const SettingsPage = () => {
	const [feedImageColumnsCount, setFeedImageColumnsCount] = useState(
		() => localStorage.getItem("feedImageColumnsCount") ?? "5",
	);
	const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

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
				<p>Is dark theme</p>
				<input
					className={cl.settings_checkbox}
					type="checkbox"
					checked={theme === "dark"}
					onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
				/>
			</label>
		</section>
	);
};

export default SettingsPage;
