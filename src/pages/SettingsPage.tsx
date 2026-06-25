import { useState } from 'react';

const SettingsPage = () => {
	const [feedImageColumnsCount, setFeedImageColumnsCount] = useState(localStorage.getItem("feedImageColumnsCount") ?? "5");

	return (
		<section style={{padding: "10px"}}>
			<p>Feed image columns count: {feedImageColumnsCount}</p>
			<input
				type="range"
				min="1"
				max="10"
				onChange={(e) => {
					setFeedImageColumnsCount(e.target.value)
					localStorage.setItem("feedImageColumnsCount", e.target.value)
				}}
				value={feedImageColumnsCount}
				/>
		</section>
	);
}

export default SettingsPage;
