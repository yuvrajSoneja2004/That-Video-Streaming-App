import { axiosInstance } from "../utils/axiosInstance";

export const fetchWatchLater = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/getWatchLater/${userId}`);
    return data?.data;
  } catch (error) {
    console.error("Error fetching user history:", error);
    throw error;
  }
};
