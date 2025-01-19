import { axiosInstance } from "@/utils/axiosInstance";
export const updateVideoDurationHelper = async (
  videoId: string,
  userId: string,
  duration: number
) => {
  try {
    const { data } = await axiosInstance.put(
      `/video/updateVideoWatchedDuration/${userId}?videoId=${videoId}&duration=${duration}`
    );

    console.log("chaska", data);
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
