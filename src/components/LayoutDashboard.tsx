import React, { ReactNode } from "react";
import HeaderDashboard from "./HeaderDashboard";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

interface LayoutDashboardProps {
  children?: ReactNode;
}

const LayoutDashboard = ({ children }: LayoutDashboardProps) => {
  return (
    <div className="flex min-h-scree">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <HeaderDashboard />
        <main className="p-6 flex-1">
          {/* Either render children or Outlet */}
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default LayoutDashboard;