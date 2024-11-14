import axios from 'axios';
import storage from '../../storage/Storage';
import { showErrorNotification } from "./../../utils/Notification";

const axiosClient = axios.create({
    baseURL: `http://localhost:8080/api/v1`,
});

axiosClient.interceptors.request.use(async (config) => {
    // if token exists then attach token
    const token = storage.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data !== undefined) {
        // only get data
        return response.data;
    }
    return response;

}, async (error) => {
    // Handle errors
    if (error.response) {
        // error server
        if (error.response.status === 500) {
            showErrorNotification("Request Fail!", "Server Error!");
            // redirect page error server
            // setTimeout(function () {
            //     window.location.href = '/auth/500';
            // }, 2500);
        }

        const originalRequest = error.config;
        // expired token & get refreshToken
        if (error.response.status === 401 && !originalRequest._retry
            && storage.getToken() && storage.getRefreshToken()) {

            originalRequest._retry = true;

            // refresh token
            const newToken = await refreshToken(originalRequest);

            // continue original request
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            return axiosClient(originalRequest);
        }

        throw error.response;

    } else if (error.request) {
        throw error.request;
    }

    throw error;
});

const refreshToken = async () => {
    try {
        const result = await axios.post(
            `http://localhost:8080/api/v1/users/token/refresh`,
            storage.getRefreshToken(),
            { headers: { "Content-Type": "text/plain" } }
        );
        const newToken = result.data.token;
        const newRefreshToken = result.data.refreshToken;
        // save to storage
        storage.setToken(newToken, newRefreshToken);

        return newToken;

    } catch (error) {

        // error server
        if (error.response.status === 500) {
            showErrorNotification("Request Fail!", "Server Error!");
            // redirect page error server
            setTimeout(function () {
                window.location.href = '/auth/500';
            }, 2500);
        }

        // expired refresh token
        if (error.response.status === 503) {
            showErrorNotification("Request Fail!", "Expired Session, please Login again!");
            storage.removeAllToken();
            storage.removeUserInfor();
            setTimeout(function () {
                window.location.href = '/auth/sign-in';
            }, 2500);
            throw new Error("refresh token hết hạn");
        }

        throw error;
    }
};

export default axiosClient;

