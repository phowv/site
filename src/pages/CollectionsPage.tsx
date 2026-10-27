import CollectionsSection from "../components/sections/CollectionsSection/CollectionsSection";
import Container from "../components/UI/Container/Container";
import Link from "../components/UI/Link/Link";

interface Props {
	viewSelfCollections?: boolean;
}

const CollectionsPage = ({ viewSelfCollections }: Props) => {
	return (
		<Container>
			{viewSelfCollections &&
				<Link to="/collection/create">
					Create collection
				</Link>
			}

			<CollectionsSection viewSelfCollections={viewSelfCollections}/>
		</Container>
	);
};

export default CollectionsPage;
