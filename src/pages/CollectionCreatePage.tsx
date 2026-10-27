import CollectionInput from "../components/UI/CollectionInput/CollectionInput";
import { uploadCollection, type UploadingCollectionMetadata } from "../lib/api/collectionApi";
import Link from "../components/UI/Link/Link";
import Container from "../components/UI/Container/Container";

const CollectionCreatePage = () => {
	const handleUpload = (collection: UploadingCollectionMetadata) => {
		uploadCollection(collection).catch((err) => {
			console.error("Error upload collection: ", err);
		});
	};

	return (
		<Container>
			<Link to="/collections/my">Back</Link>

			<CollectionInput upload={handleUpload} />
		</Container>
	);
};

export default CollectionCreatePage;
