import { useEffect, useState } from "react"
import { API_BASE, fetchPhotos } from "../../lib/api"
import Image from "../UI/Image/Image"

const ViewSection = () => {
	const [status, setStatus] = useState('empty')
	const [photosList, setPhotosList] = useState<Array<any>>([])

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
			{status == 'loading' && <p>Loading...</p>}
			{status == 'error' && <p>Loading error</p>}
			{status == 'loaded' &&
			<section style={{margin: '10px'}}>
				{photosList.map(photoDesc =>
				<Image key={photoDesc.photo_id} title={photoDesc.title} description={photoDesc.description} src={`${API_BASE}/photo/${photoDesc.photo_id}`} width="500"/>)}
			</section>
			}
		</>
	);
}

export default ViewSection;
