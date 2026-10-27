import { useEffect, useMemo, useState } from "react";
import { fetchPhotos, toPhotoSize, type Photo } from "../lib/api/photoApi";
import { useParams } from "react-router-dom";
import {
	fetchCollection,
	type SmallPhotoInfo,
	type Collection,
	removePhotoFromCollection,
	addPhotoToCollection,
} from "../lib/api/collectionApi";
import SecureImage from "../components/UI/SecureImage/SecureImage";
import Button from "../components/UI/Button/Button";
import useAuth from "../lib/hooks/useAuth";
import Link from "../components/UI/Link/Link";
import Container from "../components/UI/Container/Container";

const CollectionEditPage = () => {
	const { user } = useAuth();
	const { collection_uuid } = useParams();

	const [status, setStatus] = useState<"empty" | "loading" | "loaded" | "error">("empty");
	const [collection, setCollection] = useState<Collection>();
	const [selectedToDelete, setSelectedToDelete] = useState<SmallPhotoInfo[]>([]);
	const [selectedToAdd, setSelectedToAdd] = useState<SmallPhotoInfo[]>([]);

	const [statusPhotos, setStatusPhotos] = useState<"empty" | "loading" | "loaded" | "error">(
		"empty",
	);
	const [photosList, setPhotosList] = useState<Photo[]>([]);

	const requirePhotoSize = toPhotoSize(localStorage.getItem("feedImageRequireSize") ?? "");

	const loadCollection = async () => {
		if (!collection_uuid) return;

		setStatus("loading");
		try {
			const data = await fetchCollection(collection_uuid);
			setCollection(data);
			setStatus("loaded");
			setSelectedToAdd([]);
			setSelectedToDelete([]);
		} catch (err) {
			console.log("Error fetch collection: ", err);
			setStatus("error");
		}
	};

	useEffect(() => {
		const loadPhotos = async () => {
			setStatusPhotos("loading");
			try {
				const photos = await fetchPhotos(user?.login);
				setPhotosList(photos);
				setStatusPhotos("loaded");
			} catch (err) {
				console.log("Error fetch photos: ", err);
				setStatusPhotos("error");
			}
		};

		loadPhotos();
	}, [user?.login]);

	useEffect(() => {
		loadCollection();
	}, [collection_uuid]);

	const availablePhotos = useMemo(() => {
		const collectionIds = new Set(collection?.photos.map((p) => p.photo_uuid) ?? []);
		return photosList.filter((p) => !collectionIds.has(p.photo_uuid));
	}, [photosList, collection]);

	const handleRemove = async () => {
		if (!collection_uuid || selectedToDelete.length === 0) return;

		try {
			await Promise.all(
				selectedToDelete.map((photo) =>
					removePhotoFromCollection(collection_uuid, photo.photo_uuid),
				),
			);
			await loadCollection();
		} catch (err) {
			console.error("Error remove photo from collection: ", err);
		}
	};

	const handleAdd = async () => {
		if (!collection_uuid || selectedToAdd.length === 0) return;

		try {
			await Promise.all(
				selectedToAdd.map((photo) =>
					addPhotoToCollection(collection_uuid, photo.photo_uuid),
				),
			);
			await loadCollection();
		} catch (err) {
			
			console.error("Error add photo to collection: ", err);
		}
	};

	const handleClear = () => {
		setSelectedToAdd([]);
		setSelectedToDelete([]);
	}

	return (
		<Container>
			<div>
				<Link to="/collections/my">Back</Link>
				{selectedToDelete.length !== 0 && <Button onClick={handleRemove}>Remove</Button>}
				{selectedToAdd.length !== 0 && <Button onClick={handleAdd}>Add</Button>}
				{(selectedToDelete.length !== 0 || selectedToAdd.length !== 0) && <Button onClick={handleClear}>Clear</Button>}
			</div>

			{(status === "loading" || statusPhotos === "loading") && <p>Loading...</p>}
			{status === "error" && <p>Loading error</p>}

			{status === "loaded" && collection && (
				<>
					<h1>{collection.title}</h1>

					{collection.photos.length === 0 ? (
						<p>Photos list empty</p>
					) : (
						<section
							style={{
								margin: "10px",
								columnCount: localStorage.getItem("feedImageColumnsCount") ?? "5",
								columnGap: "5px",
							}}
						>
							{collection.photos.map((photoDesc) => {
								const isSelected = selectedToDelete.some(
									(p) => p.photo_uuid === photoDesc.photo_uuid,
								);

								const img = (
									<SecureImage
										containerStyle={{border: isSelected ? "2px solid red" : undefined}}
										key={photoDesc.photo_uuid}
										open={() => {
											setSelectedToAdd([]);
											setSelectedToDelete((prev) => {
												const exists = prev.some((p) => p.photo_uuid === photoDesc.photo_uuid);
												if (exists) {
													return prev.filter((p) => p.photo_uuid !== photoDesc.photo_uuid);
												}
												return [...prev, photoDesc];
											})
										}}
										photoUuid={photoDesc.photo_uuid}
										photoSize={requirePhotoSize}
										accessKey={photoDesc.access_key}
									/>
								);

								return img;
							})}
						</section>
					)}

					<h2>Available photos</h2>
					<section
						style={{
							margin: "10px",
							columnCount: localStorage.getItem("feedImageColumnsCount") ?? "5",
							columnGap: "5px",
						}}
					>
							{availablePhotos.map((photoDesc) => {
								const isSelected = selectedToAdd.some(
									(p) => p.photo_uuid === photoDesc.photo_uuid,
								);

								const img = (
								<SecureImage
									containerStyle={{border: isSelected ? "2px solid green" : undefined}}
									key={photoDesc.photo_uuid}
									open={() => {
										setSelectedToDelete([]);
										setSelectedToAdd((prev) => {
											const exists = prev.some((p) => p.photo_uuid === photoDesc.photo_uuid);
											if (exists) {
												return prev.filter((p) => p.photo_uuid !== photoDesc.photo_uuid);
											}
											return [...prev, photoDesc];
										})
									}}
									photoUuid={photoDesc.photo_uuid}
									photoSize={requirePhotoSize}
									accessKey={photoDesc.access_key}
								/>
							);

							return img;
						})}
					</section>
				</>
			)}
		</Container>
	);
};

export default CollectionEditPage;
