import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPackageById } from "../../Service/package.Service";
import "./packageDetails.scss";

const PackageDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackageDetails = async () => {
      if (location.state?.packageId) {
        try {
          const data = await getPackageById(location.state.packageId);
          setPackageData(data);
        } catch (err) {
          setError(err.message);
        }
      } else {
        setError("No package ID provided.");
      }
    };

    fetchPackageDetails();
  }, [location.state]);

  if (error) {
    return <div className="mobile-container"><p>Error: {error}</p></div>;
  }

  if (!packageData) {
    return <div className="mobile-container"><p>Loading...</p></div>;
  }

  return (
    <div className="mobile-container">
      <div className="package-details-container">
        <header className="package-header">
          <button onClick={() => navigate("/vip")} className="back-button">
            ⬅ Back
          </button>
          <h2>{packageData.name} Details</h2>
        </header>

        <div className="package-info">
          <p>Price: {packageData.price || "N/A"} Rs</p>
          <p>Reward: {packageData.reward || "N/A"} Rs</p>
          <p>
            Daily Tasks: {packageData.dailyTask || packageData.task || "N/A"}
          </p>
          <p>Status: {packageData.isDisabled ? "Disabled" : "Active"}</p>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
