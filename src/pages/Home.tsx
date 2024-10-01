import VideoCard from "../components/VideoCard";
import VideoPlayer from "../components/VideoPlayer";
import { MOCK_VIDEOS } from "../mock/videos";

function Home() {
  return (
    <div className="p-7 grid sm:grid-cols-2 md:grid-cols-4 gap-5 row place-items-center">
      {/* Dummy Array  */}
      {/* {MOCK_VIDEOS.map((video, _) => (
        <VideoCard videoInfo={video} />
      ))} */}
      <VideoPlayer />
    </div>
  );
}

export default Home;
