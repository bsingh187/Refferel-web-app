import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/login/login";
import ForgotPasswordPage from "./components/forgotPassword/forgotPassword";
import SignUpPage from "./components/signUp/signUp";
import VerifyOtpPage from "./components/verifyOtp/verifyOtp";
import HomePage from "./Pages/Home/home";
import ProfilePage from "./Pages/Profile/profile";
import TeamReports from "./Pages/TeamReports/teamReports";
import ProfitPage from "./Pages/Profit/profit";
import TaskPage from "./Pages/Task/task";
import VipPage from "./Pages/VIP/vip";
import CommonRoutes from "./Routes/commonRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";
import EditProfilePage from "./Pages/Profile/editProfile";
import AddBalancePage from "./Pages/AddBalance/addBalance";
import PackageDetails from "./Pages/VIP/packageDetails";
import InviteFriendsPage from "./Pages/InviteFriend/inviteFriend";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public/Common Routes */}
        <Route path="/" element={<CommonRoutes element={<LoginPage />} />} />
        <Route path="/sign-up" element={<CommonRoutes element={<SignUpPage />} />} />
        <Route path="/sign-up/:refCode" element={<CommonRoutes element={<SignUpPage />} />} />
        <Route path="/forgot-password" element={<CommonRoutes element={<ForgotPasswordPage />} />} />
        <Route path="/verify-otp" element={<CommonRoutes element={<VerifyOtpPage />} />} />

        {/* Private Routes */}
        <Route path="/home" element={<PrivateRoutes element={<HomePage />} />} />
        <Route path="/profile" element={<PrivateRoutes element={<ProfilePage />} />} />
        <Route path="/edit-profile" element={<PrivateRoutes element={<EditProfilePage />} />} />
        <Route path="/add-balance" element={<PrivateRoutes element={<AddBalancePage />} />} />
        <Route path="/team-reports" element={<PrivateRoutes element={<TeamReports />} />} />
        <Route path="/profit" element={<PrivateRoutes element={<ProfitPage />} />} />
        <Route path="/task" element={<PrivateRoutes element={<TaskPage />} />} />
        <Route path="/vip" element={<PrivateRoutes element={<VipPage />} />} />
        <Route path="/package-details" element={<PrivateRoutes element={<PackageDetails />} />} />
        <Route path="/invite-friends" element={<PrivateRoutes element={<InviteFriendsPage />} />} />
      </Routes>
    </Router>
  );
}

export default App;
