import React, { useEffect, useState } from "react";
import "./style.scss";
import API_BASE_URL from "../../Service/Apiurl";
import { getAllBanners } from "../../Service/getAllBanner.Service";
import { useNavigate } from "react-router-dom";
import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaLine,
  FaUserCircle,
  FaCrown,
  FaPlayCircle,
  FaGift,
  FaUser,
} from "react-icons/fa";
import { getRecentlySignedUpUsers } from "../../Service/recentlySignupUser.Service";

const HomePage = () => {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState("");
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  console.log(userList, "userList");

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

    fetchBanners();
    fetchUserList();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const fetchUserList = async () => {
    try {
      const users = await getRecentlySignedUpUsers();
      const formattedUsers = users?.map((user) => {
        const maskedPhone =
          user?.phone?.length === 10
            ? `*****${user?.phone?.slice(-5)}`
            : user?.phone; 
        return {
          id: user?._id,
          phone: maskedPhone || "N/A",
          refReward: user?.refReward || 0,
        };
      });
      setUserList(formattedUsers);
    } catch (error) {
      setError(error.message);
    }
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

        <div className="cards-container">
          <div className="cards-adjust">
            <div className="card" onClick={() => handleNavigate("/vip")}>
              <FaCrown className="icon vip-icon" />
              <p>VIP Area</p>
            </div>
            <div className="card">
              <FaPlayCircle className="icon tutorial-icon" />
              <p>Video Tutorial</p>
            </div>
          </div>
          <div className="cards-adjust">
            <div className="card">
              <FaGift className="icon rewards-icon" />
              <p>Promotion Rewards</p>
            </div>
            <div className="card" onClick={() => handleNavigate("/profile")}>
              <FaUser className="icon profile-icon" />
              <p>Profile</p>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="task-hall-label">Task Hall</div>
        <div className="cards-container">
          <div className="cards-adjust">
            <div className="card">
              <FaYoutube className="icon youtube-icon" />
              <p>YouTube Like and Follow</p>
            </div>
            <div className="card">
              <FaInstagram className="icon instagram-icon" />
              <p>Instagram Like and Follow</p>
            </div>
          </div>
          <div className="cards-adjust">
            <div className="card">
              <FaFacebook className="icon facebook-icon" />
              <p>Facebook Share</p>
            </div>
            <div className="card">
              <FaLine className="icon line-icon" />
              <p>Line line</p>
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
                  <p>Congratulations {user?.phone || "Anonymous"}</p>
                </div>

                {/* RefReward */}
                <div className="coins-display">
                  <span className="coins">{user?.refReward}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
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

export default HomePage;
