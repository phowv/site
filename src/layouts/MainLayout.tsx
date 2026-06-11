import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { useAuth } from "../auth/authContext";
import Button from "../components/UI/Button/Button";

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
        </nav>
      </Header>

      <main style={{ padding: "20px 0" }}>
        <Outlet />
      </main>
    </div>
  );
}