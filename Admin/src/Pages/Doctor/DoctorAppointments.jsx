import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctorAppointments,
  completeAppointmentDoctor,
  cancelAppointmentDoctor,
} from "../../redux/slices/doctorDataSlice";
import { assets } from "../../assets/assets";
import { calculateAge, slotDateFormat, Currency } from "../../utils/helpers";

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const dToken = useSelector((s) => s.doctorAuth.dToken);
  const { appointments } = useSelector((s) => s.doctorData);

  useEffect(() => {
    if (dToken) dispatch(fetchDoctorAppointments());
  }, [dToken, dispatch]);

  const onCancel = (id) => {
    dispatch(cancelAppointmentDoctor(id)).then(() =>
      dispatch(fetchDoctorAppointments()),
    );
  };

  const onComplete = (id) => {
    dispatch(completeAppointmentDoctor(id)).then(() =>
      dispatch(fetchDoctorAppointments()),
    );
  };

  return (
    <>
      <div className="m-5 space-y-6">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-700">
            All Appointments
          </h1>
        </div>

        {/* ===== TABLE HEADER (DESKTOP) ===== */}
        <div className="hidden md:grid grid-cols-[0.4fr_2fr_1fr_0.8fr_2.5fr_1fr_1.5fr] bg-gray-50 border rounded-xl px-6 py-3 text-sm text-gray-600 font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* ===== APPOINTMENTS LIST ===== */}
        <div className="bg-white border rounded-xl divide-y max-h-[75vh] overflow-y-auto">
          {[...appointments].reverse().map((item, index) => (
            <div
              key={item._id}
              className="grid grid-cols-1 md:grid-cols-[0.4fr_2fr_1fr_0.8fr_2.5fr_1fr_1.5fr] gap-4 items-center px-6 py-4 hover:bg-gray-50 transition"
            >
              {/* INDEX */}
              <p className="hidden md:block text-sm text-gray-500">
                {index + 1}
              </p>

              {/* PATIENT */}
              <div className="flex items-center gap-3">
                <img
                  src={item.userID?.image || assets.user_icon}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {item.userID?.name}
                  </p>
                  <p className="text-xs text-gray-400 md:hidden">
                    Age: {calculateAge(item.userID?.dob)}
                  </p>
                </div>
              </div>

              {/* PAYMENT */}
              <span
                className={`w-fit px-3 py-1 rounded-full text-xs font-medium ${
                  item.payment
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.payment ? "Online" : "Cash"}
              </span>

              {/* AGE */}
              <p className="hidden md:block text-sm text-gray-600">
                {calculateAge(item.userID?.dob)}
              </p>

              {/* DATE & TIME */}
              <p className="text-sm text-gray-600">
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>

              {/* FEES */}
              <p className="text-sm font-semibold text-gray-700">
                {Currency} {item.amount}
              </p>

              {/* ACTIONS / STATUS */}
              <div className="flex items-center gap-2">
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
                      title="Cancel Appointment"
                    >
                      <img src={assets.cancel_icon} className="w-6" />
                    </button>

                    <button
                      onClick={() => onComplete(item._id)}
                      className="p-2 rounded-full hover:bg-green-50 transition"
                      title="Mark Completed"
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
    </>
  );
};

export default DoctorAppointments;
