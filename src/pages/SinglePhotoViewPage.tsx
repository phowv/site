import { useParams, useSearchParams } from "react-router-dom";
import SinglePhotoSection from "../components/sections/SinglePhotoSection/SinglePhotoSection";

const SinglePhotoViewPage = () => {
	const { photo_uuid } = useParams<{
		photo_uuid: string;
	}>();

	const [searchParams] = useSearchParams();

	const accessSecret = searchParams.get("access_secret");

	return (
		<SinglePhotoSection photoUuid={photo_uuid ?? ""} accessSecret={accessSecret ?? undefined} />
	);
};

export default SinglePhotoViewPage;
