import { Outlet } from "react-router";
import Navigation from "../components/Navigation";

const MainLayout = () => {
  return (
    <div>
      <header>
        <Navigation />
      </header>

      <Outlet />
    </div>
  );
};

export default MainLayout;
