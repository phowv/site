import { useState } from 'react';
import cl from './TagsInput.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import type { UploadingTagMetadata } from '../../../types/tag';

interface TagsInputProps {
	tags: Map<string, UploadingTagMetadata>;
	setTags: (f: (prev: Map<string, UploadingTagMetadata>) => Map<string, UploadingTagMetadata>) => void;
	label?: string;
}

const TagsInput = ({  }: TagsInputProps) => {
	const [currentTag, setCurrentTag] = useState<UploadingTagMetadata>();

	const addNewTag = () => {
		// if (!currentTag || !currentTag.title || currentTag.title === "") return;

		// const tagName = currentTag.title ?? "";

		// setTags(prev => new Map(prev).set(tagName, currentTag));
		// setCurrentTag({});
	}

	return (
		<div className={cl.imageTagInput}>
			{/* <p>{label ?? "New tag:"}</p>
				<Input
					value={currentTag?.title ?? ""}
					placeholder="Tag name..."
					onKeyDown={(e) => { if (e.key == "Enter") addNewTag(); }}
					onChange={(e) => setCurrentTag(prev => ({...prev, title: e.target.value.trim().replaceAll(" ", "")}))}/>

				<Input
					value={currentTag?.description ?? ""}
					placeholder="Tag description..."
					onKeyDown={(e) => { if (e.key == "Enter") addNewTag(); }}
					onChange={(e) => setCurrentTag(prev => ({...prev, description: e.target.value}))}/>

				<Button onClick={addNewTag} isActive={currentTag?.title !== ""}>Add new tag</Button>

				{tags.size !== 0 ? <p>Tags:</p> : undefined}
				{[...tags].map(tag => 
					<div key={tag[0]} className={cl.imageTagListElement}>
						<h3>{tag[1].title}</h3>
						<p>{tag[1].description}</p>
						<Button onClick={() => setTags(prev => {
							let newTags = new Map(prev);
							newTags.delete(tag[0]);
							return newTags;
							})}>Remove</Button>
					</div>
				)} */}
		</div>
	);
}

export default TagsInput;
