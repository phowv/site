import { useEffect, useState } from "react"
import { fetchPhotos, type Photo } from "../../lib/photoApi"
import Image from "../UI/Image/Image"
import { API_BASE } from "../../lib/axios"
import ImageViewingModal from "../ImageViewingModal/ImageViewingModal"

const ViewSection = () => {
	const [status, setStatus] = useState('empty')
	const [photosList, setPhotosList] = useState<Array<Photo>>([])
	const [viewingPhoto, setViewingPhoto] = useState<Photo | null>(null)

	useEffect(() => {
		setStatus('loading')
		fetchPhotos()
			.then(photos => {
				setPhotosList(photos)
				setStatus('loaded')
			})
			.catch(err => {
				console.log('Error fetch photos: ', err)
				setStatus('error')
			})
	}, [])

	return (
		<>
			{viewingPhoto ? <ImageViewingModal photoDesc={viewingPhoto} close={() => setViewingPhoto(null)}/> : null}
			{status == 'loading' && <p>Loading...</p>}
			{status == 'error' && <p>Loading error</p>}
			{status == 'loaded' &&
			<section style={{margin: '10px'}}>
				{photosList.map(photoDesc =>
				<Image
					key={photoDesc.photo_uuid}
					title={photoDesc.title}
					description={photoDesc.description}
					ownerLogin={photoDesc.owner_login}
					open={() => setViewingPhoto(photoDesc)}
					src={`${API_BASE}/photo/${photoDesc.photo_uuid}`}
					width="500px"
					style={{display:"inline-block", padding: "5px", margin: "10px", border: "2px solid gray"}}/>)}
			</section>
			}
		</>
	);
}

export default ViewSection;
