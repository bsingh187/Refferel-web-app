import React from "react";
import "./style.scss";
import referImage from "../../assets/referImage.jpg"
import FooterComponent from "../../components/footer";

const ProfitPage = () => {

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
       <FooterComponent />
    </div>
  );
};

export default ProfitPage;
