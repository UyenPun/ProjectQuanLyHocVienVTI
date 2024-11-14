import axios from 'axios';
import { showErrorNotification } from "../../utils/Notification";

// config Axios
const axiosClient = axios.create({
    baseURL: `http://localhost:8080/api/v1`,
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
            setTimeout(function () {
                window.location.href = '/auth/500';
            }, 2500);
        }

        throw error.response;

    } else if (error.request) {
        throw error.request;
    }

    throw error;
});

export default axiosClient;