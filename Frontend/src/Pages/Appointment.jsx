import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import axiosInstance from "../redux/api/axiosInstance";
import RelatedDoctors from "../Components/RelatedDoctors";
import { fetchDoctors } from "../redux/slices/userDataSlice";
import { Currency } from "../utils/helpers";

const Appointment = () => {
  const { docID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const doctors = useSelector((state) => state.userData.doctors);
  const token = useSelector((state) => state.userAuth.token);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  useEffect(() => {
    if (!doctors.length) dispatch(fetchDoctors());
  }, [dispatch, doctors.length]);

  useEffect(() => {
    const doc = doctors.find((d) => d._id === docID);
    setDocInfo(doc);
  }, [doctors, docID]);

  useEffect(() => {
    if (!docInfo) return;

    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.toDateString() === currentDate.toDateString()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const slotDate =
          currentDate.getDate() +
          "_" +
          (currentDate.getMonth() + 1) +
          "_" +
          currentDate.getFullYear();

        const isBooked =
          docInfo.slots_booked?.[slotDate]?.includes(formattedTime);

        if (!isBooked) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);
  }, [docInfo]);

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    if (!slotTime) return toast.error("Please select a time slot");

    try {
      const date = docSlots[slotIndex][0].dateTime;
      const slotDate = date.toISOString().split("T")[0];

      const { data } = await axiosInstance.post("/api/user/book-appointment", {
        docID,
        slotDate,
        slotTime,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/my-appointments");
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!docInfo) return null;

  return (
    <>
      <div className="space-y-10">
        {/* Doctor Card */}
        <div className="flex flex-col md:flex-row gap-6 bg-white border rounded-2xl p-6 shadow-sm">
          <img
            src={docInfo.image}
            className="w-full md:w-72 rounded-xl bg-indigo-50 object-cover hover:bg-(--primary) transition-all duration-300"
          />

          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">
              {docInfo.name}
            </h2>

            <p className="text-gray-600">
              {docInfo.degree} • {docInfo.speciality}
            </p>

            <p className="text-gray-700 leading-relaxed">{docInfo.about}</p>

            <p className="text-lg font-medium text-gray-900">
              Consultation Fee :
              <span className="ml-2 text-indigo-600">
                {Currency}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Slots */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-5">
          <h3 className="text-lg font-semibold text-gray-800">
            Select Appointment Slot
          </h3>

          {/* Days */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {docSlots.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime("");
                }}
                className={`min-w-18 py-3 rounded-xl text-sm font-medium transition-all ${
                  slotIndex === index
                    ? "bg-linear-to-r from-indigo-600 to-blue-600 text-white shadow"
                    : "border text-gray-600 hover:border-indigo-400"
                }`}
              >
                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p className="text-base font-semibold">
                  {item[0] && item[0].dateTime.getDate()}
                </p>
              </button>
            ))}
          </div>

          {/* Times */}
          <div className="flex gap-3 flex-wrap">
            {docSlots[slotIndex]?.map((item, index) => (
              <button
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`px-5 py-2 rounded-full text-sm transition-all ${
                  slotTime === item.time
                    ? "bg-indigo-600 text-white shadow"
                    : "border text-gray-600 hover:border-indigo-400"
                }`}
              >
                {item.time.toLowerCase()}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={bookAppointment}
            className="w-full sm:w-fit px-14 py-3 rounded-full
          bg-linear-to-r from-indigo-600 to-blue-600
          text-white font-medium shadow-lg
          hover:shadow-xl hover:-translate-y-0.5
          transition-all cursor-pointer"
          >
            Book Appointment
          </button>
        </div>

        <RelatedDoctors docID={docID} speciality={docInfo.speciality} />
      </div>
    </>
  );
};

export default Appointment;
