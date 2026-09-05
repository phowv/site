import { useState } from 'react';
import { API_BASE } from '../../lib/axios';
import { deletePhoto, patchPhoto, type PatchPhotoProps, type Photo } from '../../lib/photoApi';
import FormModal from '../FormModal/FormModal';
import cl from './ImageEditingModal.module.css'
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import TagSelector from '../UI/TagSelector/TagSelector';

interface ImageEditingModalProps {
	photoDesc: Photo;
	close: () => void;
	onChangePhoto: () => void;
}

const ImageEditingModal = (props: ImageEditingModalProps) => {
	const [title, setTitle] = useState(props.photoDesc.title)
	const [description, setDescription] = useState(props.photoDesc.description)
	const [tags, setTags] = useState<string[]>(props.photoDesc.tags.map(t => t.tag_uuid))

	const doneEditingCallback = async () => {
		let patchData: PatchPhotoProps = {};

		if (title != props.photoDesc.title) {
			patchData.title = title;
		}

		if (description != props.photoDesc.description) {
			patchData.description = description;
		}

		// const photoTags = props.photoDesc.tags.filter(s => s.tag_name !== "")
		// if (tags.size !== photoTags.length || !photoTags.every(v => tags.has(v))) {
		// 	patchData.tags = [...tags].join(";");
		// }

		if (Object.keys(patchData).length !== 0) {
			try {
				await patchPhoto(props.photoDesc.photo_uuid, patchData);
				props.onChangePhoto();
			} catch {
				alert("Error update photo");
			}
		}

		props.close();
	}

	const cancelPhotoCallback = async () => {
		const photoTags = props.photoDesc.tags.filter(s => s.tag_name !== "")

		if (title != props.photoDesc.title
			|| description != props.photoDesc.description
			|| tags.length !== photoTags.length
			|| !photoTags.every(v => tags.includes(v.tag_uuid))) {
			const ok = confirm("Are you sure?");
			if (!ok) return;
		}

		props.close();
	}

	const deletePhotoCallback = async () => {
		const ok = confirm("Are you sure?");
		if (!ok) return;

		try {
			await deletePhoto(props.photoDesc.photo_uuid);
			props.onChangePhoto();
		} catch {
			alert("Error delete photo");
		}

		props.close();
	}

	return (
		<FormModal visible={true} close={cancelPhotoCallback}>
			<img className={cl.viewingImage} src={`${API_BASE}/photo/${props.photoDesc.photo_uuid}`} alt="image" />

			<p>Title:</p>
			<Input value={title} onChange={(e) => setTitle(e.target.value)}/>

			<p>Description:</p>
			<Input value={description} onChange={(e) => setDescription(e.target.value)}/>
	
			<TagSelector tags={tags} setTags={setTags}/>	

			<br />
			<Button onClick={cancelPhotoCallback}>Cancel</Button>
			<Button onClick={deletePhotoCallback}>Delete</Button>
			<Button onClick={doneEditingCallback}>Done</Button>
		</FormModal>
	);
}

export default ImageEditingModal;
