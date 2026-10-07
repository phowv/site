import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AnonymousRoute from "./auth/AnonymousRoute";
import ProtectedRoute from "./auth/ProtectedRoute";
import CreatePage from "./pages/CreatePage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import VerificaticationPage from "./pages/VerificaticationPage";
import SelfProfilePage from "./pages/SelfProfilePage";
import TagsPage from "./pages/TagsPage";
import CollectionPage from "./pages/CollectionPage";
import CollectionsPage from "./pages/CollectionsPage";
import CollectionEditPage from "./pages/CollectionEditPage";
import CollectionCreatePage from "./pages/CollectionCreatePage";
import SinglePhotoViewPage from "./pages/SinglePhotoViewPage";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { AuthProvider } from "./auth/authContext";
import App from "./App";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={
				<AuthProvider>
					{" "}
					<App />{" "}
				</AuthProvider>
			}
		>
			<Route index element={<HomePage />} />

			<Route element={<AnonymousRoute />}>
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />
				<Route path="register/verify" element={<VerificaticationPage />} />
			</Route>

			<Route element={<ProtectedRoute />}>
				<Route path="profile" element={<SelfProfilePage />} />
				<Route path="create" element={<CreatePage />} />
				<Route path="tags" element={<TagsPage />} />
				<Route path="collection/create" element={<CollectionCreatePage />} />
			</Route>

			<Route path="photo/:photo_uuid" element={<SinglePhotoViewPage />} />
			<Route path="profile/:user" element={<ProfilePage />} />
			<Route path="collections" element={<CollectionsPage />} />
			<Route path="collection/:collection_uuid" element={<CollectionPage />} />
			<Route path="collection/:collection_uuid/edit" element={<CollectionEditPage />} />

			<Route path="settings" element={<SettingsPage />} />
			<Route path="notfound" element={<NotFoundPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Route>,
	),
);
