import { useRef } from "react";
import type { UploadingFile } from "../../lib/api/photoApi";
import { MasonryGrid, type MasonryGridHandle } from "../MasonryGrid/MasonryGrid";
import UploadImage from "../UploadImage/UploadImage";
import classes from "./UploadImageList.module.css";

interface UploadImageListProps {
	files: UploadingFile[];
	setEditing?: (fileIndex: number) => void;
}

const UploadImageList = ({ files, setEditing }: UploadImageListProps) => {
	const masonryRef = useRef<MasonryGridHandle>(null);

	return (
		<MasonryGrid
			ref={masonryRef}
			columns={Number(localStorage.getItem("feedImageColumnsCount") ?? "5")}
			className={classes.uploadList}
		>
			{files.map((file, idx) => (
				<li key={file.file.name} className={classes.uploadListElement}>
					<UploadImage
						file={file}
						setEditing={() => setEditing?.(idx)}
						onLoad={() => masonryRef.current?.reflow()}
					/>
				</li>
			))}
		</MasonryGrid>
	);
};

export default UploadImageList;
