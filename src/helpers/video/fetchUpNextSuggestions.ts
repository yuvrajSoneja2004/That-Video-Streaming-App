import { axiosInstance } from "../../utils/axiosInstance";

export const fetchUpNextSuggestions = async (videoUrlId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/video/getUpNextSuggestions/${videoUrlId}`
    );
    // console.log("kuch hua?", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
