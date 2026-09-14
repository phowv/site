import { useState } from 'react';
import cl from './TagInput.module.css'
import type { UploadingTagMetadata } from '../../../types/tag';
import Input from '../Input/Input';
import Button from '../Button/Button';

interface TagInputProps {
	upload: (tag: UploadingTagMetadata) => Promise<void>;
}

const TagInput = ({ upload }: TagInputProps) => {
	const [tag, setTag] = useState<UploadingTagMetadata>({ tag_name: "" });
	const [error, setError] = useState<string>("");

	const setTagName = (name: string) => {
		setTag(prev => ({ ...prev, tag_name: name.replaceAll(/\s+/g, "").trim() }));
	}

	const setTagDescription = (desc: string) => {
		setTag(prev => ({ ...prev, tag_description: desc }));
	}

	const validateAndUpload = async () => {
		if (tag.tag_name === "") {
			setError('Tag name must be set');
			return;
		}

		await upload(tag);

		setTag({ tag_name: "" });
		setError("");
	}

	return (
		<div className={cl.tagInput}>
      {error && <p style={{ color: "red" }}>{error}</p>}

			<form onSubmit={e => {
				e.preventDefault();
				validateAndUpload();
			}}>
				<Input placeholder='Tag name...' value={tag.tag_name} onChange={e => setTagName(e.target.value)}/>

				<Input placeholder='Tag description (optional)...' value={tag.tag_description ?? ""} onChange={e => setTagDescription(e.target.value)}/>

				<Button>Save</Button>
			</form>
		</div>
	);
}

export default TagInput;
