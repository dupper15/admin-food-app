import axiosInstance from "./api";

export const fetchAllCategory = async () => {
  try {
    const response = await axiosInstance.get(
      `categories/fetchall-category-by-admin`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (formData) => {
  try {
    const response = await axiosInstance.post(`categories/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const fetchAll = async () => {
  try {
    const response = await axiosInstance.get(`categories/fetchall-category`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
