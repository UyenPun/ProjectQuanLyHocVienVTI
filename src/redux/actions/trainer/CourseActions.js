import * as types from "../../constants";
import CourseApi from '../../../api/trainer/CourseApi';

const listCourseAction = (courses, page, totalSize, search) => {
  return {
    type: types.GET_LIST_COURSE,
    payload: {
      courses,
      page,
      totalSize
    }
  };
}

export const getListCourseAction = (
  page,
  size,
  sortField, sortType,
  search
) => {
  return async dispatch => {
    try {
      const coursePage = await CourseApi.getAll(page, size, sortField, sortType, search);
      dispatch(listCourseAction(coursePage.content, page, coursePage.totalElements));
    } catch (error) {
      console.log(error);
    }
  }
}