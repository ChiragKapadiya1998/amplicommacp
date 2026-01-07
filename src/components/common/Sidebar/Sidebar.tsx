import { NavLink } from "react-router-dom";
import { RiHome4Line } from "react-icons/ri";
import { FiBarChart2 } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";

import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" end className="nav-btn">
        <RiHome4Line />
      </NavLink>

      <NavLink to="/reports" className="nav-btn">
        <FiBarChart2 />
      </NavLink>

      <NavLink to="/faq" className="nav-btn">
        <GoSearch />
      </NavLink>

      <NavLink to="/info" className="nav-btn">
        <IoSettingsOutline />
      </NavLink>
    </aside>
  );
}
