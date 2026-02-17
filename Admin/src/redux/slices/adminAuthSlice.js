import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// 🔐 ADMIN LOGIN
export const adminLogin = createAsyncThunk(
    "adminAuth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post("/api/admin/login", {
                email,
                password,
            });

            if (!data.success) {
                return rejectWithValue(data.message);
            }

            localStorage.setItem("aToken", data.token);
            return data.token;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState: {
        aToken: localStorage.getItem("aToken") || "",
        loading: false,
        error: null,
    },
    reducers: {
        adminLogout: (state) => {
            state.aToken = "";
            localStorage.removeItem("aToken");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.aToken = action.payload;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
