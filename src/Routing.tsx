import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import ChannelLayout from "./layouts/ChannelLayout";
import Navbar from "./components/Navbar";
import ChannelHome from "./components/ChannelPageComponents/ChannelHome";
import ChannelVideos from "./components/ChannelPageComponents/ChannelVideos";
import ChannelPlaylists from "./components/ChannelPageComponents/ChannelPlaylists";
import ChannelCommunity from "./components/ChannelPageComponents/ChannelCommunity";
import ChannelAbout from "./components/ChannelPageComponents/ChannelAbout";
import ChannelShorts from "./components/ChannelPageComponents/ChannelShorts";
// Import channel page components

function Routing() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/channel/:channelId" element={<ChannelLayout />}>
              <Route index element={<ChannelHome />} />
              <Route path="videos" element={<ChannelVideos />} />
              <Route path="shorts" element={<ChannelShorts />} />
              <Route path="playlists" element={<ChannelPlaylists />} />
              <Route path="community" element={<ChannelCommunity />} />
              <Route path="about" element={<ChannelAbout />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Routing;