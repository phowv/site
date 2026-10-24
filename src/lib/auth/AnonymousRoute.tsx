import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AnonymousRoute = () => {
	const { isAuth, isLoading } = useAuth();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isAuth) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default AnonymousRoute;
