import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchAboutInfo } from "../../helpers/fetchChannelInfo";

function ChannelAbout() {
  const channelId: string = useOutletContext();
  const { data, isLoading, error, isError } = useQuery(["channelAbout"], () =>
    fetchAboutInfo(channelId)
  );

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="my-4">
      <h1 className="text-2xl font-bold">About</h1>
      <p>{data?.description}</p>

      <h1 className="text-xl font-bold">Links</h1>
    </div>
  );
}

export default ChannelAbout;
