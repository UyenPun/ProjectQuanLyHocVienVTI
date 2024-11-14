import * as types from "../../constants";
import ClassApi from '../../../api/trainer/ClassApi';

const listClassAction = (classes, page, totalSize) => {
  return {
    type: types.GET_LIST_CLASS,
    payload: {
      classes,
      page,
      totalSize
    }
  };
}

export const getListClassAction = (
  page,
  size,
  sortField, sortType,
  search) => {
  return async dispatch => {
    try {
      const classPage = await ClassApi.getAll(page, size, sortField, sortType, search);
      dispatch(listClassAction(classPage.content, page, classPage.totalElements));
    } catch (error) {
      console.log(error);
    }
  }
}