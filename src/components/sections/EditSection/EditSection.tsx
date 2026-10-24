import ImageSection from "../ImageSection";
import type { Photo } from "../../../lib/api/photoApi";
import { useState } from "react";
import ImageEditingModal from "../../ImageEditingModal/ImageEditingModal";

const EditSection = () => {
	const [version, setVersion] = useState(0);
	const [photosList, setPhotosList] = useState<Array<Photo>>([]);
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);

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
				<ImageEditingModal
					photoDesc={photosList[currentIndex]}
					close={closePhoto}
					onChangePhoto={() => setVersion((v) => v + 1)}
					next={nextPhoto}
					prev={prevPhoto}
				/>
			)}
			<ImageSection
				version={version}
				openPhoto={openPhoto}
				photosList={photosList}
				setPhotosList={setPhotosList}
				viewSelfPhotos={true}
			/>
		</>
	);
};

export default EditSection;
