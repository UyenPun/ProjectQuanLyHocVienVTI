import Api from './../base/Api';

const url = "/mentor/courses";

const getAllActiveClasses = () => {
    return Api.get(`${url}/activeClazzes`);
};

// export
const api = { getAllActiveClasses }
export default api;