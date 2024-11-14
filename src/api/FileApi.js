import Api from './base/Api';
import FormData from 'form-data';

const url = "/files";

const uploadDocuments = (type, files, names) => {

    const body = new FormData();
    // attach list file to form data
    files.forEach(file => {
        body.append('files', file);
    });
    body.append('names', names);

    return Api.post(`${url}/documents/${type}`, body);
};

// export
const api = { uploadDocuments }
export default api;