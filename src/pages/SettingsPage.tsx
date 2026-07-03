import { useState } from 'react';
import { PhotoSize } from '../lib/photoApi';

const upperBoundSmallPhotosUse = 6
const upperBoundMediumPhotosUse = 3

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
					const value = e.target.value;
					setFeedImageColumnsCount(value);
					localStorage.setItem("feedImageColumnsCount", value);

					const count = parseInt(value) ?? 0;

					if (count >= upperBoundSmallPhotosUse) {
						localStorage.setItem("feedImageRequireSize", PhotoSize.small);
					} else if (count >= upperBoundMediumPhotosUse) {
						localStorage.setItem("feedImageRequireSize", PhotoSize.medium)
					} else {					
						localStorage.setItem("feedImageRequireSize", PhotoSize.raw);
					}
				}}
				value={feedImageColumnsCount}
				/>
		</section>
	);
}

export default SettingsPage;
