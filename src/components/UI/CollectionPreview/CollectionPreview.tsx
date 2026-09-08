import type { SimpleCollection } from '../../../lib/api/collectionApi';
import Button from '../Button/Button';
import cl from './CollectionPreview.module.css'

interface CollectionPreviewProps {
	collection: SimpleCollection
	open: (collection_uuid: string) => void
	edit: (collection_uuid: string) => void
	remove: (collection_uuid: string) => void
}

const CollectionPreview = ({collection, open, edit, remove}: CollectionPreviewProps) => {
	return (
		<div className={cl.collectionPreview}>
			<h2>{collection.title}</h2>
			<span>{collection.description}</span>
			<Button onClick={() => open(collection.collection_uuid)}>Open</Button>
			<Button onClick={() => edit(collection.collection_uuid)}>Edit</Button>
			<Button onClick={() => remove(collection.collection_uuid)}>Remove</Button>
		</div>
	);
}

export default CollectionPreview;
