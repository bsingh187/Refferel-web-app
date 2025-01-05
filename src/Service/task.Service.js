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
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return config;
});


export const filteredTask = async (status) => {
    try {
        const response = await axiosInstance.request({
            method: "POST",
            url: "/task/get/filter",
            data: { status },
            transformRequest: [(data) => JSON.stringify(data)],
        });
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


export const filteredSocialTask = async (taskCategory) => {
    try {
        const response = await axiosInstance.request({
            method: "POST",
            url: "/task/get/all",
            data: { taskCategory },
            transformRequest: [(data) => JSON.stringify(data)],
        });
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


export const performTask = async (taskId) => {
    try {
        const response = await axiosInstance.request({
            method: "POST",
            url: "/task/perform",
            data: { taskId },
            transformRequest: [(data) => JSON.stringify(data)],
        });
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
