import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// 🔐 DOCTOR LOGIN
export const doctorLogin = createAsyncThunk(
    "doctorAuth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post("/api/doctor/login", {
                email,
                password,
            });

            if (!data.success) {
                return rejectWithValue(data.message);
            }

            localStorage.setItem("dToken", data.token);
            return data.token;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const doctorAuthSlice = createSlice({
    name: "doctorAuth",
    initialState: {
        dToken: localStorage.getItem("dToken") || "",
        loading: false,
        error: null,
    },
    reducers: {
        doctorLogout: (state) => {
            state.dToken = "";
            localStorage.removeItem("dToken");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(doctorLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(doctorLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.dToken = action.payload;
            })
            .addCase(doctorLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { doctorLogout } = doctorAuthSlice.actions;
export default doctorAuthSlice.reducer;
