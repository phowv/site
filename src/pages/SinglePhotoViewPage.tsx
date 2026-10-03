import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPhoto, PhotoSize, type Photo } from "../lib/api/photoApi";
import SecureImg from "../components/UI/SecureImg/SecureImg";

const SinglePhotoViewPage = () => {
	const { photo_uuid } = useParams<{
		photo_uuid: string;
	}>();

	const [searchParams] = useSearchParams();

	const access_secret = searchParams.get("access_secret");

	if (!photo_uuid || !access_secret) {
		return <Navigate to="/notfound" replace />;
	}

	const [photo, setPhoto] = useState<Photo | undefined>(undefined);

	useEffect(() => {
		fetchPhoto(photo_uuid, access_secret)
			.then((p) => setPhoto(p))
			.catch((err) => {
				console.log("Error fetch photos: ", err);
			});
	}, []);

	return (
		<>
			{photo && (
				<SecureImg
					alt="image"
					photoUuid={photo.photo_uuid}
					accessKey={photo.access_key}
					photoSize={PhotoSize.medium}
				/>
			)}

			{photo == undefined && <p>Image loading...</p>}
		</>
	);
};

export default SinglePhotoViewPage;
