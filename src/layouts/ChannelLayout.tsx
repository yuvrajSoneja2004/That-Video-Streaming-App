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

function ChannelLayout() {
  const {
    userInfo: { hasChannel },
  } = useUserStore();
  const [user] = useAuthState(auth);

  const { data, error, isLoading } = useQuery(
    ["channelInfo", user?.uid],
    () => fetchChannelInfo(user?.uid),
    {
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
      enabled: !!user?.uid, // Only run query if user.uid is defined
    }
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
            avatarUrl={data?.avatarUrl}
            description={data?.description}
            isVerified={data?.isVerified}
            name={data?.name}
            subscribers={data?.subscribers}
            createdBy={data?.createdBy}
          />
          <VideosTypeNavbar />
          <Outlet context={data?.id} />
        </>
      ) : (
        <CreateChannel />
      )}
    </div>
  );
}

export default ChannelLayout;