import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import cl from "./MainLayout.module.css";
import useAuth from "../lib/hooks/useAuth";
import Link from "../components/UI/Link/Link";
import A from "../components/UI/A/A";

export default function MainLayout() {
	const { isAuth, user, logout } = useAuth();

	return (
		<div className={cl.page}>
			<Header>
				<nav className={cl.header__nav_list}>
					<NavLink to="/">
						<img className={cl.header__home_icon} src="/ico.svg" alt="Home" />
					</NavLink>
					<Link to="/collections">
						Collections
					</Link>
					<Link to="/settings">
						Settings
					</Link>
					<Link to="/profile">
						Profile
					</Link>
					<Link to="/create">
						Create
					</Link>
					{/* <Link  to="/tags">Tags</Link> */}

					{isAuth ? (
						<>
							<p>Hello, {user?.login}</p>
							<A onClick={logout}>
								Logout
							</A>
						</>
					) : (
						<>
							<Link to="/login">
								Login
							</Link>
							<Link to="/register">
								Register
							</Link>
						</>
					)}
				</nav>
			</Header>

			<main className={cl.content}>
				<Outlet />
			</main>
		</div>
	);
}
