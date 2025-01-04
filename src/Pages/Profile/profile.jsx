import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle, FaEdit } from "react-icons/fa";
import { getUserProfile, getWalletBalance } from "../../Service/getUserProfile";
import FooterComponent from "../../components/footer";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        if (!response.error) {
          setUserData(response?.data);
        } else {
          setError(response?.message || "Failed to load profile data.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchWallet = async () => {
      try {
        const revenue = await getWalletBalance();
        setTotalRevenue(revenue);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
    fetchWallet();
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleTeamReports = () => {
    navigate("/team-reports");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleInviteFriends = () => {
    navigate("/invite-friends");
  };

  return (
    <div className="mobile-container">
      {/* Header */}
      <header className="mobile-header">
        <h2>My Profile</h2>
      </header>

      {/* Content */}
      <div className="mobile-content">
        <section className="profile-section">
          <div className="profile-header">
            <FaUserCircle className="profile-avatar" />
            <div>
              <p>Account : {userData?.bankAccountNumber || "-"}</p>
              <p>Invitation Code : {userData?.refCode || "-"}</p>
            </div>
            <button
              className="edit-profile-btn"
              title="Edit Profile"
              onClick={handleEditProfile}
            >
              <FaEdit className="edit-icon" /> Edit
            </button>
            <button onClick={handleLogOut} className="logout-btn">
              <FaSignOutAlt className="logout-icon" /> Logout
            </button>
          </div>
        </section>

        <section className="earnings-section">
          <div className="earnings-row">
            <div className="earning-card">
              Balance (Rs): {userData?.balance || 0}
            </div>
          </div>
          {/* <div className="earnings-row">
            <div className="earning-card">
              Today's Earnings (Rs): {userData?.todayEarning || 0}
            </div>
            <div className="earning-card">
              This week's Earnings (Rs): {userData?.weekEarning || 0}
            </div>
          </div>
          <div className="earnings-row">
            <div className="earning-card">
              This month's Earnings (Rs): {userData?.monthEarning || 0}
            </div>
            <div className="earning-card">
              Last month's Earnings (Rs): {userData?.lastmonthEarning || 0}
            </div>
          </div>
          <div className="earnings-row">
            <div className="earning-card">
              Total revenue (Rs): {totalRevenue || 0}
            </div>
            <div className="earning-card">
              Complete the task today (PCE): {userData?.completetask || 0}
            </div>
          </div> */}
        </section>

        {/* Cards Section */}
        <div className="cards-container">
          <div className="crads-adjust">
            <div className="card">
              <span className="card-icon">👤</span>
              <p>Personal Information</p>
            </div>
            <div className="card" onClick={handleInviteFriends}>
              <span className="card-icon">🤝</span>
              <p>Invite Friends</p>
            </div>
          </div>
          <div className="crads-adjust">
            <div className="card">
              <span className="card-icon">🤝</span>
              <p>Support</p>
            </div>
          </div>
          <div className="crads-adjust">
            {/* <div className="card" onClick={handleTeamReports}>
              <span className="card-icon">📊</span>
              <p>Team Reports</p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer */}

      <FooterComponent />
    </div>
  );
};

export default ProfilePage;
