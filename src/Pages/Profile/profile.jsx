import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUserCircle, FaEdit } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { getUserProfile, getWalletBalance } from "../../Service/getUserProfile";
import FooterComponent from "../../components/footer";
import { getAllSupportChat } from "../../Service/support.Service";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        if (!response.error) {
          setUserData(response?.data);
        } else {
          setError(response?.message || "Failed to load profile data.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchWallet = async () => {
      try {
        const revenue = await getWalletBalance();
        setTotalRevenue(revenue);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
    fetchWallet();
    getAllSupportChat();
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  // const handleTeamReports = () => {
  //   navigate("/team-reports");
  // };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleInviteFriends = () => {
    navigate("/invite-friends");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleSupportModal = () => {
    setShowSupportModal(!showSupportModal);
  };

  return (
    <div className="mobile-container">
      {/* Header */}
      <header className="mobile-header">
        <h2>My Profile</h2>
      </header>

      {/* Content */}
      <div className="mobile-content">
        <section className="profile-section">
          <div className="profile-header">
            <FaUserCircle className="profile-avatar" />
            <div>
              <p>Account : {userData?.bankAccountNumber || "-"}</p>
              <p>Invitation Code : {userData?.refCode || "-"}</p>
            </div>
            <button
              className="edit-profile-btn"
              title="Edit Profile"
              onClick={handleEditProfile}
            >
              <FaEdit className="edit-icon" /> Edit
            </button>
          </div>
        </section>

        <section className="earnings-section">
          <div className="earnings-row">
            <div className="earning-card">
              Balance (Rs): {userData?.balance || 0}
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <div className="cards-container">
          <div className="crads-adjust">
            <div className="card" onClick={toggleModal}>
              <span className="card-icon">👤</span>
              <p>Personal Information</p>
            </div>
            <div className="card" onClick={handleInviteFriends}>
              <span className="card-icon">🤝</span>
              <p>Invite Friends</p>
            </div>
          </div>
          <div className="crads-adjust">
            <div className="card" onClick={toggleSupportModal}>
              <span className="card-icon">🤝</span>
              <p>Support</p>
            </div>
            <div className="card" onClick={handleLogOut}>
              <FaSignOutAlt className="logout-icon" />
              <p>Log-out</p>
            </div>
          </div>
          <div className="crads-adjust">
            {/* <div className="card" onClick={handleTeamReports}>
              <span className="card-icon">📊</span>
              <p>Team Reports</p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={toggleModal}>
              <IoIosClose />
            </button>
            <h3>Personal Information</h3>
            <div className="personal-info">
              <p>
                <strong>First Name:</strong> {userData?.firstName || "-"}
              </p>
              <p>
                <strong>Email:</strong> {userData?.email || "-"}
              </p>
              <p>
                <strong>Phone:</strong> {userData?.phone || "-"}
              </p>
              <p>
                <strong>Instagram ID:</strong> {userData?.instagramId || "-"}
              </p>
              <p>
                <strong>Referral Code:</strong> {userData?.refCode || "-"}
              </p>
              <p>
                <strong>Bank Account Number:</strong>{" "}
                {userData?.bankAccountNumber || "-"}
              </p>
              <p>
                <strong>Account Balance:</strong> Rs {userData?.balance || 0}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Support Chat Modal */}
      {showSupportModal && (
        <div className="modal-overlay">
          <div className="modal-content chat-modal">
            <button className="close-modal" onClick={toggleSupportModal}>
              <IoIosClose />
            </button>
            <div className="chat-header">
              <h3>Admin support</h3>
            </div>
            <div className="chat-body">
              <div className="message sender">
                <p>Hello, how can we help you today?</p>
              </div>
              <div className="message receiver">
                <p>I need help with my account balance.</p>
              </div>
              <div className="message sender">
                <p>Sure! Can you provide more details?</p>
              </div>
            </div>
            <div className="chat-footer">
              <input
                type="text"
                className="chat-input"
                placeholder="Type a message..."
              />
              <button className="send-button">Send</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}

      <FooterComponent />
    </div>
  );
};

export default ProfilePage;
