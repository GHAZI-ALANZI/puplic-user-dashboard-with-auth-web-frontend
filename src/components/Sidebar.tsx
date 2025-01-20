import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar: React.FC<{ setActiveSection: (section: string) => void }> = ({ setActiveSection }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState<string>(new Date().toLocaleDateString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toLocaleDateString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <div className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        <i className={`bi ${collapsed ? "bi-chevron-right" : "bi-chevron-left"}`}></i>
      </div>

      {/* Clock - Hide when collapsed */}
      {!collapsed && (
        <div className="sidebar-clock">
          <div className="clock-time">{currentTime}</div>
          <div className="clock-date">{currentDate}</div>
        </div>
      )}

      {/* Sidebar Menu */}
      <ul className="sidebar-menu">
        <li><Link to="#" onClick={() => setActiveSection("home")}><i className="bi bi-house-door"></i> {!collapsed && <span>Home</span>}</Link></li>
        <li><Link to="#" onClick={() => setActiveSection("profile")}><i className="bi bi-person"></i> {!collapsed && <span>Profile</span>}</Link></li>
        <li><Link to="#" onClick={() => setActiveSection("services")}><i className="bi bi-grid"></i> {!collapsed && <span>Services</span>}</Link></li>
        <li><Link to="#" onClick={() => setActiveSection("notifications")}><i className="bi bi-bell"></i> {!collapsed && <span>Notifications</span>}</Link></li>
        <li><Link to="#" onClick={() => setActiveSection("messages")}><i className="bi bi-envelope"></i> {!collapsed && <span>Messages</span>}</Link></li>
        <li className="logout"><Link to="#" onClick={() => window.location.href = "/login"}><i className="bi bi-box-arrow-right"></i> {!collapsed && <span>Logout</span>}</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
