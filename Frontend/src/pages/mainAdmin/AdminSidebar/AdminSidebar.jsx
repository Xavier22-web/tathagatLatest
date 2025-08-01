import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBookOpen, FaUsers, FaUserGraduate, FaChalkboardTeacher, FaUserCircle, FaSignOutAlt, FaClipboardList, FaFileAlt, FaBullhorn, FaComments, FaGraduationCap } from "react-icons/fa";
import logo from "../../../images/tgLOGO.png"
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="admin-logo"> 
        <img src={logo} alt="" />
      </div>
      <nav className="admin-nav">
        <NavLink to="/admin/dashboard" className="admin-link">
          <FaTachometerAlt className="admin-icon" /> Dashboard
        </NavLink>
        <NavLink to="/admin/add-courses" className="admin-link">
          <FaBookOpen className="admin-icon" /> Add Courses
        </NavLink>
        <NavLink to="/admin/course-content-manager" className="admin-link">
  <FaBookOpen className="admin-icon" /> Manage Subjects
</NavLink>

        <NavLink to="/admin/view-courses" className="admin-link">
          <FaBookOpen className="admin-icon" /> View Courses
        </NavLink>
        <NavLink to="/admin/practice-tests" className="admin-link">
          <FaClipboardList className="admin-icon" /> Practice Tests
        </NavLink>
        <NavLink to="/admin/mock-tests" className="admin-link">
          <FaGraduationCap className="admin-icon" /> Mock Tests
        </NavLink>
        <NavLink to="/admin/study-materials" className="admin-link">
          <FaFileAlt className="admin-icon" /> Study Materials
        </NavLink>
        <NavLink to="/admin/announcements" className="admin-link">
          <FaBullhorn className="admin-icon" /> Announcements
        </NavLink>
        <NavLink to="/admin/discussions" className="admin-link">
          <FaComments className="admin-icon" /> Discussions
        </NavLink>
        <NavLink to="/admin/all-users" className="admin-link">
          <FaUsers className="admin-icon" /> All Users
        </NavLink>
        <NavLink to="/admin/all-students" className="admin-link">
          <FaUserGraduate className="admin-icon" /> All Students
        </NavLink>
        <NavLink to="/admin/all-teachers" className="admin-link">
          <FaChalkboardTeacher className="admin-icon" /> All Teachers
        </NavLink>
        <NavLink to="/admin/profile" className="admin-link">
          <FaUserCircle className="admin-icon" /> Profile
        </NavLink>
        <NavLink to="/" className="admin-link">
          <FaSignOutAlt className="admin-icon" /> Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
