import Api from '../base/Api';

const url = "/mentor/classes";

const getAllActiveClasses = () => {
    return Api.get(`${url}/activeClazzes`);
};

const getDetailClassForAttendance = (id) => {
    return Api.get(`${url}/${id}`);
};

// export
const api = { getAllActiveClasses, getDetailClassForAttendance }
export default api;