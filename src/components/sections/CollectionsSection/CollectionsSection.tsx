import { useEffect, useState } from "react";
import {
	fetchCollection,
	fetchCollections,
	fetchSelfCollections,
	type SimpleCollection,
} from "../../../lib/api/collectionApi";
import CollectionPreview from "../../UI/CollectionPreview/CollectionPreview";
import { useNavigate } from "react-router-dom";
import cl from "./CollectionsSection.module.css";

interface CollectionSectionProps {
	owner_login?: string;
	viewSelfCollections?: boolean;
}

interface CollectionWithPreview extends SimpleCollection {
	previewPhoto?: {
		photoUuid: string;
		accessKey: string;
	};
}

const CollectionsSection = ({ owner_login, viewSelfCollections }: CollectionSectionProps) => {
	const [status, setStatus] = useState("empty");
	const [collectionsList, setCollectionsList] = useState<Array<CollectionWithPreview>>([]);

	const navigate = useNavigate();

	useEffect(() => {
		setStatus("loading");
		let collectionsPromise: Promise<Array<SimpleCollection>>

		if (viewSelfCollections) {
			collectionsPromise = fetchSelfCollections()
		} else {
			collectionsPromise = fetchCollections(owner_login)
		}
		
		collectionsPromise.then(async (collections) => {
				const newCollections = await Promise.all(
					collections.map(async (collection) => {
						// TODO: use request for get preview when it will created
						const photos = await fetchCollection(collection.collection_uuid);
						const photo = photos.photos[0] ?? undefined;
						const previewPhoto = photo && {
							photoUuid: photo.photo_uuid,
							accessKey: photo.access_key,
						};
						return { ...collection, previewPhoto: previewPhoto };
					}),
				);

				setCollectionsList(newCollections);
				setStatus("loaded");
			})
			.catch((err) => {
				console.log("Error fetch collections: ", err);
				setStatus("error");
			});
	}, []);

	return (
		<>
			{status == "loading" && <p>Loading...</p>}
			{status == "error" && <p>Loading error</p>}
			{status == "loaded" && collectionsList.length == 0 ? (
				<p>Collections list is empty</p>
			) : (
				<section
					className={cl.section}
					style={{
						columnCount: localStorage.getItem("feedImageColumnsCount") ?? "5",
						columnGap: "4px",
					}}
				>
					{collectionsList.map((collection) => (
						<CollectionPreview
							key={collection.collection_uuid}
							collection={collection}
							open={() => {
								if (viewSelfCollections) {
									navigate(`/collection/${collection.collection_uuid}/edit`);
								} else {
									navigate(`/collection/${collection.collection_uuid}`);
								}
							}}
							previewPhoto={collection.previewPhoto}
						/>
					))}
				</section>
			)}
		</>
	);
};

export default CollectionsSection;
