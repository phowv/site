import type { UploadingFile } from "../../lib/api/photoApi";
import useBlobUrl from "../../lib/hooks/useBlobUrl";
import classes from "./UploadImage.module.css";

interface UploadImageProps {
	file: UploadingFile;
	setEditing: (fileName: string) => void;
	onLoad?: () => void;
}

const UploadImage = ({ file, setEditing, onLoad }: UploadImageProps) => {
	const fileUrl = useBlobUrl(file.file);

	const onImageClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();
		setEditing(file.file.name);
	};

	const borderStyle = {
		pending: undefined,
		uploading: "2px solid yellow",
		uploaded: "2px solid green",
		error: "2px solid red",
		"": undefined,
	};

	return (
		<div
			onClick={onImageClick}
			className={classes.uploadImage}
			style={{ border: borderStyle[file.status ?? ""] }}
		>
			<img src={fileUrl} alt="photo" onLoad={onLoad} />
			<p>{file.file.name}</p>
			<p>{Math.round(file.file.size / 1024)} KB</p>
			{file.metadata.title ? <p>Title: {file.metadata.title}</p> : null}
		</div>
	);
};

export default UploadImage;
