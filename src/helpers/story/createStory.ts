import { axiosInstance } from "@/utils/axiosInstance";

interface StoryRequestBody {
  image: File;
  userId: string;
  title: string;
}

export const createStory = async (reqBody: StoryRequestBody) => {
  try {
    console.log("ahahah lol");
    const formData = new FormData();
    formData.append("image", reqBody.image);
    formData.append("userId", reqBody.userId);
    formData.append("title", reqBody.title);

    const { data } = await axiosInstance.post("/story/createStory", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error creating story:", error);
    throw error;
  }
};
