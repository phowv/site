import ImageSection from './ImageSection';
import type { Photo } from '../../lib/photoApi';
import { useState } from 'react';
import ImageEditingModal from '../ImageEditingModal/ImageEditingModal';

interface EditSectionProps {
	owner_login: string;
}

const EditSection = (props: EditSectionProps) => {
	const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
	const [version, setVersion] = useState(0);

	return (
		<>
			{editingPhoto ?
			<ImageEditingModal
				photoDesc={editingPhoto}
				close={() => setEditingPhoto(null)}
				onChangePhoto={() => setVersion(v => v + 1)}
			/> : undefined}
			<ImageSection owner_login={props.owner_login} open_photo={setEditingPhoto} version={version}/>
		</>
	);
}

export default EditSection;
