import { Button } from "@/components/ui/button"
import {
  Gamepad2,
  Home,
  Flame,
  Library,
  History,
  Clock,
  Heart,
  Settings,
  Radio,
  TvMinimalPlay,
  CircleFadingPlus,
} from "lucide-react";
import SiteLogo from "../assets/site-logo.png";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primaryLight dark:bg-primaryDark  transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-2 mb-8">
            {/* <Gamepad2 className="h-8 w-8 text-yellow-500" /> */}
            <img src={SiteLogo} width={60} height={60} />
            <span className="text-xl font-bold text-black dark:text-white">
              JagStream
            </span>
          </div>

          <nav className="space-y-6 flex-grow dark:bg-primaryDark">
            <div className="space-y-2 dark:bg-primaryDark">
              <Link to={"/"}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-black dark:text-white"
                >
                  <Home className="h-5 w-5" /> Home
                </Button>
              </Link>

              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-black dark:text-white "
              >
                <Radio className="h-5 w-5" /> Live
              </Button>
              <Link to={`/stories`}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-black dark:text-white "
                >
                  <CircleFadingPlus className="h-5 w-5" /> Stories
                </Button>
              </Link>
            </div>

            <div className="space-y-2 dark:bg-primaryDark">
              <h3 className="text-sm font-semibold text-gray-400 px-3 dark:bg-primaryDark">
                Library
              </h3>
              <Link to={"/history"}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-black dark:text-white"
                >
                  <History className="h-5 w-5" /> History
                </Button>
              </Link>
              <Link to={"/watchLater"}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-black dark:text-white"
                >
                  <Clock className="h-5 w-5" /> Watch Later
                </Button>
              </Link>
              <Link to={"/likedVideos"}>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-black dark:text-white m-0"
                >
                  <Heart className="h-5 w-5" /> Liked Videos
                </Button>
              </Link>
            </div>

            {/* <div className="space-y-2 dark:bg-primaryDark">
              <h3 className="text-sm font-semibold text-gray-400 px-3 dark:bg-primaryDark">
                Settings
              </h3>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-black dark:text-white"
              >
                <Settings className="h-5 w-5" /> Settings
              </Button>
            </div> */}
          </nav>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}