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
import { toast } from "react-toastify";

const HomePage = () => {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState("");
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showCards, setShowCards] = useState(false);

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

    const timer = setTimeout(() => {
      setShowCards(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Banner rotation logic
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  // Handle restricted navigation
  const handleNavigate = (path) => {
    if (!isLoggedIn) {
      toast.error("Please login or sign up to access this feature.");
    } else {
      navigate(path);
    }
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
        <h2>Demo App</h2>
        {!isLoggedIn && (
          <div className="auth-buttons">
            <button className="login-btn" onClick={() => navigate("/")}>
              Login
            </button>
            <button className="signup-btn" onClick={() => navigate("/sign-up")}>
              Sign Up
            </button>
          </div>
        )}
      </header>

      {/* Content */}
      <div className="mobile-content">
        <div className="banner-container">
          {banners.length > 0 && (
            <div className="banner">
              <img
                src={`${API_BASE_URL}${banners[currentBannerIndex]?.imagePath}`}
                alt={banners[currentBannerIndex]?.name}
                className="banner-image"
              />
            </div>
          )}

          <div className="carousel-controls">
            <div
              className="carousel-control"
              onClick={() =>
                setCurrentBannerIndex((prevIndex) =>
                  prevIndex === 0 ? banners.length - 1 : prevIndex - 1
                )
              }
            >
              &#x2039;
            </div>
            <div
              className="carousel-control"
              onClick={() =>
                setCurrentBannerIndex(
                  (prevIndex) => (prevIndex + 1) % banners.length
                )
              }
            >
              &#x203A;
            </div>
          </div>

          <div className="carousel-indicators">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`carousel-indicator ${
                  index === currentBannerIndex ? "active" : ""
                }`}
                onClick={() => setCurrentBannerIndex(index)}
              ></div>
            ))}
          </div>
        </div>

        <div className="cards-container">
          <div className="cards-adjust">
            <div className="card" onClick={() => handleNavigate("/vip")}>
              <FaCrown className="icon vip-icon" />
              <p>VIP Area</p>
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
              <p>Coming soon...</p>
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
        <div className="footer-tab" onClick={() => handleNavigate("/wallet")}>
          <span className="tab-icon">🏠</span>
          <span className="tab-label">Wallet</span>
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
