import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./Config/MongoDB.js";
import connectCloudinary from "./Config/Cloudinary.js";

import adminRouter from "./Routes/AdminRoutes.js";
import doctorRouter from "./Routes/DoctorRoutes.js";
import userRouter from "./Routes/UserRoutes.js";

const app = express();

const port = process.env.PORT || 8000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("API WORKING GREAT");
});

app.listen(port, () => {
    console.log(`server is started on ${port}`);
});