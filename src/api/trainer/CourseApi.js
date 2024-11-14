import Api from './../base/Api';

const url = "/trainer/courses";

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
    } else if (sortField === 'totalSubject') {
        sortField = 'totalSubjectAndLesson.totalSubject'
    } else if (sortField === 'totalLesson') {
        sortField = 'totalSubjectAndLesson.totalLesson'
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

const existsByName = (name) => {
    return Api.get(`${url}/exists/name/${name}`);
};

const create = (name, classCode, menteeCode, note, standardTuition, payments, subjectIds) => {
    const body = {
        name,
        classCode,
        menteeCode,
        note,
        standardTuition,
        payments,
        subjectIds
    }
    return Api.post(url, body);
};

// export
const api = { getAll, existsByName, create }
export default api;