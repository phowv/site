import cl from './Header.module.css'

const Header = ({ children }: { children: React.ReactNode}) => {
	return (
		<header className={cl.header}>
			{children}
		</header>
	);
}

export default Header;
