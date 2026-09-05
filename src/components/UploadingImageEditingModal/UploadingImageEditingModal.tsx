import { useEffect, useState } from 'react';
import FormModal from '../FormModal/FormModal';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import type { UploadingFile } from '../../types/files';
import { rotateFile90 } from '../../lib/utils/imageUtils';
import TagSelector from '../UI/TagSelector/TagSelector';
import { AccessModifier } from '../../types/accessModifier';

interface UploadingImageEditingModalProps {
	visible: boolean;
	inputFile: UploadingFile;
	doneEditingImage: (f: UploadingFile | null) => void;
}

const UploadingImageEditingModal = ({ visible, inputFile, doneEditingImage }: UploadingImageEditingModalProps) => {
	const [editingFile, setEditingFile] = useState<UploadingFile>(inputFile);
	const [editingFileSrc, setEditingFileSrc] = useState<string | null>(null)
	const [tags, setTags] = useState<string[]>(inputFile.metadata.tag_uuids ?? [])
	const [accessLevel, setAccessLevel] = useState<AccessModifier>(AccessModifier.private)

	useEffect(() => {
		if (!editingFile) {
			setEditingFileSrc(null);
			return;
		}

		const url = URL.createObjectURL(editingFile.file);
		setEditingFileSrc(url);
		return () => { URL.revokeObjectURL(url); };
	}, [editingFile])

	const rotateEditingImage = async (isRight: boolean) => {
		if (!editingFile) return;
		const rotated = await rotateFile90(editingFile.file, isRight);
		setEditingFile(prev => ({...prev, file: rotated}));
	}

	const doneEditing = (isRemove: boolean = false) => {
		if (isRemove) {
			const ok = confirm("Are you sure?");
			if (!ok) return;

			doneEditingImage(null);
			return;
		}

		const nextMetadata = tags.length !== 0 ? { ...editingFile.metadata, tag_uuids: tags } : editingFile.metadata;

		const next = {...editingFile, metadata: {...nextMetadata, access_level: accessLevel}};

		setEditingFile(next);

		doneEditingImage(next);
	}

	return (
		<FormModal visible={visible} close={doneEditing}>
			{editingFileSrc ? <img src={editingFileSrc} width="400px" height="auto"/> : <p>Editing image</p>}
			<p>File name: {editingFile.file.name}</p>
			<p>File size: {Math.round(editingFile.file.size / 1024)} KB</p>

			<p>Type image title: </p>
			<Input placeholder="Image title (optional)..." value={editingFile.metadata.title ?? ""} onChange={e =>
				setEditingFile(prev => ({...prev, metadata: {...prev.metadata, title: e.target.value}}))}/>

			<p>Type image description:</p>
			<Input placeholder="Image description (optional)..." value={editingFile.metadata.description ?? ""} onChange={e =>
				setEditingFile(prev => ({...prev, metadata: {...prev.metadata, description: e.target.value}}))}/>

			<p>Access level:</p>
			<select value={accessLevel} onChange={e => setAccessLevel(e.target.value as AccessModifier)}>
				<option value={AccessModifier.private}>Private</option>			
				<option value={AccessModifier.protected}>Protected</option>			
				<option value={AccessModifier.public}>Public</option>			
			</select>	
			
			<TagSelector label="Tags" tags={tags} setTags={setTags}/>

			<br />
			<Button onClick={_ => rotateEditingImage(false)}>Rotate left</Button>
			<Button onClick={_ => rotateEditingImage(true)}>Rotate right</Button>
			<br />
			<Button onClick={_ => doneEditing(true)}>Remove</Button>
			<Button onClick={_ => doneEditing()}>Done</Button>
		</FormModal>
	);
}

export default UploadingImageEditingModal;
