import { NavLink } from "react-router-dom";
import CollectionSection from "../../components/sections/CollectionsSection/CollectionsSection";
import cl from "./CollectionsPage.module.css"

const CollectionsPage = () => {
	return (
		<div className={cl.container}>
			<NavLink className={cl.nav_link} to="/collection/create">Create</NavLink>

			<CollectionSection />
		</div>
	);
};

export default CollectionsPage;
