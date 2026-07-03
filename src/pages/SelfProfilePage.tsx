import { useAuth } from "../auth/authContext";
import EditSection from "../components/sections/EditSection";

const SelfProfilePage = () => {
	const {user} = useAuth()

	return (
		<div>
			{user ?
				<>
					<h1>User info</h1>
					<p>Login: {user.login}</p>
					<p>Email: {user.email}</p>
					<p>Description: {user.description}</p>

					<h2>{user.login}'s photos</h2>
					<EditSection owner_login={user.login}/>
				</>
				:
				<p>Empty user</p>
			}
		</div>
	);
}

export default SelfProfilePage;