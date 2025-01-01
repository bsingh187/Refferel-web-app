import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { getUserProfile } from "../../Service/getUserProfile";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");

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

    fetchUserProfile();
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleTeamReports = () => {
    navigate("/team-reports");
  };

  const handleNavigate = (path) => {
    navigate(path);
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
              <p>Account: {userData?.bankAccountNumber || "N/A"}</p>
              <p>Invitation Code: {userData?.refCode || "N/A"}</p>
            </div>
            <button onClick={handleLogOut} className="logout-btn">
              <FaSignOutAlt className="logout-icon" /> Exit Login
            </button>
          </div>
        </section>

        <section className="wallet-section">
          <div className="wallet-info">
            <p>
              Balance: <strong>{userData?.balance || 0} Rs</strong>
            </p>
            <button className="wallet-btn">My Wallet</button>
          </div>
          <div className="wallet-rating">
            <span>Seal</span>
            <span>Restriction</span>
            <span>Good</span>
            <span>Excellent</span>
          </div>
        </section>

        <section className="earnings-section">
          <div className="earnings-row">
            <div className="earning-card">
              Balance (Rs): {userData?.balance || 0}
            </div>
            <div className="earning-card">
              Subordinate Task Commission (Rs): {userData?.taskReward || 0}
            </div>
          </div>
          <div className="earnings-row">
            <div className="earning-card">
              Referral Rebate (Rs): {userData?.refReward || 0}
            </div>
            <div className="earning-card">
              Yesterday's Earnings (Rs): {userData?.yesterdayEarning || 0}
            </div>
          </div>
          <div className="earnings-row">
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
              Last months's Earnings (Rs): {userData?.lastmonthEarning || 0}
            </div>
          </div>
          <div className="earnings-row">
            <div className="earning-card">
              Total revenue(Rs): {userData?.totalrevenue || 0}
            </div>
            <div className="earning-card">
              Complete the task today(PCE){userData?.completetask || 0}
            </div>
          </div>
          <div className="earnings-row">
            <div className="earning-card">
              today remaining tasks(PCE){userData?.todayremaningtask || 0}
            </div>
          </div>
        </section>

        {/* Tab Section */}
        <div className="tab-section">
          <div className="tab-item">Task Records</div>
          <div className="tab-item">Audit Task</div>
          <div className="tab-item">Release Management</div>
        </div>

        {/* Cards Section */}
        <div className="cards-container">
          <div className="crads-adjust">
            <div className="card">
              <span className="card-icon">👤</span>
              <p>Personal Information</p>
            </div>
            <div className="card">
              <span className="card-icon">📅</span>
              <p>Daily Statement</p>
            </div>
          </div>
          <div className="crads-adjust">
            <div className="card">
              <span className="card-icon">📒</span>
              <p>Accounting Records</p>
            </div>
            <div className="card">
              <span className="card-icon">🤝</span>
              <p>Invite Friends</p>
            </div>
          </div>
          <div className="crads-adjust">
            <div className="card" onClick={handleTeamReports}>
              <span className="card-icon">📊</span>
              <p>Team Reports</p>
            </div>
            <div className="card">
              <span className="card-icon">📚</span>
              <p>Helpbook</p>
            </div>
          </div>
          <div className="crads-adjust">
            <div className="card">
              <span className="card-icon">💳</span>
              <p>Credit Centres</p>
            </div>
            <div className="card">
              <span className="card-icon">📥</span>
              <p>Download App</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mobile-footer">
        <div className="footer-tab" onClick={() => handleNavigate("/home")}>
          <span className="tab-icon">🏠</span>
          <span className="tab-label">Home</span>
        </div>
        <div className="footer-tab" onClick={() => handleNavigate("/task")}>
          <span className="tab-icon">📋</span>
          <span className="tab-label">Task</span>
        </div>
        <div className="footer-tab" onClick={() => handleNavigate("/vip")}>
          <span className="tab-icon">👑</span>
          <span className="tab-label">VIP</span>
        </div>
        <div className="footer-tab" onClick={() => handleNavigate("/profit")}>
          <span className="tab-icon">📈</span>
          <span className="tab-label">Profit</span>
        </div>
        <div className="footer-tab" onClick={() => handleNavigate("/profile")}>
          <span className="tab-icon">👤</span>
          <span className="tab-label">Profile</span>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
