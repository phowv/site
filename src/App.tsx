import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import NotFoundPage from "./pages/NotFoundPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AnonymousRoute from "./auth/AnonymousRoute"
import ProtectedRoute from "./auth/ProtectedRoute"
import CreatePage from "./pages/CreatePage"
import SettingsPage from "./pages/SettingsPage"
import VerificaticationPage from "./pages/VerificaticationPage"
import SelfProfilePage from "./pages/SelfProfilePage"
import TagsPage from "./pages/TagsPage"
import CollectionPage from "./pages/CollectionPage"
import CollectionsPage from "./pages/CollectionsPage"
import CollectionEditPage from "./pages/CollectionEditPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
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
        </Route>

        <Route path="profile/:user" element={<ProfilePage />} />
        <Route path="collections" element={<CollectionsPage />} />
        <Route path="collection/:collection_uuid" element={<CollectionPage />} />
        <Route path="collection/:collection_uuid/edit" element={<CollectionEditPage />} />

        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />}/>
      </Route>
    </Routes>
  )
}

export default App
