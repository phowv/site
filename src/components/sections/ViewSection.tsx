import { useState } from "react"
import ImageViewingModal from "../ImageViewingModal/ImageViewingModal"
import ImageSection from "./ImageSection"
import type { Photo } from "../../lib/photoApi"

interface ViewSectionProps {
	owner_login?: string;
}

const ViewSection = ({ owner_login }: ViewSectionProps) => {
	const [viewingPhoto, setViewingPhoto] = useState<Photo | null>(null)

	return (
		<>
			{viewingPhoto ? <ImageViewingModal photoDesc={viewingPhoto} close={() => setViewingPhoto(null)}/> : undefined}
			<ImageSection open_photo={setViewingPhoto} owner_login={owner_login}/>
		</>
	);
}

export default ViewSection;
