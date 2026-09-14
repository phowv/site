import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { fetchCollection, type Collection, type SmallPhotoInfo } from '../lib/api/collectionApi';
import SecureImage from '../components/UI/SecureImage/SecureImage';
import { toPhotoSize } from '../lib/api/photoApi';
import LoadImageViewingModal from '../components/LoadImageViewingModal/LoadImageViewingModal';

const CollectionPage = () => {
	const { collection_uuid } = useParams();

	const [status, setStatus] = useState('empty');
	const [collection, setCollection] = useState<Collection>();
	const [viewingPhoto, setViewingPhoto] = useState<SmallPhotoInfo | null>(null)

	const requirePhotoSize = toPhotoSize(localStorage.getItem("feedImageRequireSize") ?? "");

	useEffect(() => {
		setStatus('loading')
		fetchCollection(collection_uuid ?? "")
			.then(collection => {
				setCollection(collection)
				setStatus('loaded')
			})
			.catch(err => {
				console.log('Error fetch collection: ', err)
				setStatus('error')
			})
	}, []);

	return (
		<>
			{viewingPhoto ? <LoadImageViewingModal photoDesc={viewingPhoto} close={() => setViewingPhoto(null)}/> : undefined}

			<NavLink to="/collections">Back</NavLink>
			{status == 'loading' && <p>Loading...</p>}
			{status == 'error' && <p>Loading error</p>}
			{status == 'loaded' &&
			collection && 
			<>
				<h1>{collection.title}</h1>
				{collection.photos.length == 0 ?
				<p>Photos list empty</p>
				:
				<section style={{margin: '10px', columnCount: localStorage.getItem("feedImageColumnsCount") ?? "5", columnGap: "5px"}}>
					{collection.photos.map(photoDesc =>
					<SecureImage
						key={photoDesc.photo_uuid}
						open={() => setViewingPhoto(photoDesc)}
						photoUuid={photoDesc.photo_uuid}
						photoSize={requirePhotoSize}
						accessKey={photoDesc.access_key}
					/>)}
				</section>
				}
			</>
			}
		</>
	);
}

export default CollectionPage;
