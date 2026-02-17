import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../../assets/assets";
import {
  fetchAdminDashboard,
  cancelAppointmentAdmin,
} from "../../redux/slices/adminDataSlice";
import { slotDateFormat } from "../../utils/helpers";

const Dashboard = () => {
  const dispatch = useDispatch();
  const aToken = useSelector((s) => s.adminAuth.aToken);
  const { dashData } = useSelector((s) => s.adminData);

  useEffect(() => {
    if (aToken) dispatch(fetchAdminDashboard());
  }, [aToken, dispatch]);

  const cancelHandler = (id) => {
    dispatch(cancelAppointmentAdmin(id)).then(() =>
      dispatch(fetchAdminDashboard()),
    );
  };

  if (!dashData) return null;

  return (
    <>
      <section className="px-4 sm:px-6 lg:px-8 py-6">
        {/* ===== Stats Cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Doctors */}
          <div className="bg-white rounded-2xl border shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition">
            <img src={assets.doctor_icon} className="w-12 h-12" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashData.doctors}
              </p>
              <p className="text-sm text-gray-500">Doctors</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="bg-white rounded-2xl border shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition">
            <img src={assets.appointments_icon} className="w-12 h-12" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashData.appointments}
              </p>
              <p className="text-sm text-gray-500">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="bg-white rounded-2xl border shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition">
            <img src={assets.patients_icon} className="w-12 h-12" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashData.patients}
              </p>
              <p className="text-sm text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        {/* ===== Latest Bookings ===== */}
        <div className="bg-white rounded-2xl border shadow-sm mt-8 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b">
            <img src={assets.list_icon} className="w-5" />
            <p className="font-semibold text-gray-800">Latest Bookings</p>
          </div>

          <div className="divide-y">
            {dashData.latestAppointments.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition"
              >
                {/* Doctor Image */}
                <img
                  src={item.docID?.image || assets.profile_pic}
                  className="w-10 h-10 rounded-full object-cover"
                />

                {/* Info */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {item.docID?.name || "Doctor"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {/* Status / Action */}
                {item.cancelled ? (
                  <span className="text-xs font-medium text-red-500">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="text-xs font-medium text-green-600">
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={() => cancelHandler(item._id)}
                    className="p-2 rounded-full hover:bg-red-50 transition"
                  >
                    <img src={assets.cancel_icon} className="w-6 h-6" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
