import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `block p-4 hover:bg-gray-200 rounded ${isActive ? "bg-gray-300 font-bold" : ""}`;

  return (
    <aside className="w-64 min-h-screen bg-white shadow-md">
      <NavLink to="/" className="block p-4 text-xl font-bold border-b">
        Home
      </NavLink>
      <nav className="flex flex-col p-4 space-y-2">
        <NavLink to="/admin" end className={linkClasses}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/user-management" className={linkClasses}>
          Users
        </NavLink>
        <NavLink to="/admin/service-management" className={linkClasses}>
          Services
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;