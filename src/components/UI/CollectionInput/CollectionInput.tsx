import { useState } from 'react';
import cl from './CollectionInput.module.css'
import Input from '../Input/Input';
import Button from '../Button/Button';
import type { UploadingCollectionMetadata } from '../../../types/collection';
import { AccessModifier } from '../../../types/accessModifier';

interface CollectionInputProps {
	upload: (tag: UploadingCollectionMetadata) => void;
}

const CollectionInput = ({ upload }: CollectionInputProps) => {
	const [collection, setCollection] = useState<UploadingCollectionMetadata>({ title: "", access_level: AccessModifier.private });
	const [error, setError] = useState<string>("");

	const setCollectionTitle = (title: string) => {
		setCollection(prev => ({ ...prev, title: title }));
	}

	const setCollectionDescription = (desc: string) => {
		setCollection(prev => ({ ...prev, description: desc }));
	}

	const setCollectionAccessLevel = (level: AccessModifier) => {
		setCollection(prev => ({ ...prev, access_level: level }))
	}

	const validateAndUpload = async () => {
		if (collection.title === "") {
			setError('Collection name must be set');
			return;
		}

		await upload(collection);

		setCollection({ title: "", access_level: AccessModifier.private });
		setError("");
	}

	return (
		<div className={cl.tagInput}>
			<h1>Create collection</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

			<form onSubmit={e => {
				e.preventDefault();
				validateAndUpload();
			}}>
				<Input placeholder='Tag name...' value={collection.title} onChange={e => setCollectionTitle(e.target.value)}/>

				<Input placeholder='Tag description (optional)...' value={collection.description ?? ""} onChange={e => setCollectionDescription(e.target.value)}/>

				<p>Access level:</p>
				<select value={collection.access_level} onChange={e => setCollectionAccessLevel(e.target.value as AccessModifier)}>
					<option value={AccessModifier.private}>Private</option>			
					<option value={AccessModifier.protected}>Protected</option>			
					<option value={AccessModifier.public}>Public</option>			
				</select>	

				<Button>Save</Button>
			</form>
		</div>
	);
}

export default CollectionInput;
