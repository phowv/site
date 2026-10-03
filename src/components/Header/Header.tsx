import cl from "./Header.module.css";

const Header = ({ children }: { children: React.ReactNode }) => {
	return (
	<header className={cl.header}>
		<div className={cl.header__container}>
			{children}
		</div>
	</header>);
};

export default Header;
