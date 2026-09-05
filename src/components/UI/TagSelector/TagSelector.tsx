import React, { useEffect, useMemo, useState } from 'react';
import type { PhotoTagMetadata } from '../../../types/tag';
import { fetchTags } from '../../../lib/photoApi';
import cl from './TagSelector.module.css'
import Input from '../Input/Input';

interface TagSelectorProps {
	tags: string[];
	setTags: (f: (prev: string[]) => string[]) => void;
	label?: string;
}


const TagSelector = ({ tags, setTags, label}: TagSelectorProps) => {
	const [status, setStatus] = useState('empty');
	const [tagsList, setTagsList] = useState<PhotoTagMetadata[]>([]);
	const [isFocusTagsList, setIsFocusTagsList] = useState<boolean>(false);
	const [tagFilter, setTagFilter] = useState<string>('');
	const [availableTagsList, setAvilableTagsList] = useState<React.ReactNode[] | undefined>()

	const selectedTagsList = useMemo(() => {
		return tagsList.filter(t => tags.includes(t.tag_uuid));
	}, [tagsList, tags]);

	useEffect(() => {
		setStatus('loading')
		fetchTags()
			.then(loaded_tags => {
				setTagsList(loaded_tags);				
				setStatus('loaded');
			})
			.catch(err => {
				console.log('Error fetch tags: ', err);
				setStatus('error');
			})
	}, [])

	useEffect(() => {
		setAvilableTagsList(tagsList
			.filter(tag => (!selectedTagsList.includes(tag)) && (tag.tag_name.includes(tagFilter) || tagFilter === ''))
			.map(tag => 
				<p
					key={tag.tag_uuid}
					className={cl.tagItem}
					onClick={() => {					
						setTags(prev => [...prev, tag.tag_uuid])
						}}>
					{tag.tag_name}
				</p>
			))
	}, [tagFilter, status, selectedTagsList])

	return (
	<div className={cl.tagSelector}>
		{label && <h2>{label}</h2>}

		{status == 'loading' && <p>Loading tags...</p>}
		{status == 'error' && <p>Failed to load tags</p>}
		{status == 'loaded' &&
			<>
			<div
				tabIndex={-1}
				onFocus={() => setIsFocusTagsList(true)}
				onBlur={(e) => {
					if (!e.currentTarget.contains(e.relatedTarget)) {
						setIsFocusTagsList(false);
					}
				}}>

				<Input placeholder='Tag name...' value={tagFilter} onChange={e => setTagFilter(e.target.value)}/>
				{isFocusTagsList && 
				<>
					{availableTagsList?.length == 0
						? <p>Available tags list is empty</p>
						:
						<>
							<h4>Available tags:</h4>
							{availableTagsList}
						</>
					}
					<hr/>
				</>}
			</div>

			{tags.length == 0
			?	<p>Selected tags list is empty</p>
			:
			<div>
				<h4>Selected tags:</h4>
				{selectedTagsList.map(tag =>
				<p
					key={tag.tag_uuid}
					className={cl.tagItem}
					onClick={() => {
						setTags(prev => prev.filter(t => t !== tag.tag_uuid));
					}}>{tag.tag_name}</p>
				)}
			</div>}
			</>
		}
	</div>
	);
}

export default TagSelector;
