import { axiosInstance } from "@/utils/axiosInstance";

export const getVideosByCategory = async (category: string) => {
  try {
    const response = await axiosInstance.get(
      `/videos/getVideosByCategory/${category}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
