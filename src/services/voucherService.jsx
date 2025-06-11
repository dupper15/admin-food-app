import axiosInstance from "./api";

export const getAllVoucher = async (id) => {
  try {
    const response = await axiosInstance.get(`voucher/system`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    throw error;
  }
};

export const createVoucher = async (data) => {
  try {
    const response = await axiosInstance.post(`voucher/create`, data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error creating voucher:", error);
    throw error;
  }
};
