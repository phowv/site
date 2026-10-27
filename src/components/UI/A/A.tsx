import cl from './A.module.css'

const A = (props: React.ButtonHTMLAttributes<HTMLAnchorElement>) => {
	return (
		<a {...props} className={cl.link} />
	);
}

export default A;
