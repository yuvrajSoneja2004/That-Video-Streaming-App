import VideosSlider from "./VideosSlider";

function ChannelHome() {
  return (
    <div className="max-w-[1800px]">
      <VideosSlider heading={"Recent videos"} />
      <VideosSlider heading={"Popular videos"} />
    </div>
  );
}

export default ChannelHome;
