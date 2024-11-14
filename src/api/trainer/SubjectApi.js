import Api from './../base/Api';

const url = "/trainer/subjects";

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
    } else if (sortField === 'totalLesson') {
        sortField = 'totalLesson.totalLesson'
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

const getAllTeachableSubjects = () => {
    return Api.get(`${url}/teachable`);
};

const existsByCode = (code) => {
    return Api.get(`${url}/exists/code/${code}`);
};

const create = (name, code, version, note, lessons) => {

    const body = {
        name, code, version, note, lessons
    }

    return Api.post(url, body);
};

// export
const api = {
    getAll, getAllTeachableSubjects,
    existsByCode,
    create
}
export default api;