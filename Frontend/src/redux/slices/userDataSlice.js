import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// 🔹 Get all doctors
export const fetchDoctors = createAsyncThunk(
    "userData/fetchDoctors",
    async () => {
        const { data } = await axiosInstance.get("/api/doctor/list");
        return data.doctors;
    }
);

// 🔹 Load user profile
export const fetchUserProfile = createAsyncThunk(
    "userData/fetchUserProfile",
    async () => {
        const { data } = await axiosInstance.get("/api/user/get-profile");
        return data.userData;
    }
);

const userDataSlice = createSlice({
    name: "userData",
    initialState: {
        doctors: [],
        userData: null,
    },
    reducers: {
        updateLocal: (state, action) => {
            state.userData = {
                ...state.userData,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctors.fulfilled, (state, action) => {
                state.doctors = action.payload;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.userData = action.payload;
            });
    },
});

export const { updateLocal } = userDataSlice.actions;
export default userDataSlice.reducer;
