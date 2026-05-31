import Button from '../UI/Button/Button';
import classes from './Header.module.css'

const Header = ({switchUploadState, switchButtonText}: {switchUploadState: Function, switchButtonText: string}) => {
	return (
		<header>
			<span className={classes.header_element}>Photo viewer service</span>
			<Button className={classes.header_element} onClick={_ => switchUploadState()}>{switchButtonText}</Button>
		</header>
	);
}

export default Header;
