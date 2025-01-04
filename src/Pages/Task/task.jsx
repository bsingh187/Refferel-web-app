import React, { useState } from "react";
import "./style.scss";
import { FaYoutube, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import FooterComponent from "../../components/footer";

const TaskPage = () => {
  const [activeTab, setActiveTab] = useState("Doing");


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
       <FooterComponent />
    </div>
  );
};

export default TaskPage;
