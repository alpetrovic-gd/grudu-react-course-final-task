import { Outlet } from "react-router";
import Navigation from "../components/Navigation";

const AuthLayout = () => {
  return (
    <div>
      <header>
        <Navigation />
      </header>

      <Outlet />
    </div>
  );
};

export default AuthLayout;
