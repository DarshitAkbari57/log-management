import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const SidebarLink = ({ name, to }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `p-4 rounded-lg flex items-center ${
          isActive ? "bg-gray-700" : "hover:bg-gray-700"
        }`
      }
    >
      <span className="ml-2">{name}</span>
    </NavLink>
  );

  return (
    <div className="bg-gray-800 text-white flex flex-col w-64">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">My App</h1>
      </div>
      <nav className="flex flex-col gap-4 mt-4">
        <SidebarLink name="Dashboard" to="/" />
        <SidebarLink name="Project" to="/project" />
        <SidebarLink name="Task" to="/task" />
        <SidebarLink name="User" to="/user" />
        <SidebarLink name="Time Log" to="/timeLog" />
      </nav>
    </div>
  );
};

export default Sidebar;
