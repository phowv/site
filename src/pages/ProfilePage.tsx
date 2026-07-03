import { useParams } from "react-router-dom";
import ViewSection from "../components/sections/ViewSection";

const ProfilePage = () => {
	const { user } = useParams()

	return (
		<div>
			{user ?
				<>
					<h1>{user}'s photos</h1>
					<ViewSection owner_login={user}/>
				</>
				:
				<p>Empty user</p>
			}
		</div>
	);
}

export default ProfilePage;
