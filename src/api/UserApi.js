import Api from './base/NoAuthApi';
import FormData from 'form-data';

const url = "/users";

const login = (username, password) => {

    var body = new FormData();
    body.append('username', username);
    body.append('password', password);

    return Api.post("/login", body);
};

const existsByUsername = (username) => {
    return Api.get(`${url}/exists/username/${username}`);
};

const existsByEmail = (email) => {
    return Api.get(`${url}/exists/email/${email}`);
};

const existsByPhoneNumber = (phoneNumber) => {
    return Api.get(`${url}/exists/phoneNumber/${phoneNumber}`);
};

const existsByIdentifyNumber = (identifyNumber) => {
    return Api.get(`${url}/exists/identifyNumber/${identifyNumber}`);
};

const requestResetPassword = (email) => {
    const requestParams = {
        email: email
    }

    return Api.get(`${url}/resetPasswordRequest`, { params: requestParams });
};

const isValidResetPasswordToken = (token) => {
    return Api.get(`${url}/exists/resetPasswordToken/${token}`);
};

const resetPassword = (token, newPassword) => {
    const requestParams = {
        token: token,
        newPassword: newPassword
    }

    return Api.get(`${url}/resetPassword`, { params: requestParams });
};

// export
const api = {
    login,
    existsByUsername, existsByEmail, existsByPhoneNumber, existsByIdentifyNumber,
    requestResetPassword, isValidResetPasswordToken, resetPassword
}
export default api;