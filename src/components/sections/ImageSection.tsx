import { useEffect, useState } from "react"
import { fetchPhotos, toPhotoSize, type Photo } from "../../lib/api/photoApi"
import SecureImage from "../UI/SecureImage/SecureImage";

interface ImageSectionProps {
	owner_login?: string;
	open_photo: (photoDesc: Photo) => void;
	version?: number;
}

const ImageSection = (props: ImageSectionProps) => {
	const [status, setStatus] = useState('empty')
	const [photosList, setPhotosList] = useState<Array<Photo>>([])

	const requirePhotoSize = toPhotoSize(localStorage.getItem("feedImageRequireSize") ?? "")

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
				<SecureImage
					key={photoDesc.photo_uuid}
					open={() => props.open_photo(photoDesc)}
					photoUuid={photoDesc.photo_uuid}
					photoSize={requirePhotoSize}
					accessKey={photoDesc.access_key}
				/>)}
			</section>
			}
		</>
	);
}

export default ImageSection;
