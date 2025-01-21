import { axiosInstance } from "../utils/axiosInstance";

export const fetchUserHistory = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/getHistory/${userId}`);
    return data?.data;
  } catch (error) {
    console.error("Error fetching user history:", error);
    throw error;
  }
};

//  videoId: "",
//       watchedAt: ""
