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

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route element={<AnonymousRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="create" element={<CreatePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />}/>
      </Route>
    </Routes>
  )
}

export default App
