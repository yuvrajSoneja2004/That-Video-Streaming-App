import { useUserStore } from "../states/user";
import { axiosInstance } from "../utils/axiosInstance";
export const fetchChannelInfo = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/channels/channel/${userId}`);
    return data?.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
export const fetchAboutInfo = async (channelId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/channels/getAboutInfo/${parseInt(channelId)}`
    );
    return data?.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
