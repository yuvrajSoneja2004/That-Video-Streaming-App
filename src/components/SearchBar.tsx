import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import { IoIosSearch } from "react-icons/io";
import { useDebounce } from "@uidotdev/usehooks";
import VideoSuggestionsBox from "./VideoSuggestionsBox";
import { saveToGlobalSuggestions } from "../helpers/fetchVideoSuggestions";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

interface SearchBar {}

const SearchBar: React.FC<SearchBar> = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isShowSuggestions, setIsShowSuggestions] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchMutation = useMutation(() =>
    saveToGlobalSuggestions(debouncedSearchQuery)
  );

  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle clicks outside the search container
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsShowSuggestions(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchMutation.mutate();
    navigate(`/results?search_query=${debouncedSearchQuery}`);
  };

  const handleSearchFocus = () => {
    setIsShowSuggestions(true);
  };

  return (
    <div className="w-full relative" ref={searchContainerRef}>
      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-transparent rounded-full shadow-md w-full"
          style={{ border: "1px solid #62626249" }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleSearchFocus}
            className="flex-grow bg-transparent px-6 py-3 focus:outline-none rounded-l-full"
            placeholder="Search"
          />
          <button
            type="submit"
            className="text-white px-6 py-3 rounded-r-full h-full bg-transparent hover:bg-opacity-10 hover:bg-white transition-colors"
            style={{ borderLeft: "1px solid #62626249" }}
          >
            <IoIosSearch size={27} />
          </button>
        </form>
      </div>
      {isShowSuggestions && (
        <VideoSuggestionsBox query={debouncedSearchQuery} />
      )}
    </div>
  );
};

export default SearchBar;
