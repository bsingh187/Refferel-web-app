import React, { useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { addBalance } from "../../Service/getUserProfile";

const AddBalancePage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      const response = await addBalance(Number(amount));
      console.log("Add Balance Response:", response);
      navigate("/profile");
    } catch (error) {
      console.error("Error adding balance:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mobile-container">
      {/* Header */}
      <header className="mobile-header">
        <button className="back-button" onClick={() => navigate("/profile")}>
          ⬅ Back
        </button>
        <h2>Add Balance</h2>
      </header>

      {/* Content */}
      <div className="mobile-content">
        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-group">
            <label className="label-color">Add amount</label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Processing..." : "Add Balance"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBalancePage;
