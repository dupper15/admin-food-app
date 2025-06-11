import axiosInstance from "./api";

export const createNotification = async (data) => {
  try {
    const response = await axiosInstance.post(`notification/create`, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};
