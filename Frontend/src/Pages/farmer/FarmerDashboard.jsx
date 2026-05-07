import React from "react";

import { Package, ShoppingCart, IndianRupee, TrendingUp } from "lucide-react";

import Sidebar from "../../Componants/Sidebar";
import FarmerNav from "./FarmerNav";
import DashboardHome from "./DashboardHome";
import { Outlet } from "react-router-dom";

const FarmerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      {/* SIDEBAR */}
      <Sidebar type="farmer" />

      {/* NAVBAR */}
      <FarmerNav />

      {/* outlet */}
      <div className="lg:ml-[250px] pt-[80px] p-6">

  <div className="max-w-7xl mx-auto">

    <Outlet />

  </div>

</div>
    </div>
  );
};

export default FarmerDashboard;
