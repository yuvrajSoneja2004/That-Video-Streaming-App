import { useAuthState } from "react-firebase-hooks/auth";
import { axiosInstance } from "../utils/axiosInstance";
import { auth } from "../utils/firebase";

export const fetchUserInfo = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/getInfo/${userId}`);
    return data?.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
