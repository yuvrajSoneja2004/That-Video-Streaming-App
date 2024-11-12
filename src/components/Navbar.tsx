import SearchBar from "./SearchBar";
import { useMediaQuery } from "@uidotdev/usehooks";
import { IoIosSearch } from "react-icons/io";
import Dropdown from "./ui/Dropdown";
import { THEME } from "../constants/theme";
import SignInBtn from "./ui/SignInBtn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import Avatar from "./ui/Avatar";
import { NAVBAR_AVATAR_OPTIONS } from "../constants/options";
import AvatarDropdown from "./AvatarDropdown";
import { useUserStore } from "../states/user";
import { useMutation } from "react-query";
import { saveToGlobalSuggestions } from "../helpers/fetchVideoSuggestions";

function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  const {
    userInfo: { avatarUrl },
  } = useUserStore();

  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );
  const isLargeDevice = useMediaQuery("only screen and (min-width : 993px)");

  return (
    <div className="w-full h-24 bg-primaryDark text-white px-6 fixed">
      <div className="h-full max-w-[1920px] mx-auto grid grid-cols-[auto_1fr_auto] gap-8 items-center">
        {/* Logo Section */}
        <img src="/logo-placeholder.svg" width={60} height={60} />

        {/* Search Bar Section */}
        {!isMediumDevice && isLargeDevice && (
          <div className="w-full max-w-2xl mx-auto">
            <SearchBar />
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center justify-end">
          {!isLargeDevice && <IoIosSearch size={30} className="mr-4" />}
          {!loading && user == null ? (
            <SignInBtn />
          ) : (
            <AvatarDropdown avatarUrl={avatarUrl} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;