import React, { useState, useEffect } from "react";
import "./editProfile.scss";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateBankDetails } from "../../Service/getUserProfile";
import { toast } from "react-toastify";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bankName: "",
    bankAccountNumber: "",
    bankIFSC: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        if (!response.error) {
          setFormData({
            bankName: response?.data?.bankName || "",
            bankAccountNumber: response?.data?.bankAccountNumber || "",
            bankIFSC: response?.data?.bankIFSC || "",
          });
        } else {
          setError(response?.message || "Failed to load profile data.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await updateBankDetails(formData);
    //   toast.success(response?.error?.message)
      navigate("/profile");
    } catch (err) {
      setError(err.message);
      alert(err.message || "Failed to update bank details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="mobile-container">
      {/* Header */}
      <header className="mobile-header">
        <button className="back-button" onClick={() => navigate("/profile")}>
          ⬅ Back
        </button>
        <h2>Edit Profile</h2>
      </header>

      {/* Content */}
      <div className="mobile-content">
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-group">
            <label className="label-color">Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleInputChange}
              placeholder="Enter bank name"
            />
          </div>
          <div className="form-group">
            <label className="label-color">Bank Account Number</label>
            <input
              type="text"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleInputChange}
              placeholder="Enter bank account number"
            />
          </div>
          <div className="form-group">
            <label className="label-color">Bank IFSC</label>
            <input
              type="text"
              name="bankIFSC"
              value={formData.bankIFSC}
              onChange={handleInputChange}
              placeholder="Enter bank IFSC"
            />
          </div>
          <button type="submit" className="save-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
