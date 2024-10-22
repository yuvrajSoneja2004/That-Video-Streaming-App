import { useState } from "react";
import { Link } from "react-router-dom";

const tabs = [
  { id: "", label: "HOME" },
  { id: "videos", label: "VIDEOS" },
  { id: "shorts", label: "SHORTS" },
  // { id: "live", label: "LIVE" },
  { id: "playlists", label: "PLAYLISTS" },
  // { id: "community", label: "COMMUNITY" },
  { id: "community", label: "COMMUNITY" },
  { id: "about", label: "ABOUT" },
];

const VideosTypeNavbar = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <nav className="border-b border-[#393939] flex justify-start items-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex space-x-8 overflow-x-auto justify-start items-start">
          {tabs.map((tab) => (
            <li key={tab.id} className="relative">
              <Link to={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 inline-flex items-center text-sm font-medium ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              </Link>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white transition-all duration-300 ease-in-out" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default VideosTypeNavbar;
