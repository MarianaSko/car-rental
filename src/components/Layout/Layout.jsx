import { Outlet } from "react-router-dom";
import { Header, StyledNavLink } from "./Layout.styled";

const Layout = () => {
  return (
    <div>
      <Header>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/catalog">Catalog</StyledNavLink>
        <StyledNavLink to="/favorites">Favorites</StyledNavLink>
      </Header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
