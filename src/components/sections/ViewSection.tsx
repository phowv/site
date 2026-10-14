import { useState } from "react";
import ImageViewingModal from "../ImageViewingModal/ImageViewingModal";
import ImageSection from "./ImageSection";
import type { Photo } from "../../lib/api/photoApi";

interface ViewSectionProps {
	owner_login?: string;
}

const ViewSection = ({ owner_login }: ViewSectionProps) => {
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);
	const [photosList, setPhotosList] = useState<Array<Photo>>([]);

	const openPhoto = (index: number) => setCurrentIndex(index);
	const closePhoto = () => setCurrentIndex(null);
	const nextPhoto = () => {
		if (currentIndex === null) return;

		setCurrentIndex((prev) => (prev === null ? null : (prev + 1) % photosList.length));
	};
	const prevPhoto = () => {
		if (currentIndex === null) return;
		setCurrentIndex((prev) =>
			prev === null ? null : (prev - 1 + photosList.length) % photosList.length,
		);
	};

	return (
		<>
			{currentIndex !== null && (
				<ImageViewingModal
					photoDesc={photosList[currentIndex]}
					close={closePhoto}
					next={nextPhoto}
					prev={prevPhoto}
				/>
			)}
			<ImageSection
				photosList={photosList}
				setPhotosList={setPhotosList}
				openPhoto={openPhoto}
				owner_login={owner_login}
			/>
		</>
	);
};

export default ViewSection;
