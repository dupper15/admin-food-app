import axiosInstance from "./api";

export const averageRating = async (id) => {
  try {
    const response = await axiosInstance.get(`rating/average/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching average rating for restaurant:", error);
    throw error;
  }
};

export const getAllByRestaurant = async (id) => {
  try {
    const response = await axiosInstance.get(`rating/restaurant/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching rating for restaurant:", error);
    throw error;
  }
};

export const deleteRating = async (id) => {
  try {
    const response = await axiosInstance.delete(`rating/delete/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error deleting rating for restaurant:", error);
    throw error;
  }
};
