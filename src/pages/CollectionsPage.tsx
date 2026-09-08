import { NavLink } from 'react-router-dom';
import CollectionSection from '../components/sections/CollectionSection';

const CollectionsPage = () => {
	return (
		<>
			<NavLink to="/collection/create">Create</NavLink>

			<CollectionSection />
		</>
	);
}

export default CollectionsPage;
