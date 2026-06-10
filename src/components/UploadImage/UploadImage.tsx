import React from 'react';
import classes from './UploadImage.module.css';
import type { UploadingFile } from '../../types/files';

interface UploadImageProps {
	file: UploadingFile;
	setEditing: (fileName: string) => void;
}

const UploadImage = ({ file, setEditing }: UploadImageProps) => {
	const onImageClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault()
		setEditing(file.file.name)
	}

	return (
		<div onClick={onImageClick} className={classes.uploadImage}>
		 	<img src={URL.createObjectURL(file.file)} alt="photo"/>
			<p>{file.file.name}</p>
			<p>{Math.round(file.file.size / 1024)} KB</p>
			{file.metadata.title ? <p>Title: {file.metadata.title}</p> : null}
		</div>
	);
}

export default UploadImage;
