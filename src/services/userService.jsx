import axiosInstance from "./api";

export const fetchAllUser = async (page, limit, filter = "all", q = "") => {
  try {
    const response = await axiosInstance.get(`users/all`, {
      params: { page, limit, filter, q },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const changeStatusUser = async (id) => {
  try {
    const response = await axiosInstance.patch(`users/change-status/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error change status user:", error);
    throw error;
  }
};

export const createAdmin = async (data) => {
  try {
    const response = await axiosInstance.post(`users/admin`, data);
    return response.data;
  } catch (error) {
    console.error("Error change status user:", error);
    throw error;
  }
};
