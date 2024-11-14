import Api from './../base/Api';

const url = "/trainer/mentees";

const getAll = (
    page, size,
    sortField, sortType,
    search) => {

    // set default
    if (!page) page = 1;
    if (!size) size = 5;
    if (!sortField) {
        sortField = 'modifiedDate';
        sortType = 'desc';
    }

    const parameters = {
        page,
        size,
        sort: `${sortField},${sortType}`
    }

    // search
    if (search) {
        parameters.search = search;
    }

    return Api.get(`${url}`, { params: parameters });
};

const existsByCode = (code) => {
    return Api.get(`${url}/exists/code/${code}`);
};

const create = (
    firstName, lastName, dateOfBirth, gender, username,
    school, currentAddress, homeTown, currentWorkingLocation,
    phoneNumber, email, facebookLink,
    clazzId, code, paymentTypeId, payableTuition, paiedTuition,
    note
) => {

    const body = {
        firstName, lastName, dateOfBirth, gender, username,
        school, currentAddress, homeTown, currentWorkingLocation,
        phoneNumber, email, facebookLink,
        clazzId, code, paymentTypeId, payableTuition, paiedTuition,
        note
    }

    return Api.post(url, body);
};

// export
const api = { getAll, existsByCode, create }
export default api;