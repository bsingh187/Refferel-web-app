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

        // Payload for the API
        const payload = { email, otp };

        // Call the API
        const response = await axiosInstance.post("/verify", payload);

        // Show success or error toast based on the response
        if (response?.data?.success) {
            toast.success(response?.data?.message || "OTP Verified Successfully!");
        } else {
            toast.error(response?.data?.message || "Invalid OTP.");
        }

        return response?.data;
    } catch (error) {
        console.error("Error occurred in verifyOtp:", error);

        if (error.response) {
            const errorMessage = error.response.data.message || "An error occurred";
            toast.success(errorMessage);
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
