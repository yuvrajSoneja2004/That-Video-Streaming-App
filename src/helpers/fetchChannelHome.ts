import { axiosInstance } from "../utils/axiosInstance";

export const fetchChannelHome = async (channelId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/channels/channel/home/${channelId}`
    );
    return data?.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
