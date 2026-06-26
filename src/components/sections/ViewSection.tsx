import { useState } from "react"
import ImageViewingModal from "../ImageViewingModal/ImageViewingModal"
import ImageSection from "./ImageSection"
import type { Photo } from "../../lib/photoApi"

const ViewSection = () => {
	const [viewingPhoto, setViewingPhoto] = useState<Photo | null>(null)

	return (
		<>
			{viewingPhoto ? <ImageViewingModal photoDesc={viewingPhoto} close={() => setViewingPhoto(null)}/> : undefined}
			<ImageSection open_photo={setViewingPhoto}/>
		</>
	);
}

export default ViewSection;
