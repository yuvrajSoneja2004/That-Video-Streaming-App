import React, { useState, ChangeEvent, FormEvent } from "react";
import { IoIosSearch } from "react-icons/io";
import { THEME } from "../constants/theme";

interface SearchBar {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBar> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchQuery); // Trigger search action with the query
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-[40px] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-transparent  rounded-full shadow-md w-full"
        style={{ border: "1px solid #62626249" }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          className="flex-grow bg-transparent px-4 focus:outline-none"
          placeholder="Search"
        />
        <button
          type="submit"
          className="text-white px-6 py-2 rounded-r-full h-full bg-transparent"
          style={{ borderLeft: "1px solid #62626249" }}
        >
          <IoIosSearch size={27} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
