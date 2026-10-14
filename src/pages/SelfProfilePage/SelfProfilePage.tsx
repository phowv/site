import { useAuth } from "../../auth/authContext";
import EditSection from "../../components/sections/EditSection/EditSection";
import cl from "./SelfProfilePage.module.css";

const SelfProfilePage = () => {
	const { user } = useAuth();

	return (
		<div className={cl.profilePage}>
			{user ? (
				<>
					<span>
						<h1>User info</h1>
						<p>
							Login:{" "}
							<a
								className={cl.profileLink}
								href={`${window.location.origin}/profile/${user.login}`}
							>
								{user.login}
							</a>
						</p>
						<p>Email: {user.email}</p>
						<p>Description: {user.description}</p>
					</span>

					<span>
						<h2>Your photos</h2>
						<EditSection owner_login={user.login} />
					</span>
				</>
			) : (
				<p>Empty user</p>
			)}
		</div>
	);
};

export default SelfProfilePage;
