import React, { useEffect, useState } from "react";
import "./style.scss";
import API_BASE_URL from "../../Service/Apiurl";
import { getAllBanners } from "../../Service/getAllBanner.Service";
import { useNavigate } from "react-router-dom";
import { getAllPackages } from "../../Service/package.Service";

const VipPage = () => {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("YouTube");
  const [packages, setPackages] = useState([]);

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

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const packageData = await getAllPackages();
        if (packageData?.data) {
          setPackages(packageData.data);
        } else {
          setError(packageData?.message || "Failed to load packages.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPackages();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleCardClick = (packageId) => {
    navigate("/package-details", { state: { packageId } });
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
          {packages?.map((pkg, index) => {
            const darkColors = [
              "#455a64",
              "#e65100",
              "#5e35b1",
              "#00838f",
              "#b71c1c",
              "#6a1b9a",
              "#33691e",
            ];

            return (
              <div
                key={pkg._id}
                className={`vip-card ${pkg.isDisabled ? "disabled" : ""}`}
                style={{
                  backgroundColor: darkColors[index % darkColors.length],
                  border: pkg.isDisabled
                    ? "1px solid #616161"
                    : "2px solid #ffffff",
                  opacity: pkg.isDisabled ? 0.6 : 1,
                }}
                onClick={() => handleCardClick(pkg?._id)}
              >
                <p className="vip-title">{pkg?.name}</p>
                <p className="vip-tasks">
                  Daily Tasks: {pkg?.dailyTask || pkg?.task}
                </p>
              </div>
            );
          })}
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
        <div
          className="footer-tab active"
          onClick={() => handleNavigate("/vip")}
        >
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
