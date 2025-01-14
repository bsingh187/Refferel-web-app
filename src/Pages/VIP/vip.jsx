import React, { useEffect, useState } from "react";
import "./style.scss";
import API_BASE_URL from "../../Service/Apiurl";
import { getAllBanners } from "../../Service/getAllBanner.Service";
import { useNavigate } from "react-router-dom";
import { buyPackage, getAllPackages } from "../../Service/package.Service";
import FooterComponent from "../../components/footer";
import { toast } from "react-toastify";

const VipPage = () => {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState("");
  const [packages, setPackages] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showCards, setShowCards] = useState(false);
  const [loadingPackage, setLoadingPackage] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

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

  const handleCardClick = (packageId) => {
    navigate("/package-details", { state: { packageId } });
  };

  const handleBuyPackage = async () => {
    if (!selectedPackage) return;

    setLoadingPackage(selectedPackage);
    setShowConfirmPopup(false);
    try {
      const response = await buyPackage(selectedPackage);
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error.message || "Failed to buy package.");
    } finally {
      setLoadingPackage(null);
    }
  };

  const openConfirmPopup = (packageId) => {
    setSelectedPackage(packageId);
    setShowConfirmPopup(true);
  };

  const closeConfirmPopup = () => {
    setSelectedPackage(null);
    setShowConfirmPopup(false);
  };

  return (
    <div className="mobile-container">
      <div className="vip-container">
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
            {/* Carousel Controls */}
          </div>
          <div className="mobile-contents-cards">
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
                    <div>
                      <button
                        className="buy-package-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openConfirmPopup(pkg._id);
                        }}
                        disabled={loadingPackage === pkg._id}
                      >
                        {loadingPackage === pkg._id
                          ? "Processing..."
                          : "Buy Package"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="confirmation-popup">
          <div className="popup-content">
            <h3>Are you sure?</h3>
            <p>Do you want to buy this package?</p>
            <div className="popup-actions">
              <button className="confirm-button" onClick={handleBuyPackage}>
                Yes, Buy
              </button>
              <button className="cancel-button" onClick={closeConfirmPopup}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterComponent />
    </div>
  );
};

export default VipPage;
