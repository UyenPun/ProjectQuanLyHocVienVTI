import Api from './../base/Api';

const url = "/trainer/classes";

const getAllActiveOrNotStartedClasses = () => {
    return Api.get(`${url}/active-or-notstarted`);
};

const getAllactiveClassesAndActiveSubjects = () => {
    return Api.get(`${url}/active-or-notstarted/subjects/active`);
};

const getAllSchedules = () => {
    return Api.get(`${url}/schedules`);
};

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
    } else if (sortField === 'lesson') {
        sortField = 'currentLessonSubjectMentorByClass.subject.name';
    } else if (sortField === 'mentor') {
        sortField = 'currentLessonSubjectMentorByClass.mentor.fullName';
    } else if (sortField === 'dropoutRate') {
        sortField = 'menteeRate.dropoutRate';
    } else if (sortField === 'deferredRate') {
        sortField = 'menteeRate.deferredRate';
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

const existsByCode = (code) => {
    return Api.get(`${url}/exists/code/${code}`);
};

const create = (
    name, courseId, code, address, facebookLink, groupChat,
    scheduleIds, startDate, expectedEndDate,
    mentorAndSubjects,
    menteeIds,
    note
) => {

    const body = {
        name, courseId, code, address, facebookLink, groupChat,
        scheduleIds, startDate, expectedEndDate,
        mentorAndSubjects,
        menteeIds,
        note
    }

    return Api.post(url, body);
};

// export
const api = {
    getAll, getAllActiveOrNotStartedClasses, getAllactiveClassesAndActiveSubjects, getAllSchedules,
    existsByName, existsByCode,
    create
}
export default api;