import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../../assets/assets";
import {
  fetchDoctorDashboard,
  completeAppointmentDoctor,
  cancelAppointmentDoctor,
} from "../../redux/slices/doctorDataSlice";
import { Currency, slotDateFormat } from "../../utils/helpers";

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const dToken = useSelector((s) => s.doctorAuth.dToken);
  const { dashData } = useSelector((s) => s.doctorData);

  useEffect(() => {
    if (dToken) dispatch(fetchDoctorDashboard());
  }, [dToken, dispatch]);

  if (!dashData) return null;

  const onCancel = (id) => {
    dispatch(cancelAppointmentDoctor(id)).then(() =>
      dispatch(fetchDoctorDashboard()),
    );
  };

  const onComplete = (id) => {
    dispatch(completeAppointmentDoctor(id)).then(() =>
      dispatch(fetchDoctorDashboard()),
    );
  };

  return (
    <>
      <div className="m-5 space-y-10">
        {/* ===== STATS CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white border rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition">
            <img src={assets.earning_icon} className="w-12" />
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {Currency} {dashData.earnings}
              </p>
              <p className="text-sm text-gray-400">Total Earnings</p>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition">
            <img src={assets.appointments_icon} className="w-12" />
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {dashData.appointments}
              </p>
              <p className="text-sm text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition">
            <img src={assets.patients_icon} className="w-12" />
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {dashData.patients}
              </p>
              <p className="text-sm text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        {/* ===== LATEST BOOKINGS ===== */}
        <div className="bg-white border rounded-xl">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b">
            <img src={assets.list_icon} className="w-5" />
            <h2 className="font-semibold text-gray-700">Latest Appointments</h2>
          </div>

          {/* List */}
          <div className="divide-y">
            {dashData.latestAppointments.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-4 hover:bg-gray-50 transition"
              >
                {/* USER */}
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={
                      item.userID?.image && item.userID.image.trim() !== ""
                        ? item.userID.image
                        : assets.user_icon
                    }
                    className="w-11 h-11 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {item.userID?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                </div>

                {/* STATUS / ACTIONS */}
                <div className="flex items-center gap-3">
                  {item.cancelled ? (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                      Completed
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => onCancel(item._id)}
                        className="p-2 rounded-full hover:bg-red-50 transition"
                        title="Cancel"
                      >
                        <img src={assets.cancel_icon} className="w-6" />
                      </button>

                      <button
                        onClick={() => onComplete(item._id)}
                        className="p-2 rounded-full hover:bg-green-50 transition"
                        title="Mark Complete"
                      >
                        <img src={assets.tick_icon} className="w-6" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
