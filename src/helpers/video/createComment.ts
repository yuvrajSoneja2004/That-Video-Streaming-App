import { axiosInstance } from "@/utils/axiosInstance";

interface CreateComment {
  userId: string;
  videoId: string;
  commentText: string;
}

export const createComment = async (data: CreateComment) => {
  try {
    const response = await axiosInstance.post(`/comment/createComment`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
