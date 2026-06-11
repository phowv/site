import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import { uploadPhoto } from '../../lib/photoApi';
import UploadImageList from '../UploadImageList/UploadImageList';
import type { UploadingFile } from '../../types/files';
import ImageEditingModal from '../ImageEditingModal/ImageEditingModal';

const UploadSection = () => {
	const [isDragging, setIsDragging] = useState(false)
	const [files, setFiles] = useState<UploadingFile[]>([])

	const [imageEditing, setImageEditing] = useState({visible: false, fileName: ""})

	const editingFile = files.find(f => f.file.name === imageEditing.fileName)

	const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault()
		setIsDragging(false)
		setFiles(prev => {
			Array.from(e.dataTransfer.files ?? [])
			.filter((file) => 
				file.type == 'image/jpeg' && files.findIndex(f => f.file.name == file.name) == -1)
			.forEach((file) => prev.push({file: file, metadata: {title: undefined, description: undefined}}))
			return prev
		})
	}

	const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = 'copy'
		setIsDragging(true)
	}

	const onDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault()
		setIsDragging(false)
	}

	const uploadSelectedPhotos = () => {
		files.forEach((file) => uploadPhoto(JSON.stringify(file.metadata), file.file))

		setFiles([])
	}

	const doneEditingImage = (f: UploadingFile | null) => {
		setFiles(prev => {
			if (f == null) {
				return prev.filter(p => p !== editingFile);
			}
			return prev.map(p => (p === editingFile ? f : p));
		});
		setImageEditing(prev => ({...prev, visible: false, fileName: ""}));
	}

	return (
		<section>
			{editingFile ? <ImageEditingModal visible={imageEditing.visible} inputFile={editingFile} doneEditingImage={doneEditingImage}/> : null}
			<div
				role='button'
				onDrop={onDrop}
				onDragOver={onDragOver}
				onDragLeave={onDragLeave}
				style={{
					border: "2px dashed #ccc",
					padding: 20,
					textAlign: "center",
					background: isDragging ? "#f0f8ff" : "transparent",
					cursor: "pointer",
				}}
				>
					<UploadImageList files={files} setEditing={(fileName: string) => setImageEditing(prev => ({...prev, visible: true, fileName: fileName}))}/>
			</div>

			<Button onClick={_ => uploadSelectedPhotos()}>Upload</Button>
		</section>
	);
}

export default UploadSection;
