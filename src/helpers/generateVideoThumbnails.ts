import { axiosInstance } from "../utils/axiosInstance";

export const generateVideoThumbnails = async (reqBody = {}) => {
  try {
    const { data } = await axiosInstance.post(
      "/video/generate-thumbnails",
      reqBody,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error generating thumbnails:", error);
    throw error;
  }
};
