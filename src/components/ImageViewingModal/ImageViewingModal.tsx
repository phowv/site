import { getPhotoPostfix, PhotoSize, type Photo } from "../../lib/photoApi";
import FormModal from "../FormModal/FormModal";
import Button from "../UI/Button/Button";
import SecureImg from "../UI/SecureImg/SecureImg";
import cl from "./ImageViewingModal.module.css"

interface ImageViewingModalProps {
	photoDesc: Photo;
	close: () => void;
}

const ImageViewingModal = ({ photoDesc, close }: ImageViewingModalProps) => {	
	return (
		<FormModal visible={true} close={close}>
			<div className={cl.imageDescription}>
				<h1>{photoDesc.title}</h1>
				<p>Owner: <a href={`${window.location.origin}/profile/${photoDesc.owner_login}`}>{photoDesc.owner_login}</a></p>
			</div>
			<p>{photoDesc.description}</p>

			{photoDesc.tags.length !== 0 ? 
			<div className={cl.imageTagsDiv}>
				<p>Tags:</p>
				{photoDesc.tags.map(tag =>
				<p key={tag.tag_uuid} className={cl.imageTagName}>#{tag.tag_name}</p>
				)}
			</div>
			: undefined}

			<SecureImg className={cl.viewingImage} alt="image" photoUuid={photoDesc.photo_uuid} postfix={getPhotoPostfix(PhotoSize.raw)}/>
			<Button onClick={close}>done</Button>
		</FormModal>
	);
}

export default ImageViewingModal;
