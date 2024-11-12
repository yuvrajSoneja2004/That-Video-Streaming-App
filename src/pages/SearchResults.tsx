// src/pages/SearchResults.tsx

import React from "react";
import { useLocation } from "react-router-dom";
import ResultsPageSimpleFilter from "../components/SearchComponents/ResultsPageSimpleFilter";
import { useQuery } from "react-query";
import { fetchSearchResults } from "../helpers/fetchSearchResults";
import { SearchResponse, Video } from "../types/search";
import ResultsVideo from "../components/SearchComponents/ResultsVideo";

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search_query") || ""; // Default to empty string if null

  const { data, isLoading, error, isError } = useQuery<SearchResponse, Error>(
    ["searchResults", searchQuery],
    () => fetchSearchResults(searchQuery),
    {
      enabled: Boolean(searchQuery), // Only run if there's a search query
    }
  );

  console.log("quest", data);

  return (
    <div className="text-white mt-20 m-5">
      <ResultsPageSimpleFilter />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching data: {error?.message}</p>}
      {data &&
        data.results.map((video: Video) => <ResultsVideo data={video} />)}
    </div>
  );
}

export default SearchResults;
