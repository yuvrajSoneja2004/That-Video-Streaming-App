import { axiosInstance } from "../../utils/axiosInstance";

export const fetchUpNextSuggestions = async (videoUrlId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/video/getUpNextSuggestions/${videoUrlId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
