import React from "react";
import Banner from "../components/ChannelPageComponents/Banner";
import ChannelInfo from "../components/ChannelPageComponents/ChannelInfo";
import VideosSlider from "../components/ChannelPageComponents/VideosSlider";
import VideosTypeNavbar from "../components/ChannelPageComponents/VideosTypeNavbar";
import { Outlet } from "react-router-dom";

function ChannelLayout() {
  return (
    <div className="pt-[100px] p-4">
      {" "}
      {/* Add padding-top to account for Navbar height */}
      <Banner bannerUrl="" />
      <ChannelInfo />
      <VideosTypeNavbar />
      <Outlet />
    </div>
  );
}

export default ChannelLayout;
