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
import { AuthWrapper } from "./wrappers/AuthCheck";
import SearchResults from "./pages/SearchResults";
import SingleVideoPage from "./pages/SingleVideoPage";
import TestHome from "./testingComps/TestHomePage";
import { UserHistoryPage } from "./pages/UserHistoryPage";
import WatchLaterPage from "./pages/WatchLaterPage";
import LikedVideos from "./pages/LikedVideos";
import Shorts from "./pages/Shorts";
import ShortEditCanvas from "./components/ShortEditCanvas";
// Import channel page components

function Routing() {
  return (
    <Router>
      <AuthWrapper>
        <div className="flex flex-col min-h-screen">
          {/* <Navbar /> */}
          <TestHome>
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
                <Route path="/results" element={<SearchResults />} />
                <Route path="/watch/:videoId" element={<SingleVideoPage />} />
                <Route path="/uiTest" element={<TestHome />} />
                <Route path="/history" element={<UserHistoryPage />} />
                <Route path="/watchLater" element={<WatchLaterPage />} />
                <Route path="/likedVideos" element={<LikedVideos />} />
                <Route path="/shorts/:shortId" element={<Shorts />} />
                <Route path="/editor" element={<ShortEditCanvas />} />
              </Routes>
            </div>
          </TestHome>
        </div>
      </AuthWrapper>
    </Router>
  );
}

export default Routing;