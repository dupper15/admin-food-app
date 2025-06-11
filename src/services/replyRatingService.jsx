import axiosInstance from "./api";

export const deleteReply = async (id) => {
  try {
    const response = await axiosInstance.delete(`reply/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error deleting reply for restaurant:", error);
    throw error;
  }
};
