import { useEffect, useState } from 'react';
import { fetchTags, uploadTag, type Tag } from '../lib/photoApi';
import TagsList from '../components/TagsList/TagsList';
import TagInput from '../components/UI/TagInput/TagInput';
import type { UploadingTagMetadata } from '../types/tag';

const TagsPage = () => {
	const [status, setStatus] = useState('empty');
	const [tagsList, setTagsList] = useState<Tag[]>([]);

	const loadTags = async () => {
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
	}
	
	useEffect(() => {
		loadTags();
	}, [])

	const handleUpload = async (tag: UploadingTagMetadata) => {
		try {
			await uploadTag(tag);
			await loadTags();
		
		} catch(err) {
			console.error(err);
		}
	}

	return (
		<section>
			{status == 'loading' && <p>Loading tags...</p>}
			{status == 'error' && <p>Failed to load tags</p>}
			{status == 'loaded' &&
				<>
					<TagInput upload={handleUpload}/>
					<TagsList tags={tagsList}/>
				</>
			}
		</section>
	);
}

export default TagsPage;
