import React, { useState, useRef, useEffect, FormEvent } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Search, Mic } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VideoSuggestionsBox from "./VideoSuggestionsBox";
import { saveToGlobalSuggestions } from "../helpers/fetchVideoSuggestions";

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isShowSuggestions, setIsShowSuggestions] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchMutation = useMutation(() =>
    saveToGlobalSuggestions(debouncedSearchQuery)
  );

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="relative w-full max-w-xl" ref={searchContainerRef}>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleSearchFocus}
            className="w-full bg-gray-900 border-gray-700 pr-10"
            placeholder="Search"
          />
          <Button 
            type="submit" 
            size="icon"
            variant="ghost" 
            className="absolute right-0 top-0 h-full"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
        <Button size="icon" variant="ghost">
          <Mic className="h-5 w-5" />
        </Button>
      </form>
      {isShowSuggestions && (
        <div className="absolute w-full z-10 mt-1">
          <VideoSuggestionsBox query={debouncedSearchQuery} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;