import { NavLink, type NavLinkProps } from "react-router-dom";
import cl from './Link.module.css'

const Link = (props: NavLinkProps) => {
	return (
		<NavLink {...props} className={cl.link} />
	);
}

export default Link;
