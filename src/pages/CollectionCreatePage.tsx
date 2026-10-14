import { NavLink } from "react-router-dom";
import CollectionInput from "../components/UI/CollectionInput/CollectionInput";
import { uploadCollection, type UploadingCollectionMetadata } from "../lib/api/collectionApi";

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
