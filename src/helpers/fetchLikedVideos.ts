import { axiosInstance } from "../utils/axiosInstance";

export const fetchLikedVideos = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/video/getUserLikedVideos/${userId}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching liked videos:", error);
    throw error;
  }
};
