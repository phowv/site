import { useState } from "react";
import { PhotoSize } from "../lib/api/photoApi";

const SettingsPage = () => {
	const [feedImageColumnsCount, setFeedImageColumnsCount] = useState(
		localStorage.getItem("feedImageColumnsCount") ?? "5",
	);

	return (
		<section style={{ padding: "10px" }}>
			<p>Feed image columns count: {feedImageColumnsCount}</p>
			<input
				type="range"
				min="1"
				max="10"
				onChange={(e) => {
					const value = e.target.value;
					setFeedImageColumnsCount(value);
					localStorage.setItem("feedImageColumnsCount", value);
					localStorage.setItem("feedImageRequireSize", PhotoSize.small);
				}}
				value={feedImageColumnsCount}
			/>
		</section>
	);
};

export default SettingsPage;
