import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";

export default function TaskDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;
  const apiResponse = location.state?.apiResponse;

  return (
    <div className="mobile-container">
      <header className="mobile-header">
        <button className="back-button" onClick={() => navigate("/task")}>
          ⬅ Back
        </button>
        <h2>Task Details</h2>
      </header>

      <div className="mobile-content">

        {task ? (
          <div className="task-details-card">
            <h4 className="task-title">Task:{task.name || "-"}</h4>
            <div className="task-details-info">
              <p>
                <strong>Reward:</strong> {task.reward || "-"}
              </p>
              <p>
                <strong>Task Category:</strong> {task.taskCategory || "-"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleString()
                  : "-"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span>{task.isDisabled ? "Disabled" : "Active"}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="no-task-details">
            <h4>No Task Details Found</h4>
          </div>
        )}
      </div>
    </div>
  );
}
