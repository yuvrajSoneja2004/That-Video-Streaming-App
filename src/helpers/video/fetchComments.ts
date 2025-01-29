import { axiosInstance } from "@/utils/axiosInstance";

export const fetchComments = async (
  videoId: string,
  sortBy: "top" | "newest" = "top"
) => {
  try {
    const response = await axiosInstance.get(
      `/comment/getComments/${videoId}?sortBy=${sortBy}`
    );
    console.log("da data", response.data);
    return response.data;
  } catch (error) {
    console.log("💀, error fetching comments", error);
  }
};
