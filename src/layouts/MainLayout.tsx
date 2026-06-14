import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { useAuth } from "../auth/authContext";
import Button from "../components/UI/Button/Button";
import { refreshUser } from "../lib/authApi";

export default function MainLayout() {
  const {isAuth, user, logout} = useAuth()

  return (
    <div>
      <Header>
        <nav style={{ display: "flex", gap: "16px" }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/profile">Profile</NavLink>

          {isAuth ? (
            <>
              <p>Hello, {user?.login}</p>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
          <Button onClick={async () => {
                localStorage.removeItem("access_token")
                const resp = await refreshUser()
                console.log("refresh user", resp)
                localStorage.setItem("access_token", resp.access_token)
              }}>Refresh</Button>
        </nav>
      </Header>

      <main style={{ padding: "20px 0" }}>
        <Outlet />
      </main>
    </div>
  );
}