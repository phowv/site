import { useEffect, useState } from "react"
import { fetchPhotos, getPhotoPostfix, toPhotoSize, type Photo } from "../../lib/photoApi"
import Image from "../UI/Image/Image"
import { API_BASE } from "../../lib/axios"

interface ImageSectionProps {
	owner_login?: string;
	open_photo: (photoDesc: Photo) => void;
	version?: number;
}

const ImageSection = (props: ImageSectionProps) => {
	const [status, setStatus] = useState('empty')
	const [photosList, setPhotosList] = useState<Array<Photo>>([])

	const requirePhotoPostfix = getPhotoPostfix(toPhotoSize(localStorage.getItem("feedImageRequireSize") ?? ""))

	useEffect(() => {
		setStatus('loading')
		fetchPhotos(props.owner_login)
			.then(photos => {
				setPhotosList(photos)
				setStatus('loaded')
			})
			.catch(err => {
				console.log('Error fetch photos: ', err)
				setStatus('error')
			})
	}, [props.version])

	return (
		<>	
			{status == 'loading' && <p>Loading...</p>}
			{status == 'error' && <p>Loading error</p>}
			{status == 'loaded' &&
			photosList.length == 0 ?
			<p>Photos list empty</p>
			:
			<section style={{margin: '10px', columnCount: localStorage.getItem("feedImageColumnsCount") ?? "5", columnGap: "5px"}}>
				{photosList.map(photoDesc =>
				<Image
					key={photoDesc.photo_uuid}
					open={() => props.open_photo(photoDesc)}
					src={`${API_BASE}/photo/${photoDesc.photo_uuid}${requirePhotoPostfix}`}
				/>)}
			</section>
			}
		</>
	);
}

export default ImageSection;
