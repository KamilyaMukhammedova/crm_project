import axios from "axios";
import { AUTH_ADMIN_URL, AUTH_REFRESH_URL } from "./constants/api";


export const axiosAPI = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const clearTokens = () => {
    localStorage.removeItem('indenim:a:token');
    localStorage.removeItem('indenim:r:token');
};

axiosAPI.interceptors.request.use(
    function (config) {
        if (config.url !== AUTH_ADMIN_URL) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('indenim:a:token')}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosAPI.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (originalRequest.url === AUTH_REFRESH_URL) {
            console.error("Refresh token request failed. Not retrying.");
            localStorage.removeItem('indenim:a:token');
            localStorage.removeItem('indenim:r:token');
            return Promise.reject(error);
        }
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('indenim:r:token');
                if (!refreshToken) {
                    clearTokens();
                    window.location.href = '/login';
                    return Promise.reject("No refresh token available");
                }

                try {
                    const res = await axiosAPI.post(AUTH_REFRESH_URL, {refresh: refreshToken});
                    if (res.status === 200) {
                        localStorage.setItem('indenim:a:token', res.data.access);
                        localStorage.setItem('indenim:r:token', res.data.refresh);
                    }
                } catch (e) {
                    return Promise.reject(e);
                }

                const newToken = localStorage.getItem("indenim:a:token");
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return axiosAPI(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);
                clearTokens();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
