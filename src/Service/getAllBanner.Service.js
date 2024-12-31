import axios from "axios";
import API_BASE_URL from "./Apiurl";

// Axios instance
const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/banner`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch All Banners API function
export const getAllBanners = async () => {
  try {
    const response = await axiosInstance.get("/get/all");
    return response?.data; 
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
