import { axiosInstance } from "../utils/axiosInstance";

export const createUser = async (reqBody = {}) => {
  try {
    const { data } = await axiosInstance.post("/users/createUser", reqBody);
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
