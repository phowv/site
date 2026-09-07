import cl from './TagsList.module.css';
import type { Tag } from '../../lib/api/photoApi';

interface TagsListProps {
	tags: Tag[];
}

const TagsList = ({ tags }: TagsListProps) => {
	return (
		<div className={cl.tagList}>
			{tags.map(tag => 
				<div key={tag.tag_uuid} className={cl.tagListElement}>
					<h3>{tag.tag_name}</h3>
					<p>{tag.tag_description}</p>
				</div>
			)}
		</div>
	);
}

export default TagsList;