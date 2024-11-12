// src/helpers/fetchSearchResults.ts

import { axiosInstance } from "../utils/axiosInstance";
import { SearchResponse } from "../types/search";

export const fetchSearchResults = async (
  query: string
): Promise<SearchResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/search/getSearchResults?query=${query}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
