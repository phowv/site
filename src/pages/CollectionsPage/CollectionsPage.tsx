import CollectionSection from "../../components/sections/CollectionsSection/CollectionsSection";
import cl from "./CollectionsPage.module.css";

const CollectionsPage = () => {
	return (
		<div className={cl.container}>
			<CollectionSection />
		</div>
	);
};

export default CollectionsPage;
