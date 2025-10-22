import React from "react";
import { Link } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext";
import "./Sidebar.css";
import { FaBookOpen, FaBullseye, FaHeart } from "react-icons/fa";

const Sidebar = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className={`sidebar-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <h5 className="sidebar-title">About Us</h5>
      <p className="sidebar-subtitle">Learn more about our coffee journey</p>

      <div className="sidebar-links">
        <Link to="/about#story" className="sidebar-link">
          <FaBookOpen /> Our Story
        </Link>
        <Link to="/about#mission" className="sidebar-link">
          <FaBullseye /> Our Mission
        </Link>
        <Link to="/about#values" className="sidebar-link">
          <FaHeart /> Our Values
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
