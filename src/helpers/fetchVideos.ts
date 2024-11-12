import { axiosInstance } from "../utils/axiosInstance";

// Define interfaces for API response
export interface Video {
  id: string;
  title?: string;
  description?: string;
  url?: string;
  thumbnailUrl?: string;
  // Add other video properties as needed
}

interface VideoResponse {
  videos: Video[];
  totalCount: number;
  hasMore: boolean;
}

export const fetchVideos = async (
  page: number = 0,
  limit: number = 8
): Promise<VideoResponse> => {
  try {
    const { data } = await axiosInstance.post<VideoResponse>(
      "/video/getVideos",
      {
        params: {
          page,
          limit,
        },
      }
    );

    return {
      videos: data.videos,
      totalCount: data.totalCount,
      hasMore: data.hasMore,
    };
  } catch (error) {
    console.error("Error fetching videos info:", error);
    throw error;
  }
};
