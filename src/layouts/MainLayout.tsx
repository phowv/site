import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { useAuth } from "../auth/authContext";
import cl from "./MainLayout.module.css";

export default function MainLayout() {
	const { isAuth, user, logout } = useAuth();

	return (
		<div>
			<Header>
				<nav className={cl.header__nav_list}>
					<NavLink to="/">
						<img className={cl.header__home_icon} src="/ico.svg" alt="Home" />
					</NavLink>
					<NavLink className={cl.header__nav_link} to="/settings">
						Settings
					</NavLink>
					{/* <NavLink className={cl.header__nav_link} to="/profile">Profile</NavLink> */}
					<NavLink className={cl.header__nav_link} to="/create">
						Create
					</NavLink>
					{/* <NavLink className={cl.header__nav_link} to="/tags">Tags</NavLink> */}
					{/* <NavLink className={cl.header__nav_link} to="/collections">Collections</NavLink> */}

					{isAuth ? (
						<>
							<p>Hello, {user?.login}</p>
							<a className={cl.header__nav_link} onClick={logout}>
								Logout
							</a>
						</>
					) : (
						<>
							<NavLink className={cl.header__nav_link} to="/login">
								Login
							</NavLink>
							<NavLink className={cl.header__nav_link} to="/register">
								Register
							</NavLink>
						</>
					)}
				</nav>
			</Header>

			<main>
				<Outlet />
			</main>
		</div>
	);
}
