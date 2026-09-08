import { useEffect, useState } from 'react';
import { deleteCollection, fetchCollections, type SimpleCollection } from '../../lib/api/collectionApi';
import CollectionPreview from '../UI/CollectionPreview/CollectionPreview';
import { useNavigate } from 'react-router-dom';

interface CollectionSectionProps {
	owner_login?: string;
}

const CollectionSection = ({ owner_login }: CollectionSectionProps) => {
	const [status, setStatus] = useState('empty')
	const [collectionsList, setCollectionsLst] = useState<Array<SimpleCollection>>([])

	const navigate = useNavigate()

	useEffect(() => {
		setStatus('loading')
		fetchCollections(owner_login)
			.then(collections => {
				setCollectionsLst(collections)
				setStatus('loaded')
			})
			.catch(err => {
				console.log('Error fetch collections: ', err)
				setStatus('error')
			})
	}, [])

	const handleRemoveCollection = (collection_uuid: string) => {
		deleteCollection(collection_uuid)
			.catch(err => console.error("Error delete collection: ", err))
	}

	return (
		<>			
			{status == 'loading' && <p>Loading...</p>}
			{status == 'error' && <p>Loading error</p>}
			{status == 'loaded' &&
			collectionsList.length == 0 ?
			<p>Collections list is empty</p>
			:
			<section style={{gap: '10px'}}>
				{collectionsList.map(collection =>
					<CollectionPreview
						key={collection.collection_uuid}
						collection={collection}
						open={collection_uuid => {navigate(`/collection/${collection_uuid}`)}}
						edit={collection_uuid => {navigate(`/collection/${collection_uuid}/edit`)}}
						remove={handleRemoveCollection}
						/>	
				)}
			</section>
			}
		</>
	);
}

export default CollectionSection;
