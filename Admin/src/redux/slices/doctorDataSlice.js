import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

/* ================= APPOINTMENTS ================= */

export const fetchDoctorAppointments = createAsyncThunk(
    "doctorData/fetchAppointments",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.get("/api/doctor/appointments");
            if (!data.success) return rejectWithValue(data.message);
            return data.appointments;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const completeAppointmentDoctor = createAsyncThunk(
    "doctorData/completeAppointment",
    async (appointmentID, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post(
                "/api/doctor/complete-appointment",
                { appointmentID }
            );
            if (!data.success) return rejectWithValue(data.message);
            return appointmentID;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const cancelAppointmentDoctor = createAsyncThunk(
    "doctorData/cancelAppointment",
    async (appointmentID, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post(
                "/api/doctor/cancel-appointment",
                { appointmentID }
            );
            if (!data.success) return rejectWithValue(data.message);
            return appointmentID;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

/* ================= DASHBOARD ================= */

export const fetchDoctorDashboard = createAsyncThunk(
    "doctorData/dashboard",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.get("/api/doctor/dashboard");
            if (!data.success) return rejectWithValue(data.message);
            return data.dashData;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

/* ================= PROFILE ================= */

export const fetchDoctorProfile = createAsyncThunk(
    "doctorData/profile",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.get("/api/doctor/profile");
            if (!data.success) return rejectWithValue(data.message);
            return data.profileData;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const updateDoctorProfile = createAsyncThunk(
    "doctorData/updateProfile",
    async (profileData, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post(
                "/api/doctor/update-profile",
                profileData
            );
            if (!data.success) return rejectWithValue(data.message);
            return true;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const doctorDataSlice = createSlice({
    name: "doctorData",
    initialState: {
        appointments: [],
        dashData: null,
        profileData: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
                state.loading = false;
                state.appointments = action.payload;
            })
            .addCase(fetchDoctorDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.dashData = action.payload;
            })
            .addCase(fetchDoctorProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profileData = action.payload;
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )
    },
});

export default doctorDataSlice.reducer;
