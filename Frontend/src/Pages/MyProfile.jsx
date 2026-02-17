import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import axiosInstance from "../redux/api/axiosInstance";
import { fetchUserProfile, updateLocal } from "../redux/slices/userDataSlice";
import { assets } from "../assets/assets_frontend/assets";

const MyProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.userData);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!userData) return null;

  /* ================= UPDATE PROFILE ================= */
  const updateUserProfile = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", userData.name || "");
      formData.append("phone", userData.phone || "");
      formData.append("gender", userData.gender || "");
      formData.append("dob", userData.dob || "");
      formData.append(
        "address",
        JSON.stringify(userData.address || { line1: "", line2: "" }),
      );

      if (image) formData.append("image", image);

      const { data } = await axiosInstance.post(
        "/api/user/update-profile",
        formData,
      );

      if (data.success) {
        toast.success("Profile updated successfully");
        await dispatch(fetchUserProfile());
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* ===== CARD ===== */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-10">
          {/* ===== HEADER ===== */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* IMAGE */}
            <div className="relative">
              {isEdit ? (
                <label className="cursor-pointer group">
                  <img
                    src={image ? URL.createObjectURL(image) : userData.image}
                    className="w-36 h-36 rounded-full object-cover border"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <img src={assets.upload_icon} className="w-8" />
                  </div>
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              ) : (
                <img
                  src={userData.image}
                  className="w-36 h-36 rounded-full object-cover border"
                />
              )}
            </div>

            {/* NAME */}
            <div className="flex-1 text-center sm:text-left">
              {isEdit ? (
                <input
                  value={userData.name || ""}
                  onChange={(e) =>
                    dispatch(updateLocal({ name: e.target.value }))
                  }
                  className="text-3xl font-semibold border-b focus:outline-none w-full max-w-xs"
                />
              ) : (
                <h2 className="text-3xl font-semibold text-gray-800">
                  {userData.name}
                </h2>
              )}
              <p className="text-gray-500 mt-1">Patient Profile</p>
            </div>
          </div>

          {/* ===== SECTIONS ===== */}
          <div className="mt-10 grid gap-8">
            {/* CONTACT */}
            <Section title="Contact Information">
              <Row label="Email">
                <span className="text-blue-600">{userData.email}</span>
              </Row>

              <Row label="Phone">
                {isEdit ? (
                  <input
                    value={userData.phone || ""}
                    onChange={(e) =>
                      dispatch(updateLocal({ phone: e.target.value }))
                    }
                    className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  userData.phone
                )}
              </Row>

              <Row label="Address">
                {isEdit ? (
                  <div className="space-y-2">
                    <input
                      value={userData.address?.line1 || ""}
                      onChange={(e) =>
                        dispatch(
                          updateLocal({
                            address: {
                              ...userData.address,
                              line1: e.target.value,
                            },
                          }),
                        )
                      }
                      className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      value={userData.address?.line2 || ""}
                      onChange={(e) =>
                        dispatch(
                          updateLocal({
                            address: {
                              ...userData.address,
                              line2: e.target.value,
                            },
                          }),
                        )
                      }
                      className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                ) : (
                  <span className="text-gray-600">
                    {userData.address?.line1}
                    <br />
                    {userData.address?.line2}
                  </span>
                )}
              </Row>
            </Section>

            {/* BASIC */}
            <Section title="Basic Information">
              <Row label="Gender">
                {isEdit ? (
                  <select
                    value={userData.gender || ""}
                    onChange={(e) =>
                      dispatch(updateLocal({ gender: e.target.value }))
                    }
                    className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-xs"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  userData.gender
                )}
              </Row>

              <Row label="Date of Birth">
                {isEdit ? (
                  <input
                    type="date"
                    value={userData.dob || ""}
                    onChange={(e) =>
                      dispatch(updateLocal({ dob: e.target.value }))
                    }
                    className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-xs"
                  />
                ) : (
                  userData.dob
                )}
              </Row>
            </Section>
          </div>

          {/* ===== ACTION ===== */}
          <div className="mt-12 flex justify-end">
            {isEdit ? (
              <button
                disabled={loading}
                onClick={updateUserProfile}
                className="px-10 py-2.5 rounded-full text-white font-medium bg-linear-to-r from-indigo-600 to-blue-600 shadow-md shadow-indigo-300/40 hover:shadow-lg hover:shadow-indigo-400/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-10 py-2.5 rounded-full font-medium border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

/* ===== SMALL COMPONENTS ===== */
const Section = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
      {title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const Row = ({ label, children }) => (
  <div className="grid sm:grid-cols-[180px_1fr] gap-2 text-sm">
    <p className="font-medium text-gray-600">{label}</p>
    <div className="text-gray-700">{children}</div>
  </div>
);

export default MyProfile;
