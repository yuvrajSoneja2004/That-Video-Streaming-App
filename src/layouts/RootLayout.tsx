import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoadingBar from "react-top-loading-bar";
import { THEME } from "../constants/theme";
import { Toaster } from "@/components/ui/toaster";
import { useGlobalState } from "@/states/global";

function RootLayout() {
  const { loadingBarState } = useGlobalState();

  return (
    <div>
      <LoadingBar color={THEME.primary} progress={loadingBarState} />
      <Outlet />
      <Toaster />
    </div>
  );
}

export default RootLayout;
