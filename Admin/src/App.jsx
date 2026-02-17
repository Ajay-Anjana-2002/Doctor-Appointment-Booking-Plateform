import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./Pages/Login";

import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

// Admin Pages
import Dashboard from "./Pages/Admin/Dashboard";
import AllAppointments from "./Pages/Admin/AllAppointments";
import AddDoctor from "./Pages/Admin/AddDoctor";
import DoctorsList from "./Pages/Admin/DoctorsList";

// Doctor Pages
import DoctorDashboard from "./Pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./Pages/Doctor/DoctorAppointments";
import DoctorProfile from "./Pages/Doctor/DoctorProfile";

const App = () => {
  const aToken = useSelector((state) => state.adminAuth.aToken);
  const dToken = useSelector((state) => state.doctorAuth.dToken);

  return aToken || dToken ? (
    <div className="bg-[#f8f9fd] min-h-screen">
      <ToastContainer />
      <Navbar />

      <div className="flex items-start">
        <Sidebar />

        <Routes>
          {/* Admin */}
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />

          {/* Doctor */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
