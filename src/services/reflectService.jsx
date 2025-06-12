import axiosInstance from "./api";

export const getAllReflect = async (page, limit, filter = "all", q = "") => {
  try {
    const response = await axiosInstance.get(`reflect/by-admin`, {
      params: { page, limit, filter, q },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching reflect:", error);
    throw error;
  }
};

export const replyReflect = async (id, message) => {
  try {
    const response = await axiosInstance.post(`reflect/reply/${id}`, {
      message,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error replying reflect:", error);
    throw error;
  }
};
