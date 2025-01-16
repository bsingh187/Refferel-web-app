import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";
import { toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa";
import { performTask } from "../../Service/task.Service";

export default function TaskDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;

  const isSocialTask = ["youtube", "instagram", "facebook"].includes(
    task?.taskCategory?.toLowerCase()
  );

  // Function to handle the "Do this Task" button click
  const handleDoTask = async () => {
    if (!task) {
      toast.warn("Task not found.");
      return;
    }

    try {
      // Check if task link exists
      const taskLink = task?.taskId?.taskLink || task?.taskLink;
      console.log(taskLink, "taskLink");
      const taskId = task?.taskId?._id || task?._id;

      if (taskLink) {
        await performTask(taskId);

        window.open(taskLink, "_blank");
      } else {
        toast.warn("Task link not available.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    }
  };

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
            {isSocialTask && (
              <>
                <p className="task-link">
                  <strong>Task Link:</strong>{" "}
                  {task?.taskId?.taskLink || task?.taskLink}
                </p>

                <div className="jump-button" onClick={handleDoTask}>
                  Do this Task
                  <FaArrowRight className="jump-arrow-icon" />
                  <span className="jump-text"></span>
                </div>
              </>
            )}
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
