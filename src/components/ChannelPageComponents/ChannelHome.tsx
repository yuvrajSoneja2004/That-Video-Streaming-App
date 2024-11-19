import { useQuery } from "react-query";
import VideosSlider from "./VideosSlider";
import { fetchChannelHome } from "../../helpers/fetchChannelHome";
import { useOutletContext } from "react-router-dom";

function ChannelHome() {
  const channelId: string = useOutletContext();
  const { data, isLoading, error, isError } = useQuery(["channelHome"], () =>
    fetchChannelHome(channelId)
  );

  console.log(data);
  if (!data && isLoading) return <h1>Loading...</h1>;
  if(!data) return <h1>lol</h1>
  return (
    <div className="max-w-[1800px]">
      <VideosSlider heading={"Recent videos"} data={data?.recentVideos} />
      <VideosSlider heading={"Popular videos"} data={data?.popularVideos} />
    </div>
  );
}

export default ChannelHome;
