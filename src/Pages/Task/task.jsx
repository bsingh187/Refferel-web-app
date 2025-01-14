import React, { useEffect, useState } from "react";
import "./style.scss";
import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import FooterComponent from "../../components/footer";
import {
  filteredTask,
  filteredSocialTask,
  performTask,
} from "../../Service/task.Service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TaskPage = () => {
  const [activeTab, setActiveTab] = useState("Audit");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socialTaskloading, setSocialTaskLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("youtube");
  const [categoryTasks, setCategoryTasks] = useState([]);
  const navigate = useNavigate();
  console.log(categoryTasks, "categoryTasks");

  const taskData = {
    Audit: {
      showSubmit: false,
      icon: <FaCheckCircle className="audit-icon" />,
      label: "Audit",
    },
    Confirmed: {
      showSubmit: false,
      icon: <FaCheckCircle className="completed-icon" />,
      label: "Confirmed",
    },
    Failed: {
      showSubmit: false,
      icon: <FaExclamationCircle className="failed-icon" />,
      label: "Failed",
    },
  };

  // Fetch tasks for Audit, Confirmed, and Failed
  const fetchTasks = async (status) => {
    setLoading(true);
    try {
      const response = await filteredTask(status.toLowerCase());
      setTasks(response?.data || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks for YouTube, Instagram, and Facebook
  const fetchCategoryTasks = async (category) => {
    setSocialTaskLoading(true);
    try {
      const response = await filteredSocialTask(category.toLowerCase());
      console.log(response, "response");
      setCategoryTasks(response?.data || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch tasks for category");
    } finally {
      setSocialTaskLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(activeTab);
  }, [activeTab]);

  useEffect(() => {
    fetchCategoryTasks(activeCategory);
  }, [activeCategory]);

  const handleCardClick = async (task) => {
    try {
      if (
        ["youtube", "instagram", "facebook"].includes(
          activeCategory.toLowerCase()
        )
      ) {
        // Trigger API only for social categories
        const response = await performTask(task?._id);
        navigate("/task-details", { state: { task, apiResponse: response } });
      } else if (
        ["audit", "confirmed", "failed"].includes(activeTab.toLowerCase())
      ) {
        // Directly navigate for Audit, Confirmed, and Failed without API call
        navigate("/task-details", { state: { task } });
      }
    } catch (error) {
      toast.error(error.message || "Failed to perform task");
    }
  };

  const handleAuditCardClick = (task) => {
    navigate("/task-details", { state: { task } });
  };
  return (
    <div className="mobile-container">
      {/* Header */}
      <header className="mobile-header">
        <h2>Task List</h2>
      </header>

      {/* Content */}
      <div className="mobile-content">
        {/* Tabs for Audit, Confirmed, Failed */}
        <div className="task-tabs">
          {["Audit", "Confirmed", "Failed"].map((tab, index) => (
            <button
              key={index}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Task Cards */}

        {loading ? (
          <div
            className="task-card loading-card"
            style={{ color: "white", backgroundColor: "#142850" }}
          >
            <p>Loading tasks...</p>
          </div>
        ) : tasks.length > 0 ? (
          tasks?.map((task, index) => (
            <div
              style={{ cursor: "pointer" }}
              key={index}
              className="task-card"
              onClick={() => handleAuditCardClick(task)}
            >
              <div className="task-icon">{taskData[activeTab].icon}</div>
              <div className="task-details">
                <h4>{task.taskId?.name || "Task Name Not Available"}</h4>
                <div className="task-info">
                  <p>
                    <strong>Pay Rs:</strong>
                    <span>{task.taskId?.reward || "-"}</span>
                  </p>
                  <p>
                    <strong>Task Category:</strong>
                    {task.taskId?.taskCategory || "-"}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(task?.createdAt).toLocaleString() || "-"}
                  </p>
                  <p>
                    <strong>Status:</strong> {task?.status || activeTab}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="task-card no-task-card">
            <div className="task-icon">{taskData[activeTab].icon}</div>
            <div className="task-details">
              <h4>No Tasks Found</h4>
            </div>
          </div>
        )}

        {/* Tabs for YouTube, Instagram, Facebook */}
        <div className="task-tabs">
          {["YouTube", "Instagram", "Facebook"].map((category, index) => (
            <button
              key={index}
              className={`tab ${
                activeCategory === category.toLowerCase() ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.toLowerCase())}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Category Task Cards */}
        {socialTaskloading ? (
          <div className="task-card loading-card">
            <p>Loading tasks...</p>
          </div>
        ) : categoryTasks.length > 0 ? (
          categoryTasks?.map((task, index) => (
            <div
              key={index}
              className="task-card"
              onClick={() => handleCardClick(task)}
            >
              <div className="task-icon">
                {activeCategory === "youtube" && (
                  <FaYoutube className="youtube-icon" />
                )}
                {activeCategory === "instagram" && (
                  <FaInstagram className="instagram-icon" />
                )}
                {activeCategory === "facebook" && (
                  <FaFacebook className="facebook-icon" />
                )}
              </div>
              <div className="task-details">
                {/* Task Name */}
                <h4>{task.name || "Unnamed Task"}</h4>

                {/* Task Info */}
                <div className="task-info">
                  <p>
                    <strong>Pay Rs:</strong> <span>{task.reward || "-"}</span>
                  </p>
                  <p>
                    <strong>Task Category:</strong>{" "}
                    <span>{task.taskCategory || "-"}</span>
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    <span>
                      {task.createdAt
                        ? new Date(task.createdAt).toLocaleString()
                        : "-"}
                    </span>
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span>{task.isDisabled ? "Disabled" : "Active"}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="task-card no-task-card">
            <div className="task-icon">
              {activeCategory === "youtube" && (
                <FaYoutube className="youtube-icon" />
              )}
              {activeCategory === "instagram" && (
                <FaInstagram className="instagram-icon" />
              )}
              {activeCategory === "facebook" && (
                <FaFacebook className="facebook-icon" />
              )}
            </div>
            <div className="task-details">
              <h4>No Tasks Found</h4>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default TaskPage;
