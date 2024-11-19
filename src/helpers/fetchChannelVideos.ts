import { axiosInstance } from "../utils/axiosInstance";

export type Filters = "recent" | "popular" | "oldest";
export const fetchChannelVideos = async (
  page: number = 0,
  limit: number = 8,
  channelId: number,
  filterQuery: Filters = "recent"
) => {
  try {
    const { data } = await axiosInstance.get(
      `/video/getChannelVideos/${channelId}?filter=${filterQuery}&page=${page}&limit=${limit}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching channel videos:", error);
    throw error;
  }
};
