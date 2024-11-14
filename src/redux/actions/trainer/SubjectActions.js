import * as types from "../../constants";
import SubjectApi from '../../../api/trainer/SubjectApi';

const listSubjectAction = (subjects, page, totalSize, search) => {
  return {
    type: types.GET_LIST_SUBJECT,
    payload: {
      subjects,
      page,
      totalSize
    }
  };
}

export const getListSubjectAction = (
  page,
  size,
  sortField, sortType,
  search) => {
  return async dispatch => {
    try {
      const subjectPage = await SubjectApi.getAll(page, size, sortField, sortType, search);
      dispatch(listSubjectAction(subjectPage.content, page, subjectPage.totalElements));
    } catch (error) {
      console.log(error);
    }
  }
}