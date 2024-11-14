import Api from '../base/Api';

const url = "/mentor/attendances";

const getSubjectAttendancesByClass = (clazzId, subjectId) => {
    return Api.get(`${url}/classes/${clazzId}/subjects/${subjectId}`);
};

const update = (clazzId, subjectId, oldAttendances, newAttendances) => {

    const body = {
        oldAttendances,
        newAttendances
    };

    return Api.post(`${url}/classes/${clazzId}/subjects/${subjectId}`, body);
};

// export
const api = { getSubjectAttendancesByClass, update }
export default api;