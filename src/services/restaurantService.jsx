import axiosInstance from "./api";

export const fetchAllRestaurant = async (page, limit, q = "") => {
  try {
    const response = await axiosInstance.get(`restaurants/by-admin`, {
      params: { page, limit, q },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const fetchAllRestaurantPending = async () => {
  try {
    const response = await axiosInstance.get(`restaurants/pending`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants pending:", error);
    throw error;
  }
};

export const changeStatusRestaurant = async (id) => {
  try {
    const response = await axiosInstance.patch(
      `restaurants/change-status/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error change status restaurant:", error);
    throw error;
  }
};

export const rejectedRestaurant = async (id) => {
  try {
    const response = await axiosInstance.patch(`restaurants/rejected/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error rejected restaurant:", error);
    throw error;
  }
};

export const approvedRestaurant = async (id) => {
  try {
    const response = await axiosInstance.patch(`restaurants/approved/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error approved restaurant:", error);
    throw error;
  }
};
