import axiosInstance from "./api";

export const fetchAllDishByRestaurant = async (id) => {
  try {
    const response = await axiosInstance.get(
      `dish/fetchall-dish-by-restaurant/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching dishes by category:", error);
    throw error;
  }
};

export const deleteDish = async (id) => {
  try {
    const response = await axiosInstance.delete(`dish/delete/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error deleting dish:", error);
    throw error;
  }
};
