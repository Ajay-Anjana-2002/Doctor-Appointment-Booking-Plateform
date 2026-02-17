import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Admin token
        const aToken = localStorage.getItem("aToken");

        // Doctor token
        const dToken = localStorage.getItem("dToken");

        if (aToken) {
            config.headers.atoken = aToken;
        }

        if (dToken) {
            config.headers.dtoken = dToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("aToken");
            localStorage.removeItem("dToken");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
