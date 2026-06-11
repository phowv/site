import classes from './Header.module.css'

const Header = ({ children }: { children: React.ReactNode}) => {
	return (
		<header>
			{children}
		</header>
	);
}

export default Header;
