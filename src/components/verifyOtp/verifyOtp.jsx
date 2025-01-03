import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../../Service/verifyOtp.Service";
import "./style.scss";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (value, index) => {
    if (!/^[0-9]*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      try {
        setIsSubmitting(true);
        setError("");
        const response = await verifyOtp(otpValue);

        navigate("/home");
      } catch (error) {
        setError(error.message);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setError("Please enter a valid 4-digit OTP.");
    }
  };

  return (
    <div className="verify-otp-container">
      <div className="verify-otp-box">
        <h2>Verify OTP</h2>
        <p className="instruction">Enter the 4-digit OTP sent to your phone.</p>
        <div className="otp-inputs">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        {error && <p className="error-message">{error}</p>}
        <button
          className="verify-btn"
          onClick={handleVerify}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
