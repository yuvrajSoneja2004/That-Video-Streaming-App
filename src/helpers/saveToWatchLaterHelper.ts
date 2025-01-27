import { axiosInstance } from "../utils/axiosInstance";

export const saveToWatchLaterHelper = async (
  userId: string,
  channelData: any
) => {
  try {
    const { data } = await axiosInstance.post(
      `/users/saveToWatchLater/${userId}`,
      channelData
    );
    return data;
  } catch (error) {
    console.error("Error adding to watch videos:", error);
    throw error;
  }
};
