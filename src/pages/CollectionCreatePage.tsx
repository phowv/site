import { NavLink } from "react-router-dom";
import CollectionInput from "../components/UI/CollectionInput/CollectionInput";
import { uploadCollection } from "../lib/api/collectionApi";
import type { UploadingCollectionMetadata } from "../types/collection";

const CollectionCreatePage = () => {
	const handleUpload = (collection: UploadingCollectionMetadata) => {
		uploadCollection(collection).catch((err) => {
			console.error("Error upload collection: ", err);
		});
	};

	return (
		<>
			<NavLink to="/collections">Back</NavLink>

			<CollectionInput upload={handleUpload} />
		</>
	);
};

export default CollectionCreatePage;
