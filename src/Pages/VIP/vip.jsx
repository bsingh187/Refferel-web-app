import React, { useEffect, useState } from "react";
import "./style.scss";
import API_BASE_URL from "../../Service/Apiurl";
import { getAllBanners } from "../../Service/getAllBanner.Service";
import { useNavigate } from "react-router-dom";
import { getAllPackages } from "../../Service/package.Service";

const VipPage = () => {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState("");
  const [packages, setPackages] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showCards, setShowCards] = useState(false);

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
            {banners?.map((_, index) => (
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

        {/* Scrollable Content */}

        <div className="mobile-contents-cards">
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
          <div className="footer-tab" onClick={() => handleNavigate("/wallet")}>
            <span className="tab-icon">🏠</span>
            <span className="tab-label">Wallet</span>
          </div>
          <div className="footer-tab" onClick={() => handleNavigate("/profit")}>
            <span className="tab-icon">📈</span>
            <span className="tab-label">Profit</span>
          </div>
          <div
            className="footer-tab"
            onClick={() => handleNavigate("/profile")}
          >
            <span className="tab-icon">👤</span>
            <span className="tab-label">Profile</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default VipPage;
