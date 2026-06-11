import { useEffect, useState } from "react"
import { fetchPhotos } from "../../lib/photoApi"
import Image from "../UI/Image/Image"
import { API_BASE } from "../../lib/axios"

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
				<Image
					key={photoDesc.photo_uuid}
					title={photoDesc.title}
					description={photoDesc.description}
					src={`${API_BASE}/photo/${photoDesc.photo_uuid}`}
					width="500px"
					style={{display:"inline-block", padding: "5px"}}/>)}
			</section>
			}
		</>
	);
}

export default ViewSection;
