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
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


// Service to add balance
export const addBalance = async (amount) => {
    try {
        const response = await axiosInstance.post("/addBal", { amount });
        if (response?.data?.success) {
            toast.success(response?.data?.msg || "Balance added successfully");
        } else {
            toast.error(response?.data?.msg || "Failed to add balance");
        }
        return response?.data;
    } catch (error) {
        if (error.response) {
            toast.error(error?.response?.data?.msg || "An error occurred");
        } else if (error.request) {
            toast.error("No response from server. Please try again later.");
        } else {
            toast.error("An unexpected error occurred.");
        }
        throw error;
    }
};


// Service to withdraw balance
export const withdrawBalance = async (amount) => {
    try {
        const response = await axiosInstance.post("/withdrawal/create", { amount });

        if (response?.data?.statusCode === 200 && response?.data?.error === false) {
            toast.success(response?.data?.message || "Withdrawal request successful");
            return response?.data;
        } else {
            toast.error(response?.data?.message || "Failed to process withdrawal");
            return response?.data;
        }
    } catch (error) {
        if (error.response) {
            toast.error(error?.response?.data?.message || "An error occurred");
        } else if (error.request) {
            toast.error("No response from server. Please try again later.");
        } else {
            toast.error("An unexpected error occurred.");
        }
        throw error;
    }
};

// Service to fetch transactions
export const fetchTransactions = async () => {
    try {
        const response = await axiosInstance.get("/transaction/get/all");
        if (response?.data?.statusCode === 201 && !response?.data?.error) {
            return response?.data?.data || []; 
        } else {
            toast.error(response?.data?.message || "Failed to fetch transactions");
            return [];
        }
    } catch (error) {
        if (error.response) {
            toast.error(error?.response?.data?.message || "An error occurred");
        } else if (error.request) {
            toast.error("No response from server. Please try again later.");
        } else {
            toast.error("An unexpected error occurred.");
        }
        throw error;
    }
};



