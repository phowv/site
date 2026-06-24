import { API_BASE } from "../../lib/axios";
import type { Photo } from "../../lib/photoApi";
import FormModal from "../FormModal/FormModal";
import Button from "../UI/Button/Button";
import cl from "./ImageViewingModal.module.css"

interface ImageViewingModalProps {
	photoDesc: Photo;
	close: () => void;
}

const ImageViewingModal = ({ photoDesc, close }: ImageViewingModalProps) => {
	return (
		<FormModal visible={true} close={close}>
			<img className={cl.viewingImage} src={`${API_BASE}/photo/${photoDesc.photo_uuid}`} alt="image" />
			<Button onClick={close}>done</Button>
		</FormModal>
	);
}

export default ImageViewingModal;
