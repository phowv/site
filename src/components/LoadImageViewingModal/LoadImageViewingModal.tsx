import { useEffect, useState } from "react";
import type { SmallPhotoInfo } from "../../lib/api/collectionApi";
import { fetchPhoto, type Photo } from "../../lib/api/photoApi";
import FormModal from "../FormModal/FormModal";
import Button from "../UI/Button/Button";
import SecureImg from "../UI/SecureImg/SecureImg";
import cl from "./LoadImageViewingModal.module.css"

interface LoadImageViewingModalProps {
	photoDesc: SmallPhotoInfo;
	close: () => void;
}

const LoadImageViewingModal = ({ photoDesc, close }: LoadImageViewingModalProps) => {
	const [status, setStatus] = useState('empty');
	const [photo, setPhoto] = useState<Photo>();

	useEffect(() => {
		setStatus('loading')
		fetchPhoto(photoDesc.photo_uuid, photoDesc.access_key)
			.then(photo => {
				setPhoto(photo)
				setStatus('loaded')
			})
			.catch(err => {
				console.log('Error fetch photos: ', err)
				setStatus('error')
			})
	}, [])

	return (
		<>
		{status == 'loading' && <p>Loading...</p>}
		{status == 'error' && <p>Loading error</p>}
		{status == 'loaded' &&
		photo &&
		<FormModal visible={true} close={close}>
			<div className={cl.imageDescription}>
				<h1>{photo.title}</h1>
				<p>Owner: <a href={`${window.location.origin}/profile/${photo.owner_login}`}>{photo.owner_login}</a></p>
			</div>
			<p>{photo.description}</p>

			{photo.tags.length !== 0 ? 
			<div className={cl.imageTagsDiv}>
				<p>Tags:</p>
				{photo.tags.map(tag =>
				<p key={tag.tag_uuid} className={cl.imageTagName}>#{tag.tag_name}</p>
				)}
			</div>
			: undefined}

			<SecureImg
				className={cl.viewingImage}
				alt="image"
				photoUuid={photoDesc.photo_uuid}
				accessKey={photoDesc.access_key}				
			/>
			<Button onClick={close}>done</Button>
		</FormModal>
		}
		</>
	);
}

export default LoadImageViewingModal;
