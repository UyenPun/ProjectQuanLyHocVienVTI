import Api from './../base/Api';

const url = "/trainer/mentors";

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
    } else if (sortField === 'totalHourInThisMonth') {
        sortField = 'totalHourInThisMonth.totalHour'
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

const create = (
    firstName, lastName, dateOfBirth, gender, username,
    school, currentAddress, homeTown, currentWorkingLocation,
    phoneNumber, email, facebookLink,
    type, teachableSubjectIds, hourlySalary, clazzId, subjectIds,
    bankName, accountNumber, bankAccountName, taxNumber, taxAddress, identifyNumber, identifyDate, identifyPlace, permanentAddress,
    note
) => {

    const body = {
        firstName, lastName, dateOfBirth, gender, username,
        school, currentAddress, homeTown, currentWorkingLocation,
        phoneNumber, email, facebookLink,
        type, teachableSubjectIds, hourlySalary, clazzId, subjectIds,
        bankName, accountNumber, bankAccountName, taxNumber, taxAddress, identifyNumber, identifyDate, identifyPlace, permanentAddress,
        note
    }

    return Api.post(url, body);
};

// export
const api = {
    getAll, create
}
export default api;