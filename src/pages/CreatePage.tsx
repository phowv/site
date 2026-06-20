import { useState } from 'react';
import type { UploadingFile } from '../types/files';
import { uploadPhoto } from '../lib/photoApi';
import UploadImageList from '../components/UploadImageList/UploadImageList';
import Button from '../components/UI/Button/Button';
import ImageEditingModal from '../components/ImageEditingModal/ImageEditingModal';

const CreatePage = () => {
	const [isDragging, setIsDragging] = useState(false)
	const [files, setFiles] = useState<UploadingFile[]>([])

	const [imageEditing, setImageEditing] = useState({visible: false, fileName: ""})

	const editingFile = files.find(f => f.file.name === imageEditing.fileName)

	const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault()
		setIsDragging(false)
		setFiles(prev => {
			const incoming = Array.from(e.dataTransfer.files ?? [])
			.filter((file) => file.type == 'image/jpeg')
			.filter((file) => prev.findIndex(f => f.file.name === file.name) === -1)
			.map((file) => ({file, isUploaded: false, metadata: {title: undefined, description: undefined}}))
			return [...prev, ...incoming]
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

	const uploadSelectedPhotos = async () => {
		const toUpload = [...files.filter(f => f.status != "uploading" && f.status != "uploaded")]

		setFiles(prev => prev.map(f =>
				toUpload.some(x => x.file.name === f.file.name) ? {...f, isUploaded: false, status: "uploading"} : f
		));

		const results = await Promise.allSettled(
			toUpload.map(async (f: UploadingFile) => {
				await uploadPhoto(JSON.stringify(f.metadata), f.file);
				return f.file.name;
			})
		);

		const succeededNames = new Set<string>();
		results.forEach(r => {
			if (r.status == "fulfilled") succeededNames.add(r.value);
		});

		setFiles(prev => prev
			.map(f => {
				return {...f, status: succeededNames.has(f.file.name) ? "uploaded" : "error" };
			}
		));


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
					{files.length == 0 ? <p>drag and drop .jpg images</p> : null}
					<UploadImageList files={files} setEditing={(fileName: string) => setImageEditing(prev => ({...prev, visible: true, fileName: fileName}))}/>
			</div>

			<Button isActive={files.length != 0} onClick={_ => uploadSelectedPhotos()}>Upload</Button>
			<Button isActive={files.length != 0} onClick={_ => setFiles([])}>Clear</Button>
		</section>
	);
}

export default CreatePage;
