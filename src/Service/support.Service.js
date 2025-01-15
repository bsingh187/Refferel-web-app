import axios from "axios";
import API_BASE_URL from "./Apiurl";

// Axios instance
const axiosInstance = axios.create({
    baseURL: `http://3.91.179.101:5050/api/user`,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor to include token from localStorage
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  });


// Fetch All chat API function //
export const getAllSupportChat = async () => {
    try {
        const response = await axiosInstance.get("/chatsupport/getAllConversationForUser");
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
