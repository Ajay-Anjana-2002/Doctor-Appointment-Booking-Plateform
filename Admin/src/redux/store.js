import { configureStore } from "@reduxjs/toolkit";

import adminAuthReducer from "./slices/adminAuthSlice";
import doctorAuthReducer from "./slices/doctorAuthSlice";
import adminDataReducer from "./slices/adminDataSlice";
import doctorDataReducer from "./slices/doctorDataSlice";

const store = configureStore({
    reducer: {
        adminAuth: adminAuthReducer,
        doctorAuth: doctorAuthReducer,
        adminData: adminDataReducer,
        doctorData: doctorDataReducer,
    },
});

export default store;
