import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchPhoto, PhotoSize, type Photo } from "../../../lib/api/photoApi";
import SecureImg from "../../UI/SecureImg/SecureImg";
import cl from "./SinglePhotoSection.module.css";
import Button from "../../UI/Button/Button";

interface SinglePhotoSection {
	photoUuid: string;
	accessSecret?: string;
}

const SinglePhotoSection = ({ photoUuid, accessSecret }: SinglePhotoSection) => {
	if (!photoUuid) {
		return <Navigate to="/notfound" replace />;
	}

	const navigate = useNavigate();
	const [photo, setPhoto] = useState<Photo | undefined>(undefined);

	useEffect(() => {
		fetchPhoto(photoUuid, accessSecret)
			.then((p) => setPhoto(p))
			.catch((err) => {
				console.log("Error fetch photos: ", err);
			});
	}, []);

	return (
		<div className={cl.wrapper}>
			<Button className={cl.button} onClick={() => navigate(-1)}>
				Back
			</Button>

			{photo && (
				<SecureImg
					className={cl.image}
					alt="image"
					photoUuid={photo.photo_uuid}
					accessKey={photo.access_key}
					photoSize={PhotoSize.raw}
				/>
			)}

			{photo == undefined && <p>Image loading...</p>}
		</div>
	);
};

export default SinglePhotoSection;
