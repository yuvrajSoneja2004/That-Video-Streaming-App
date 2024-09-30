import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingBar from "react-top-loading-bar";
import { THEME } from "../constants/theme";

function RootLayout() {
  return (
    <div>
      <LoadingBar color={THEME.primary} progress={40} />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default RootLayout;
