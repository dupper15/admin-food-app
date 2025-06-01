import axios from "axios";

// Lấy baseURL cho môi trường web
const getBaseUrl = () => {
  // Dùng backend online hoặc local tùy mục đích
  return "https://app-food-be.onrender.com/";
  // return "http://localhost:3000/";
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho request
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const safeData = config.data ? JSON.stringify(config.data) : "no data";
      const safeUrl = config.url || "unknown endpoint";
      console.log(
        `${config.method?.toUpperCase() || "REQUEST"} ${safeUrl}`,
        safeData
      );

      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error in request interceptor:", error);
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => {
    try {
      const statusText = response.status
        ? `${response.status}`
        : "unknown status";
      const safeData = response.data
        ? JSON.stringify(response.data)
        : "no data";
      console.log("Response:", statusText, safeData);
    } catch (error) {
      console.error("Error logging response:", error);
    }
    return response;
  },
  (error) => {
    try {
      console.error(
        "Response error:",
        error.response?.status || "unknown status",
        error.response?.data
          ? JSON.stringify(error.response.data)
          : error.message || "Unknown error"
      );
    } catch (loggingError) {
      console.error("Error while logging error:", loggingError);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
