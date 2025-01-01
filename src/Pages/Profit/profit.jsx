import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import referImage from "../../assets/referImage.png"

const ProfitPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="mobile-container">
      {/* Header */}
      <header className="mobile-header">
        <h2>Profit</h2>
      </header>

      {/* Content */}
      <div className="mobile-content">
        <div className="image-wrapper">
          <img
            src={referImage}
            alt="Membership Benefits"
            className="profit-image"
          />
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

export default ProfitPage;
