import { axiosInstance } from "../utils/axiosInstance";

export const fetchUserInfo = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/getInfo/${userId}`, {
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Fetching user info: ${percentCompleted}% completed`);
        } else {
          console.log("Fetching user info:", progressEvent);
        }
      },
    });
    return data?.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
