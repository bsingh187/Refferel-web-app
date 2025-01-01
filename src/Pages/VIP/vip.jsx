import React, { useEffect, useState } from "react";
import "./style.scss";
import API_BASE_URL from "../../Service/Apiurl";
import { getAllBanners } from "../../Service/getAllBanner.Service";
import { useNavigate } from "react-router-dom";

const VipPage = () => {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("YouTube");

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

    fetchBanners();
  }, []);

  const vipLevels = [
    { title: "Intern", tasks: "5", color: "#b0bec5" },
    { title: "VIP1", tasks: "10", color: "#ffcc80" },
    { title: "VIP2", tasks: "20", color: "#7e57c2" },
    { title: "VIP3", tasks: "35", color: "#26c6da" },
    { title: "VIP4", tasks: "97", color: "#ef5350" },
    { title: "VIP5", tasks: "158", color: "#ab47bc" },
    { title: "VIP6", tasks: "238", color: "#8bc34a" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="vip-container">
      {/* Banner Section */}
      <div className="banner-section">
        {banners.length > 0 ? (
          <img
            src={`${API_BASE_URL}${banners[0]?.imagePath}`}
            alt="VIP Banner"
            className="vip-banner"
          />
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <p>Loading banner...</p>
        )}
      </div>

      {/* Tabs Section */}
      <div className="tabs-container">
        {["YouTube", "Instagram", "Facebook"].map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div className="mobile-content">
        {/* VIP Levels */}
        <div className="vip-cards-container">
          {vipLevels.map((level, index) => (
            <div
              key={index}
              className="vip-card"
              style={{ backgroundColor: level.color }}
            >
              <p className="vip-title">{level.title}</p>
              <p className="vip-tasks">Daily Tasks: {level.tasks}</p>
            </div>
          ))}
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
        <div className="footer-tab active" onClick={() => handleNavigate("/vip")}>
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

export default VipPage;
