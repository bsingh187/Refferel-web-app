// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login/login";
import ForgotPasswordPage from "./components/forgotPassword/forgotPassword";
import SignUpPage from "./components/signUp/signUp";
import VerifyOtpPage from "./components/verifyOtp/verifyOtp";
import HomePage from "./Pages/Home/home";
import ProfilePage from "./Pages/Profile/profile";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;