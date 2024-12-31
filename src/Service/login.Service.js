import axios from "axios";
import API_BASE_URL from "./Apiurl";
import { toast } from "react-toastify";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/api/user`,
    headers: {
        "Content-Type": "application/json",
    },
});

// Login API function
export const logIn = async (data) => {
    try {
        const { data: serverResponse } = await axiosInstance.post("/logIn", data);

        if (!serverResponse.error) {
            toast.success(serverResponse?.message || "Logged in Successfully");
            localStorage.setItem("token",serverResponse?.token)
        } else {
            toast.error(serverResponse?.message);
        }

        return serverResponse;
    } catch (error) {
        if (error.response) {
            toast.error(error?.response?.data?.message || "An error occurred.");
            throw new Error(error?.response?.data?.message || "An error occurred");
        } else if (error.request) {
            toast.error("No response from server. Please try again later.");
            throw new Error("No response from server. Please try again later.");
        } else {
            toast.error("An unexpected error occurred.");
            throw new Error("An unexpected error occurred.");
        }
    }
};
