import type { UploadingFile } from '../../types/files';
import UploadImage from '../UploadImage/UploadImage';
import classes from './UploadImageList.module.css';

interface UploadImageListProps {
	files: UploadingFile[];
	setEditing: (fileName: string) => void;
}

const UploadImageList = ({ files, setEditing }: UploadImageListProps) => {
	return (
		<ul className={classes.uploadList}>
			{
				files.map(file => 
					<li key={file.file.name} className={classes.uploadListElement}>
						<UploadImage file={file} setEditing={setEditing}/>
					</li>
				)
			}
		</ul>
	);
}

export default UploadImageList;
