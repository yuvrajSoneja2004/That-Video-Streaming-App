import { axiosInstance } from "@/utils/axiosInstance";

export async function fetchReplies(commentId: number = 20) {
  try {
    const response = await axiosInstance.get(
      `/comment/getCommentReplies/${commentId}`
    );

    console.log("re maan jo lahyo re", response);
    return response.data;
  } catch (error) {
    throw error;
  }
}
