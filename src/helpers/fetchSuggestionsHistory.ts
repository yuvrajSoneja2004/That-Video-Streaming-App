import { axiosInstance } from "../utils/axiosInstance";

export const fetchSuggestionsHistory = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/search/getUserSearchHistory/${userId}`
    );
    console.log("history", data);
    return data;
  } catch (error) {
    console.error("Error fetching history info:", error);
    throw error;
  }
};
