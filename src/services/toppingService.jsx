import axiosInstance from "./api";

export const getAllToppingByRestaurant = async (id) => {
  try {
    const response = await axiosInstance.get(
      `toppings/getall-by-restaurant/${id}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching toppings for restaurant:", error);
    throw error;
  }
};

export const deleteTopping = async (id) => {
  try {
    const response = await axiosInstance.delete(`toppings/delete/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error deleting topping:", error);
    throw error;
  }
};
