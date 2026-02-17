import express from "express";
import { appointmentCancel, appointmentComplete, doctorAppointments, doctorDashboard, doctorList, doctorLogin, doctorProfile, updateDoctorProfile } from "../Controllers/DoctorController.js";
import authDoctor from "../Middlewares/AuthDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", doctorLogin);

doctorRouter.get("/appointments", authDoctor, doctorAppointments);

doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);

doctorRouter.get("/dashboard", authDoctor, doctorDashboard);

doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;