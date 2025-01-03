import axios from "axios";
import API_BASE_URL from "./Apiurl";
import { toast } from "react-toastify";

// Axios instance
const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/api/user`,
    headers: {
        "Content-Type": "application/json",
    },
});

// Verify OTP API function
export const verifyOtp = async (otp) => {
    try {
        const email = localStorage.getItem("email");
        if (!email) {
            throw new Error("Email not found. Please sign up again.");
        }

        const payload = { email, otp };

        const response = await axiosInstance.post("/verify", payload);

        if (response?.data?.statusCode === 201) {
            toast.success(response?.data?.message || "SignUp successfully.");
        } else {
            toast.error(response?.data?.message || "Invalid OTP.");
        }
        return response?.data;
    } catch (error) {
        if (error.response) {
            const errorMessage = error.response.data.message || "An error occurred";
            toast.error(errorMessage); 
            throw new Error(errorMessage);
        } else if (error.request) {
            toast.error("No response from server. Please try again later.");
            throw new Error("No response from server. Please try again later.");
        } else {
            toast.error("An unexpected error occurred.");
            throw new Error("An unexpected error occurred.");
        }
    }
};
