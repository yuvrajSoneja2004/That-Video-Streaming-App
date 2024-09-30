import SearchBar from "./SearchBar";
import { useMediaQuery } from "@uidotdev/usehooks";
import { IoIosSearch } from "react-icons/io";
import Dropdown from "./ui/Dropdown";
import { THEME } from "../constants/theme";

function Navbar() {
  // Define the media queries
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );
  const isLargeDevice = useMediaQuery("only screen and (min-width : 993px)"); // For large screens (993px and above)

  return (
    <div className="w-full grid grid-cols-[10%_auto_10%] place-items-center h-24 bg-primaryDark text-white px-6 fixed">
      {/* Logo Section */}
      <img src="./logo-placeholder.svg" width={60} height={60} className="" />

      {/* Show Search Bar for large screens, hide for medium and small */}
      {!isMediumDevice && isLargeDevice && <SearchBar onSearch={() => {}} />}

      {/* Show Search Icon for medium devices, hide for large screens */}
      {!isLargeDevice && (
        <div className="flex justify-end items-center col-start-3">
          <IoIosSearch size={30} />
        </div>
      )}
      <Dropdown />
    </div>
  );
}

export default Navbar;
