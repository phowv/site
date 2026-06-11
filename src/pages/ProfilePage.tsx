import { useAuth } from "../auth/authContext";

const ProfilePage = () => {
	const {user} = useAuth()

	return (
		<div>
			<h1>User info</h1>

			{user ?
				<>
					<p>Login: {user.login}</p>
					<p>Email: {user.email}</p>
					<p>Description: {user.description}</p>
				</>
				:
				<p>Empty user</p>
			}
		</div>
	);
}

export default ProfilePage;
