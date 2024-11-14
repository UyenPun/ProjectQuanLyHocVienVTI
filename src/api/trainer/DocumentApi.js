import Api from './../base/Api';

const url = "/trainer/documents";

const getAll = (
    page, size,
    sortField, sortType,
    search, documentType) => {

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

    // filter
    if (documentType) {
        parameters.documentType = documentType;
    }

    return Api.get(`${url}`, { params: parameters });
};

const create = (type, uploadFiles, remoteFiles) => {
    const body = {
        type,
        uploadFiles,
        remoteFiles
    }
    return Api.post(url, body);
};

// export
const api = { getAll, create }
export default api;