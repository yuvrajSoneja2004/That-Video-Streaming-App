import { axiosInstance } from "../utils/axiosInstance";

export const uploadVideo = async (reqBody: FormData) => {
  try {
    const { data } = await axiosInstance.post("/video/upload", reqBody, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error("Error upload video:", error);
    throw error;
  }
};
