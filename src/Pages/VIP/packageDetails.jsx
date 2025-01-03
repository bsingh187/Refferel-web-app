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

  if (error) return <p>Error: {error}</p>;
  if (!packageData) return <p>Loading...</p>;

  return (
    <div className="package-details-container">
      <header className="package-header">
        <button onClick={() => navigate("/vip")} className="back-button">
          ⬅ Back
        </button>
        <h2>{packageData.name} Details</h2>
      </header>

      <div className="package-info">
        <p>Price: {packageData.price} Rs</p>
        <p>Reward: {packageData.reward} Rs</p>
        <p>Daily Tasks: {packageData.dailyTask || packageData.task}</p>
        <p>Status: {packageData.isDisabled ? "Disabled" : "Active"}</p>
      </div>
    </div>
  );
};

export default PackageDetails;
