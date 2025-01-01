import React, { useEffect, useState } from "react";
import "./style.scss";
import API_BASE_URL from "../../Service/Apiurl";
import { getAllBanners } from "../../Service/getAllBanner.Service";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const HomePage = () => {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState("");
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await getAllBanners();
        if (response?.success) {
          setBanners(response?.data);
        } else {
          setError(response?.message || "Failed to load banners.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchUserList = async () => {
      // Mock user list data (replace with API call if needed)
      const mockUsers = [
        { id: 1, name: "Congratulations ****1002", coins: 25 },
        { id: 2, name: "Congratulations ****2295", coins: 71 },
        { id: 3, name: "Congratulations ****3752", coins: 10 },
        { id: 4, name: "Congratulations ****1285", coins: 36 },
        { id: 5, name: "Congratulations ****5432", coins: 29 },
        { id: 6, name: "Congratulations ****3241", coins: 81 },
        { id: 7, name: "Congratulations ****8787", coins: 73 },
        { id: 8, name: "Congratulations ****2323", coins: 44 },
        { id: 9, name: "Congratulations ****5566", coins: 26 },
        { id: 10, name: "Congratulations ****9977", coins: 92 },
      ];
      setUserList(mockUsers);
    };

    fetchBanners();
    fetchUserList();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="mobile-container">
      {/* Header */}
      <header className="mobile-header">
        <h2>Refer & Earn</h2>
      </header>

      {/* Content */}
      <div className="mobile-content">
        <div className="banner-container">
          {banners.map((banner) => (
            <div key={banner._id} className="banner">
              <img
                src={`${API_BASE_URL}${banner.imagePath}`}
                alt={banner.name}
                className="banner-image"
              />
            </div>
          ))}
        </div>

        {/* Cards Section */}
        <div className="task-hall-label">Task Hall</div>
        <div className="cards-container">
          <div className="cards-adjust">
            <div className="card">
              <span className="icon">📹</span>
              <p>YouTube Like and Follow</p>
            </div>
            <div className="card">
              <span className="icon">📷</span>
              <p>Instagram Like and Follow</p>
            </div>
          </div>
          <div className="cards-adjust">
            <div className="card">
              <span className="icon">📘</span>
              <p>Facebook Share</p>
            </div>
            <div className="card">
              <span className="icon">💬</span>
              <p>Line Message</p>
            </div>
          </div>
        </div>

        {/* Membership List Section */}
        <div className="task-hall-label">Membership List</div>
        <div className="membership-list">
          {userList?.length > 0 ? (
            userList?.map((user) => (
              <div key={user.id} className="membership-item">
                {/* User Avatar */}
                <FaUserCircle className="profile-avatar" />

                <div className="user-info">
                  <p>{user?.name}</p>
                </div>

                {/* Coins */}
                <div className="coins-display">
                  <span className="coins">{user.coins}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="mobile-footer" onClick={handleHomePage}>
        <div className="footer-tab">
          <span className="tab-icon">🏠</span>
          <span className="tab-label">Home</span>
        </div>
        <div className="footer-tab" onClick={handleTaskPage}>
          <span className="tab-icon">📋</span>
          <span className="tab-label">Task</span>
        </div>
        <div className="footer-tab" onClick={handleVIPPage}>
          <span className="tab-icon">👑</span>
          <span className="tab-label">VIP</span>
        </div>
        <div className="footer-tab" onClick={handleProfit}>
          <span className="tab-icon">📈</span>
          <span className="tab-label">Profit</span>
        </div>
        <div className="footer-tab" onClick={handleProfile}>
          <span className="tab-icon">👤</span>
          <span className="tab-label">Profile</span>
        </div>
      </footer> */}
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

export default HomePage;
