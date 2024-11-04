import Banner from "../components/ChannelPageComponents/Banner";
import ChannelInfo from "../components/ChannelPageComponents/ChannelInfo";
import VideosTypeNavbar from "../components/ChannelPageComponents/VideosTypeNavbar";
import { Outlet } from "react-router-dom";
import { useUserStore } from "../states/user";
import CreateChannel from "../components/CreateChannel";

function ChannelLayout() {
  const {
    userInfo: { hasChannel },
  } = useUserStore();
  return (
    <div className="pt-[100px] p-4">
      {" "}
      {/* Add padding-top to account for Navbar height */}
      {hasChannel ? (
        <>
          <Banner bannerUrl="" />
          <ChannelInfo />
          <VideosTypeNavbar />
          <Outlet />
        </>
      ) : (
        <CreateChannel />
      )}
    </div>
  );
}

export default ChannelLayout;
