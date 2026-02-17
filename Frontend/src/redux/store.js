import { configureStore } from "@reduxjs/toolkit";

import userAuthReducer from "./slices/userAuthSlice";
import userDataReducer from "./slices/userDataSlice";

const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
        userData: userDataReducer,
    },
});

export default store;
