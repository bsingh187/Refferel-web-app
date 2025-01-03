import React, { useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { FaYoutube, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const TaskPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Doing");

  const handleNavigate = (path) => {
    navigate(path);
  };

  const taskData = {
    Doing: {
      showSubmit: true,
      icon: <FaYoutube className="youtube-icon" />,
      label: "YouTube Task Requirements",
    },
    Audit: {
      showSubmit: false,
      icon: <FaCheckCircle className="audit-icon" />,
      label: "Audit",
    },
    Completed: {
      showSubmit: false,
      icon: <FaCheckCircle className="completed-icon" />,
      label: "Completed",
    },
    Failed: {
      showSubmit: false,
      icon: <FaExclamationCircle className="failed-icon" />,
      label: "Failed",
    },
  };

  return (
    <div className="mobile-container">
      {/* Header */}
      <header className="mobile-header">
        <h2>Task List</h2>
      </header>

      {/* Content */}
      <div className="mobile-content">
        <div className="task-tabs">
          {["Doing", "Audit", "Completed", "Failed"].map((tab, index) => (
            <button
              key={index}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="task-card">
          <div className="task-icon">{taskData[activeTab].icon}</div>
          <div className="task-details">
            <h4>{taskData[activeTab].label}:</h4>
            <p>
              Like and follow and take screenshots. Upload to the platform.
            </p>
            <div className="task-info">
              <p>
                <strong>Unit Price:</strong> <span>Rs5</span>
              </p>
              <p>
                <strong>Create:</strong> 2021-07-01 16:38:53
              </p>
              <p>
                <strong>Audit:</strong> 2021-07-01 16:38:53
              </p>
              <div className="links">
                <a href="#" className="link">
                  Open the link
                </a>
                {" | "}
                <a href="#" className="link">
                  Copy the link
                </a>
              </div>
            </div>
          </div>

          {taskData[activeTab].showSubmit && (
            <div className="task-actions">
              <button className="submit-btn">Submit</button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mobile-footer">
        <div className="footer-tab" onClick={() => handleNavigate("/home")}>
          <span className="tab-icon">🏠</span>
          <span className="tab-label">Home</span>
        </div>
        <div className="footer-tab active" onClick={() => handleNavigate("/task")}>
          <span className="tab-icon">📋</span>
          <span className="tab-label">Task</span>
        </div>
        <div className="footer-tab" onClick={() => handleNavigate("/vip")}>
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
        <div className="footer-tab" onClick={() => handleNavigate("/profile")}>
          <span className="tab-icon">👤</span>
          <span className="tab-label">Profile</span>
        </div>
      </footer>
    </div>
  );
};

export default TaskPage;
