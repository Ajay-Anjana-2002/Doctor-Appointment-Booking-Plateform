import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userAuthSlice";

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userAuth.token);
  const userData = useSelector((state) => state.userData.userData);

  const [showMenu, setShowMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setOpenDropdown(false);
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="Logo"
            className="w-36 md:w-44 cursor-pointer"
          />

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
            {["/", "/doctors", "/about", "/contact"].map((path, i) => (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  `relative py-1 transition ${
                    isActive
                      ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-blue-600"
                      : "hover:text-blue-600"
                  }`
                }
              >
                {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
              </NavLink>
            ))}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Admin Panel - Desktop */}
            <button
              onClick={() => window.open(ADMIN_URL, "_blank")}
              className="hidden md:flex px-5 py-2 rounded-full border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-600 hover:text-white transition"
            >
              Admin Panel
            </button>

            {/* Desktop Auth */}
            {token ? (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <div
                  onClick={() => setOpenDropdown((p) => !p)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={userData?.image || assets.profile_pic}
                    className="w-9 h-9 rounded-full object-cover border"
                  />
                  <img
                    src={assets.dropdown_icon}
                    className={`w-3 transition-transform ${
                      openDropdown ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {openDropdown && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border p-2">
                    <p
                      onClick={() => navigate("/my-profile")}
                      className="px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => navigate("/my-appointments")}
                      className="px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      My Appointments
                    </p>
                    <p
                      onClick={handleLogout}
                      className="px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer text-sm"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition"
              >
                Create Account
              </button>
            )}

            {/* Mobile Menu Icon */}
            <img
              src={assets.menu_icon}
              className="w-6 md:hidden cursor-pointer"
              onClick={() => setShowMenu(true)}
            />
          </div>
        </div>
      </div>

      {/* ================= Mobile Menu ================= */}
      <div
        className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <img src={assets.logo} className="w-32" />
          <img
            src={assets.cross_icon}
            className="w-7 cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>

        <ul className="flex flex-col gap-5 px-6 py-8 text-lg font-medium text-gray-700">
          {["/", "/doctors", "/about", "/contact"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              onClick={() => setShowMenu(false)}
              className="py-2 border-b border-gray-100"
            >
              {path === "/" ? "Home" : path.replace("/", "")}
            </NavLink>
          ))}

          {/* Create Account - Mobile */}
          {!token && (
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="inline-flex mx-auto px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          )}

          {/* Admin Panel - Mobile */}
          <button
            onClick={() => window.open(ADMIN_URL, "_blank")}
            className="inline-flex mx-auto px-8 py-3 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition"
          >
            Admin Panel
          </button>

          {/* Logout - Mobile */}
          {token && (
            <button
              onClick={handleLogout}
              className="inline-flex mx-auto px-8 py-3 rounded-full bg-red-50 text-red-600 font-medium"
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
