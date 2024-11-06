import Banner from "../components/ChannelPageComponents/Banner";
import ChannelInfo from "../components/ChannelPageComponents/ChannelInfo";
import VideosTypeNavbar from "../components/ChannelPageComponents/VideosTypeNavbar";
import { Outlet } from "react-router-dom";
import { useUserStore } from "../states/user";
import CreateChannel from "../components/CreateChannel";
import { useQuery } from "react-query";
import { fetchChannelInfo } from "../helpers/fetchChannelInfo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { Snackbar } from "@mui/material";
import { useChannelState } from "../states/channel";

function ChannelLayout() {
  const {
    userInfo: { hasChannel },
  } = useUserStore();

  const { isChannelInfoUpdated, setIsChannelInfoUpdated } = useChannelState();
  const [user] = useAuthState(auth);

  const { data, error, isLoading } = useQuery(
    ["channelInfo", user?.uid, isChannelInfoUpdated],
    () => fetchChannelInfo(user?.uid)
  );

  console.log(hasChannel, "lol");
  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <div className="pt-[100px] p-4">
      {hasChannel ? (
        <>
          <Banner bannerUrl={data?.bannerUrl} />
          <ChannelInfo
            channelId={data?.id}
            avatarUrl={data?.avatarUrl}
            description={data?.description}
            isVerified={data?.isVerified}
            name={data?.name}
            subscribers={data?.subscribers}
            createdBy={data?.createdBy}
            bannerUrl={data?.bannerUrl}
          />
          <VideosTypeNavbar />
          <Outlet context={data?.id} />
          <Snackbar
            open={isChannelInfoUpdated}
            autoHideDuration={3000}
            message="Successfully updated changes."
            onClose={() => setIsChannelInfoUpdated(false)}
          />
        </>
      ) : (
        <CreateChannel />
      )}
    </div>
  );
}

export default ChannelLayout;