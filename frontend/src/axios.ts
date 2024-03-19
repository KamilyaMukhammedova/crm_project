import axios from "axios";
// import history from "./utils/history";
import { AUTH_ADMIN_URL, AUTH_REFRESH_URL } from "./constants/api";


export const axiosAPI = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const handleAuthError = () => {
    // localStorage.removeItem('indenim:a:token');
    // localStorage.removeItem('indenim:r:token');
    // window.location.href = '/login';
};

axiosAPI.interceptors.request.use(
    function (config) {
        if(config.url !== AUTH_ADMIN_URL) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('indenim:a:token')}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosAPI.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        const refreshEndpoint = AUTH_REFRESH_URL;

        if (originalRequest.url !== refreshEndpoint && !originalRequest._retry) {
            originalRequest._retry = true;
            const refresh_token = localStorage.getItem('indenim:r:token');

            try {
                const res = await axiosAPI.post(refreshEndpoint, { refresh: refresh_token });
                if (res.status === 200) {
                    localStorage.setItem('indenim:a:token', res.data.access);
                    originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
                    return axiosAPI(originalRequest);
                } else {
                    throw new Error("Token refresh failed");
                }
            } catch (err) {
                handleAuthError();
                return Promise.reject(err);
            }
        }

        if (originalRequest.url === refreshEndpoint) {
            handleAuthError();
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);
