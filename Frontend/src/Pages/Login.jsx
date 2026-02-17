import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axiosInstance from "../redux/api/axiosInstance";
import { setToken } from "../redux/slices/userAuthSlice";
import { fetchUserProfile } from "../redux/slices/userDataSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.userAuth.token);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axiosInstance.post("/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          dispatch(setToken(data.token));
          dispatch(fetchUserProfile());
          toast.success("Account created successfully");
        } else toast.error(data.message);
      } else {
        const { data } = await axiosInstance.post("/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          dispatch(setToken(data.token));
          dispatch(fetchUserProfile());
          toast.success("Login successful");
        } else toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <>
      <div className="min-h-[90vh] flex items-center justify-center px-4">
        <form
          onSubmit={onSubmit}
          className="
          w-full max-w-md
          bg-white
          rounded-2xl
          shadow-xl
          border
          p-8 sm:p-10
        "
        >
          {/* ================= HEADER ================= */}
          <div className="text-center mb-8">
            <p className="text-sm uppercase tracking-widest text-gray-400">
              Welcome to Prescripto
            </p>

            <h2 className="text-3xl font-semibold text-gray-800 mt-2">
              {state === "Sign Up" ? "Create Account" : "Login"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {state === "Sign Up"
                ? "Book appointments with trusted doctors"
                : "Access your appointments & profile"}
            </p>
          </div>

          {/* ================= FORM ================= */}
          <div className="flex flex-col gap-4">
            {state === "Sign Up" && (
              <div>
                <label className="text-xs font-medium text-gray-500">
                  Full Name
                </label>
                <input
                  className="
                  mt-1 w-full px-4 py-2.5
                  border rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-(--primary)
                  outline-none
                "
                  placeholder="Enter Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <label className="text-xs font-medium text-gray-500">
                Email Address
              </label>
              <input
                type="email"
                className="
                mt-1 w-full px-4 py-2.5
                border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-(--primary)
                outline-none
              "
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500">
                Password
              </label>
              <input
                type="password"
                className="
                mt-1 w-full px-4 py-2.5
                border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-(--primary)
                outline-none
              "
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* ================= BUTTON ================= */}
            <button
              type="submit"
              className="
              mt-4 w-full
              bg-(--primary)
              text-white
              py-3 rounded-full
              font-medium
              hover:opacity-90
              transition-all
              shadow-md
            "
            >
              {state === "Sign Up" ? "Create Account" : "Login"}
            </button>
          </div>

          {/* ================= SWITCH ================= */}
          <div className="text-center mt-6 text-sm text-gray-600">
            {state === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-(--primary) font-medium cursor-pointer hover:underline"
                >
                  Login
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-(--primary) font-medium cursor-pointer hover:underline"
                >
                  Sign Up
                </span>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
