import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";
import { toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa";

export default function TaskDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;

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
            <h4 className="task-title">
              Task title: {task?.taskId?.name || task?.name}
            </h4>
            <p>
              <strong>Reward:</strong> {task?.taskId?.reward || task?.reward}
            </p>
            <p>
              <strong>Task Description:</strong>{" "}
              {task?.taskId?.description || task?.description}
            </p>
            <p>
              <strong>Task Category:</strong>{" "}
              {task?.taskId?.taskCategory || task?.taskCategory}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {task.createdAt
                ? new Date(task?.createdAt).toLocaleString()
                : "-"}
            </p>
            <p>
              <strong>Status:</strong> {task?.status || "-"}
            </p>

            <div
              className="jump-button"
              onClick={() => {
                if (task?.taskId?.taskLink || task?.taskLink) {
                  window.open(
                    task?.taskId?.taskLink || task?.taskLink,
                    "_blank"
                  );
                } else {
                  toast.warn("Task link not available.");
                }
              }}
            >
              <FaArrowRight className="jump-arrow-icon" />
              <span className="jump-text"></span>
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
