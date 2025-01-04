import axios from "axios";
import API_BASE_URL from "./Apiurl";
import { toast } from "react-toastify";

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


// Interceptor to include token from localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
  }
  return config;
});

// Service to update bank details
export const updateBankDetails = async (bankDetails) => {
  try {
    const response = await axiosInstance.post("/updateBankDetails", bankDetails);
    toast.success(response?.data?.message || "Profile section updated successfully");
    return response?.data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Failed to update profile. Please try again.";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};


// Interceptor to include token from localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch Wallet Balance
export const getWalletBalance = async () => {
  try {
    const response = await axiosInstance.get("/transaction/get/all");
    const data = response?.data?.data || [];
    // Calculate the total revenue
    const totalRevenue = data.reduce((acc, item) => acc + Number(item.amount), 0);
    return totalRevenue;
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

// Interceptor to include token from localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


