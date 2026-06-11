import { useAuth } from './authContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
	const {isAuth, isLoading} = useAuth()

	if (isLoading) {
		return (<div>Loading...</div>);
	}

	if (!isAuth) {
		return (<Navigate to="/login" replace />);
	}

	return (<Outlet/>);
}

export default ProtectedRoute;
