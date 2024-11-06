import { axiosInstance } from "../utils/axiosInstance";

export const updateChannelInfo = async (
  channelData: any,
  channelId: string
) => {
  try {
    const { data } = await axiosInstance.put(
      `/channels/updateInfo/${channelId}`,
      channelData
    );
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export async function uploadToImgBB(
  file: File,
  setIsChannelInfoUpdated: any
): Promise<string> {
  const IMGBB_API_KEY = "1860dbb564356e69f87167f8d4c2785c"; // Replace with your ImgBB API key

  interface ImgBBResponse {
    data: {
      url: string;
      display_url: string;
    };
    success: boolean;
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data: ImgBBResponse = await response.json();
  setIsChannelInfoUpdated(true);

  console.log("img url", data.data.url);
  return data.data.url;
}
