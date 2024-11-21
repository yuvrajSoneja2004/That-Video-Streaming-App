import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingBar from "react-top-loading-bar";
import { THEME } from "../constants/theme";
import { Toaster } from "@/components/ui/toaster";

function RootLayout() {
  return (
    <div>
      <LoadingBar color={THEME.primary} progress={40} />
      <Outlet />
      <Toaster />
    </div>
  );
}

export default RootLayout;
