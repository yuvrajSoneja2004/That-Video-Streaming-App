import { axiosInstance } from "../../utils/axiosInstance";

export const fetchVideoMetaData = async (videoUrlId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/video/getMetaData/${videoUrlId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
