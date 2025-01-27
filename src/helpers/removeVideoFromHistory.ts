import { axiosInstance } from "../utils/axiosInstance";

export const removeVideoFromHistory = async (
  userId: string,
  videoId: string
) => {
  try {
    const { data } = await axiosInstance.put(
      `/users/removeFromHistory/${userId}/${videoId}`
    );
    return data;
  } catch (error) {
    console.error("Error updating user history:", error);
    throw error;
  }
};
