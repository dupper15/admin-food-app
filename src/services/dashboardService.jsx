import axiosInstance from "./api";

export const fetchAll = async () => {
  try {
    const response = await axiosInstance.get(`dashboard`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching all:", error);
    throw error;
  }
};

export const getMonthlyOrder = async () => {
  try {
    const response = await axiosInstance.get(`dashboard/monthly-order`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly order:", error);
    throw error;
  }
};

export const getMonthlyDish = async () => {
  try {
    const response = await axiosInstance.get(`dashboard/monthly-dish`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly dish:", error);
    throw error;
  }
};

export const getTopTenRestaurant = async (filter, sortBy) => {
  try {
    const response = await axiosInstance.get(`dashboard/top-restaurant`, {
      params: { filter, sortBy },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching top ten restaurants:", error);
    throw error;
  }
};

export const getTopTenUser = async (filter, sortBy) => {
  try {
    const response = await axiosInstance.get(`dashboard/top-user`, {
      params: { filter, sortBy },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching top ten users:", error);
    throw error;
  }
};

export const getTopTenDish = async () => {
  try {
    const response = await axiosInstance.get(`dashboard/top-dish`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching top ten dishes:", error);
    throw error;
  }
};

export const getTotalDish = async () => {
  try {
    const response = await axiosInstance.get(`dashboard/total-dish`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching total dish:", error);
    throw error;
  }
};

export const getPieChart = async () => {
  try {
    const response = await axiosInstance.get(`dashboard/pie-chart`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data of pie-chart:", error);
    throw error;
  }
};

export const getPieChartProductSale = async (filter) => {
  try {
    const response = await axiosInstance.get(`dashboard/pie-chart-product`, {
      params: { filter },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching data of pie-chart or product sale:", error);
    throw error;
  }
};
