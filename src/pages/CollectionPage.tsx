import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchCollection, type Collection } from "../lib/api/collectionApi";
import SecureImage from "../components/UI/SecureImage/SecureImage";
import { toPhotoSize } from "../lib/api/photoApi";
import LoadImageViewingModal from "../components/LoadImageViewingModal/LoadImageViewingModal";
import Link from "../components/UI/Link/Link";
import Container from "../components/UI/Container/Container";

const CollectionPage = () => {
	const [searchParams] = useSearchParams();

	const accessSecret = searchParams.get("access_secret");

	const { collection_uuid } = useParams();

	const [status, setStatus] = useState("empty");
	const [collection, setCollection] = useState<Collection>();
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);

	const requirePhotoSize = toPhotoSize(localStorage.getItem("feedImageRequireSize") ?? "");

	useEffect(() => {
		setStatus("loading");
		fetchCollection(collection_uuid ?? "", accessSecret ?? undefined)
			.then((collection) => {
				setCollection(collection);
				setStatus("loaded");
			})
			.catch((err) => {
				console.log("Error fetch collection: ", err);
				setStatus("error");
			});
	}, []);

	const nextPhoto = () => {
		if (currentIndex === null) return;

		setCurrentIndex((prev) => (prev === null ? null : (prev + 1) % (collection?.photos.length ?? 1)));
	};
	const prevPhoto = () => {
		if (currentIndex === null) return;
		
		
		const len = (collection?.photos.length ?? 1);
		setCurrentIndex((prev) =>
			prev === null ? null : (prev - 1 + len) % len,
		);
	};

	return (
		<Container>
			{currentIndex !== null && collection && (
				<LoadImageViewingModal
					photoDesc={collection.photos[currentIndex]}
					close={() => setCurrentIndex(null)}
					next={nextPhoto}
					prev={prevPhoto}
				/>
			)}

			<Link to="/collections">Back</Link>
			{status == "loading" && <p>Loading...</p>}
			{status == "error" && <p>Loading error</p>}
			{status == "loaded" && collection && (
				<>
					<h1>{collection.title}</h1>
					{collection.photos.length == 0 ? (
						<p>Photos list empty</p>
					) : (
						<section
							style={{
								margin: "10px",
								columnCount: localStorage.getItem("feedImageColumnsCount") ?? "5",
								columnGap: "5px",
							}}
						>
							{collection.photos.map((photoDesc, idx) => (
								<SecureImage
									key={photoDesc.photo_uuid}
									open={() => setCurrentIndex(idx)}
									photoUuid={photoDesc.photo_uuid}
									photoSize={requirePhotoSize}
									accessKey={photoDesc.access_key}
								/>
							))}
						</section>
					)}
				</>
			)}
		</Container>
	);
};

export default CollectionPage;
