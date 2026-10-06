import { useEffect, useRef, useState } from "react";
import { fetchPhotos, PhotoSize, toPhotoSize, type Photo } from "../../lib/api/photoApi";
import SecureImage from "../UI/SecureImage/SecureImage";
import { MasonryGrid, type MasonryGridHandle } from "../MasonryGrid/MasonryGrid";

interface ImageSectionProps {
	photosList: Array<Photo>;
	setPhotosList: (a: Array<Photo>) => void;
	openPhoto: (idx: number) => void;
	owner_login?: string;
	version?: number;
}

const ImageSection = (props: ImageSectionProps) => {
	const [status, setStatus] = useState("empty");

	const masonryRef = useRef<MasonryGridHandle>(null);

	const requirePhotoSize = toPhotoSize(localStorage.getItem("feedImageRequireSize") ?? PhotoSize.small);

	const onLoadImage = () => {
		masonryRef.current?.reflow();
	}

	useEffect(() => {
		setStatus("loading");
		fetchPhotos(props.owner_login)
			.then((photos) => {
				props.setPhotosList(photos);
				setStatus("loaded");
			})
			.catch((err) => {
				console.log("Error fetch photos: ", err);
				setStatus("error");
			});
	}, [props.version]);

	return (
		<>
			{status == "loading" && <p>Loading...</p>}
			{status == "error" && <p>Loading error</p>}
			{status == "loaded" && props.photosList.length == 0 ? (
				<p>Photos list empty</p>
			) : (
				<MasonryGrid
					ref={masonryRef}
					gap={4}
					columns={Number(localStorage.getItem("feedImageColumnsCount") ?? "5")}>
					{props.photosList.map((photoDesc, idx) => {
					 return (
						<SecureImage
							key={photoDesc.photo_uuid}
							open={() => props.openPhoto(idx)}
							photoUuid={photoDesc.photo_uuid}
							photoSize={requirePhotoSize}
							accessKey={photoDesc.access_key}
							onLoad={onLoadImage}
						/>
					) }) }
				</MasonryGrid>
			)}
		</>
	);
};

export default ImageSection;
