import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import DashboardHeader from "../components/DashboardHeader";

const DashboardLayout = () => {
  const [nav, setNav] = React.useState(false);
  const handleClick = () => setNav(!nav);
  const user = JSON.parse(localStorage.getItem("auth") as any);

  if (!user?.email) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <Sidebar toggle={handleClick} style="hidden lg:flex" />
      <div className="flex flex-col flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
