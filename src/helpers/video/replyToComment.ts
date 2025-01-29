import { axiosInstance } from "@/utils/axiosInstance";

interface ReplyToCommentParams {
  userId: string;
  videoId: string;
  commentId: string;
  replyText: string;
}

export const replyToComment = async ({
  userId,
  videoId,
  commentId,
  replyText,
}: ReplyToCommentParams) => {
  try {
    const response = await axiosInstance.post(`/comment/reply`, {
      userId,
      videoId,
      commentId,
      replyText,
    });
    return response;
  } catch (error) {
    console.log("Error replying to comment:", error);
  }
};
