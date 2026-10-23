import type { SimpleCollection } from "../../../lib/api/collectionApi";
import { PhotoSize } from "../../../lib/api/photoApi";
import SecureImg from "../SecureImg/SecureImg";
import cl from "./CollectionPreview.module.css";

interface CollectionPreviewProps {
	collection: SimpleCollection;
	open: () => void;
	previewPhoto?: {
		photoUuid: string;
		accessKey: string;
	}
}

const CollectionPreview = ({ collection, open, previewPhoto }: CollectionPreviewProps) => {
	return (
		<div
			className={`${cl.collectionPreview} ${!previewPhoto ? cl.noPreview : ''}`}
			onClick={open}
		>
			<div className={cl.descriptionContainer}>
				<h2 className={cl.title}>{collection.title}</h2>
			</div>
			{previewPhoto &&
			<>
				<SecureImg
				className={cl.previewPhoto}
				photoUuid={previewPhoto.photoUuid}
				photoSize={PhotoSize.small}
				accessKey={previewPhoto.accessKey}
				/>
			</>
			}
		</div>
	);
};

export default CollectionPreview;
