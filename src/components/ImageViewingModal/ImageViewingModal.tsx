import { useEffect } from "react";
import { PhotoSize, type Photo } from "../../lib/api/photoApi";
import FormModal from "../FormModal/FormModal";
import Button from "../UI/Button/Button";
import SecureImg from "../UI/SecureImg/SecureImg";
import cl from "./ImageViewingModal.module.css";

interface ImageViewingModalProps {
	photoDesc: Photo;
	close: () => void;
	next: () => void;
	prev: () => void;
}

const ImageViewingModal = ({ photoDesc, close, next, prev }: ImageViewingModalProps) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				e.stopPropagation();
				close();
			} else if (e.key === "ArrowLeft") {
				prev();
			} else if (e.key === "ArrowRight") {
				next();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);
	return (
		<FormModal visible={true} close={close}>
			<button onClick={prev}>Prev</button>
			<div className={cl.imageDescription}>
				<h1>{photoDesc.title}</h1>
				<p>
					Owner:{" "}
					<a href={`${window.location.origin}/profile/${photoDesc.owner_login}`}>
						{photoDesc.owner_login}
					</a>
				</p>
			</div>
			<p>{photoDesc.description}</p>

			{photoDesc.tags.length !== 0 ? (
				<div className={cl.imageTagsDiv}>
					<p>Tags:</p>
					{photoDesc.tags.map((tag) => (
						<p key={tag.tag_uuid} className={cl.imageTagName}>
							#{tag.tag_name}
						</p>
					))}
				</div>
			) : undefined}

			<SecureImg
				className={cl.viewingImage}
				alt="image"
				photoUuid={photoDesc.photo_uuid}
				accessKey={photoDesc.access_key}
				photoSize={PhotoSize.medium}
			/>
			<Button onClick={close}>done</Button>

			<button onClick={next}>Next</button>
		</FormModal>
	);
};

export default ImageViewingModal;
