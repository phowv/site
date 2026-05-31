import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import { uploadPhoto } from '../../lib/api';

const UploadSection = () => {
	const [isDragging, setIsDragging] = useState(false);
	const [files, setFiles] = useState<File[]>([])

	const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault()
		setIsDragging(false)
		setFiles(prev => {
			Array.from(e.dataTransfer.files ?? [])
			.filter((file) => 
				file.type == 'image/jpeg' && files.findIndex(f => f.name == file.name) == -1)
			.forEach((file) => prev.push(file))
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
		files.forEach((file) => uploadPhoto("{}", file))

		setFiles([])
	}

	return (
		<section>
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
					<ul>
					{
						files.map(file => 
							<li key={file.name}><img src={URL.createObjectURL(file)} alt="photo" width="100px"/> - {file.name} - {Math.round(file.size / 1024)} KB</li>
						)
					}
					</ul>
			</div>

			<Button onClick={_ => uploadSelectedPhotos()}>Upload</Button>
		</section>
	);
}

export default UploadSection;
