import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

export default function MainLayout() {
  return (
    <div>
      <Header>
        <nav style={{ display: "flex", gap: "16px" }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
      </Header>

      <main style={{ padding: "20px 0" }}>
        <Outlet />
      </main>
    </div>
  );
}