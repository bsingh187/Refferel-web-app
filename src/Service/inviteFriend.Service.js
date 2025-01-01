import axios from "axios";
import API_BASE_URL from "./Apiurl";

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/user`,
  headers: {
    "Content-Type": "multipart/form-data", // Required for FormData
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const inviteFriends = async (refCode) => {
  try {
    const formData = new FormData();
    formData.append("refCode", refCode);

    const response = await axiosInstance.post("/inviteFriends", formData);
    return response?.data?.data;
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
