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
			<section style={{margin: '10px', columnCount: localStorage.getItem("feedImageColumnsCount") ?? "5", columnGap: "5px"}}>
				{photosList.map(photoDesc =>
				<Image
					key={photoDesc.photo_uuid}
					open={() => setViewingPhoto(photoDesc)}
					src={`${API_BASE}/photo/${photoDesc.photo_uuid}`}
				/>)}
			</section>
			}
		</>
	);
}

export default ViewSection;
