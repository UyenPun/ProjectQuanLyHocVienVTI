import * as types from "../../constants";
import DocumentApi from '../../../api/trainer/DocumentApi';

const listDocumentAction = (documents, page, totalSize, search) => {
  return {
    type: types.GET_LIST_DOCUMENT,
    payload: {
      documents,
      page,
      totalSize
    }
  };
}

export const getListDocumentAction = (
  page,
  size,
  sortField, sortType,
  search) => {
  return async dispatch => {
    try {
      const documentPage = await DocumentApi.getAll(page, size, sortField, sortType, search);
      dispatch(listDocumentAction(documentPage.content, page, documentPage.totalElements));
    } catch (error) {
      console.log(error);
    }
  }
}