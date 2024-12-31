import axios from "axios";
import API_BASE_URL from "./Apiurl";

// Axios instance with token in headers
const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/user`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to include token from localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
  }
  return config;
});

// Fetch User Profile API function
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/getUser");
    return response?.data; // Return the API response
  } catch (error) {
    if (error.response) {
      throw new Error(error?.response?.data?.message || "An error occurred");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
