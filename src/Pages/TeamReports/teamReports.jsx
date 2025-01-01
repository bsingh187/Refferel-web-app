import React, { useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const TeamReports = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Team Reports");
  const [activeLevel, setActiveLevel] = useState("Level 1");

  const levelsData = {
    "Level 1": [
      { title: "Recharge Amount (Rs):", value: "0.68" },
      { title: "Recharge Number (PCE):", value: "1" },
    ],
    "Level 2": [
      { title: "Recharge Amount (Rs):", value: "3.40" },
      { title: "Recharge Number (PCE):", value: "6" },
    ],
    "Level 3": [
      { title: "Recharge Amount (Rs):", value: "9.27" },
      { title: "Recharge Number (PCE):", value: "10" },
    ],
  };

  const myTeamData = {
    "Level 1": [
      { title: "Team Performance (PCE):", value: "5" },
      { title: "Total Members:", value: "20" },
    ],
    "Level 2": [
      { title: "Team Performance (PCE):", value: "10" },
      { title: "Total Members:", value: "50" },
    ],
    "Level 3": [
      { title: "Team Performance (PCE):", value: "15" },
      { title: "Total Members:", value: "100" },
    ],
  };

  const isTeamReports = activeTab === "Team Reports";

  return (
    <div className="mobile-container">
      {/* Header */}
      <header className="mobile-header">
        <button className="back-button" onClick={() => navigate("/profile")}>
          ⬅ Back
        </button>
        <h2>Team Reports</h2>
      </header>

      {/* Content */}
      <div className="mobile-content">
      <section className="team-reports-section">
          <div className="tab-container">
            <button
              className={`tab-button ${isTeamReports ? "active" : ""}`}
              onClick={() => setActiveTab("Team Reports")}
            >
              Team Reports
            </button>
            <button
              className={`tab-button ${!isTeamReports ? "active" : ""}`}
              onClick={() => setActiveTab("My Team")}
            >
              My Team
            </button>
          </div>

          <div className="stats-grid">
          {isTeamReports && (
            <>
            <div className="stat-item">
              <p>Team Recharge (Rs):</p>
              <strong>0.00</strong>
            </div>
            <div className="stat-item">
              <p>Team Withdraw (Rs):</p>
              <strong>0.00</strong>
            </div>
            <div className="stat-item">
              <p>Number of First Charge (PCE):</p>
              <strong>0</strong>
            </div>
            <div className="stat-item">
              <p>Number of First Push (PCE):</p>
              <strong>0</strong>
            </div>
            <div className="stat-item">
              <p>Team Size (PCE):</p>
              <strong>1</strong>
            </div>
            <div className="stat-item">
              <p>New Team (PCE):</p>
              <strong>0</strong>
            </div>
            </>
           )}
          </div>

          <div className="level-content">
            <section className="team-reports-level-section">
              <div className="level-tab-container">
                <button
                  className={`tab-button ${
                    activeLevel === "Level 1" ? "active" : ""
                  }`}
                  onClick={() => setActiveLevel("Level 1")}
                >
                  Level 1
                </button>
                <button
                  className={`tab-button ${
                    activeLevel === "Level 2" ? "active" : ""
                  }`}
                  onClick={() => setActiveLevel("Level 2")}
                >
                  Level 2
                </button>
                <button
                  className={`tab-button ${
                    activeLevel === "Level 3" ? "active" : ""
                  }`}
                  onClick={() => setActiveLevel("Level 3")}
                >
                  Level 3
                </button>
              </div>

              {/* Dynamic Cards */}
              <div className="level-cards">
                {levelsData[activeLevel]?.map((item, index) => (
                  <div key={index} className="card">
                    <p>{item.title}</p>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamReports;
