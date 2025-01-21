import { axiosInstance } from "../utils/axiosInstance";

export const updateUserHistory = async (
  channelData: any,
  channelId: string
) => {
  try {
    const { data } = await axiosInstance.post(
      `/users/updateUserHistory/${channelId}`,
      channelData
    );
    return data;
  } catch (error) {
    console.error("Error updating user history:", error);
    throw error;
  }
};
