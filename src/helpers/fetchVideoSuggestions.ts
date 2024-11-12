import { axiosInstance } from "../utils/axiosInstance";

export const fetchVideoSuggestions = async (query: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/search/getSearchSuggestions/${query}`
    );
    console.log("suggestionss", data);
    return data;
  } catch (error) {
    console.error("Error fetching suggestionss info:", error);
    throw error;
  }
};
export const saveToSuggestionsHistory = async (
  userId: string,
  suggestionQuery: string
) => {
  try {
    const { data } = await axiosInstance.post(`/search/saveToSearchHistory`, {
      userId,
      suggestionQuery,
    });
    return data;
  } catch (error) {
    console.error("Error fetching suggestionss info:", error);
    throw error;
  }
};
export const saveToGlobalSuggestions = async (query: string) => {
  try {
    const { data } = await axiosInstance.post(
      `/search/saveToGlobalSearchHistory`,
      {
        query,
      }
    );
    return data;
  } catch (error) {
    console.error("Error fetching suggestionss info:", error);
    throw error;
  }
};
