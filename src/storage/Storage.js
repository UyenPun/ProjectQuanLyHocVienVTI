const setRememberMe = (isRememberMe) => {
    localStorage.setItem('isRememberMe', isRememberMe);
};

const isRememberMe = () => {

    if (localStorage.getItem('isRememberMe') === null || localStorage.getItem('isRememberMe') === undefined) {
        return true;
    }

    // convert string to boolean
    return JSON.parse(localStorage.getItem('isRememberMe'));
};

const setItem = (key, value) => {
    if (isRememberMe()) {
        localStorage.setItem(key, value);
    } else {
        sessionStorage.setItem(key, value);
    }
}

const getItem = (key) => {
    if (isRememberMe()) {
        return localStorage.getItem(key);
    } else {
        return sessionStorage.getItem(key);
    }
}

const removeItem = (key) => {
    if (isRememberMe()) {
        localStorage.removeItem(key);
    } else {
        sessionStorage.removeItem(key);
    }
}

const setToken = (token, refreshToken) => {
    setItem('token', token);
    setItem('refreshToken', refreshToken);
};

const getToken = () => {
    return getItem('token');
};

const removeToken = () => {
    removeItem('token');
}

const getRefreshToken = () => {
    return getItem('refreshToken');
};

const removeRefreshToken = () => {
    removeItem('refreshToken');
}

const removeAllToken = () => {
    removeItem('token');
    removeItem('refreshToken');
}

const setUserInfo = (firstName, lastName, fullName, gender, username, email, role) => {
    setItem('firstName', firstName);
    setItem('lastName', lastName);
    setItem('fullName', fullName);
    setItem('gender', gender);
    setItem('username', username);
    setItem('email', email);
    setItem('role', role);
}

const getUserInfo = () => {
    return {
        'firstName': getItem('firstName'),
        'lastName': getItem('lastName'),
        'fullName': getItem('fullName'),
        'gender': getItem('gender'),
        'username': getItem('username'),
        'email': getItem('email'),
        'role': getItem('role')
    };
}

const removeUserInfor = () => {
    removeItem('firstName');
    removeItem('lastName');
    removeItem('fullName');
    removeItem('gender');
    removeItem('username');
    removeItem('email');
    removeItem('role');
}

// export
const storage = {
    isRememberMe, setRememberMe,
    setToken, getToken, removeToken, getRefreshToken, removeRefreshToken, removeAllToken,
    setUserInfo, getUserInfo, removeUserInfor
}
export default storage;