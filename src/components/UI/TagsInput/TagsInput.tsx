import { useState } from 'react';
import cl from './TagsInput.module.css';
import Button from '../Button/Button';
import Input from '../Input/Input';

interface TagsInputProps {
	tags: Set<string>;
	setTags: (f: (prev: Set<string>) => Set<string>) => void;
	label?: string;
}

const TagsInput = ({ tags, setTags, label }: TagsInputProps) => {
	const [currentTag, setCurrentTag] = useState("");

	const addNewTag = () => {
		if (currentTag === "") return;

		setTags(prev => new Set(prev).add(currentTag));
		setCurrentTag("");
	}

	return (
		<div className={cl.imageTagInput}>
			<p>{label ?? "New tag:"}</p>
				<Input value={currentTag} onKeyDown={(e) => { if (e.key == "Enter") addNewTag(); }} onChange={(e) => setCurrentTag(e.target.value.trim().replaceAll(" ", ""))}/>
				<Button onClick={addNewTag} isActive={currentTag !== ""}>Add new tag</Button>

				{tags.size !== 0 ? <p>Tags:</p> : undefined}
				{[...tags].map(tag => 
					<div key={tag} className={cl.imageTagListElement}>
						<h3>{tag}</h3>
						<Button onClick={() => setTags(prev => {
							let newTags = new Set(prev);
							newTags.delete(tag);
							return newTags;
							})}>Remove</Button>
					</div>
				)}
		</div>
	);
}

export default TagsInput;
