import React from "react";
import VideosSlider from "./VideosSlider";

function ChannelHome() {
  return (
    <div>
      <VideosSlider heading={"Recent videos"} />
      <VideosSlider heading={"Popular videos"} />
    </div>
  );
}

export default ChannelHome;
