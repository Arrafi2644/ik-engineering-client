import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const HeaderDashboard = () => {
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate(); 

 const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ikengineering.co.nz/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Logout failed");

      toast.success("Logout successful!");
      navigate("/login"); // Redirect to login page
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <Button className="bg-violet-600" onClick={handleLogout}>Logout</Button>
    </header>
  );
};

export default HeaderDashboard;