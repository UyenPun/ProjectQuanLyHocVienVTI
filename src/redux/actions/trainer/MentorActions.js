import * as types from "../../constants";
import MentorApi from '../../../api/trainer/MentorApi';

const listMentorAction = (mentors, page, totalSize, search) => {
  return {
    type: types.GET_LIST_MENTOR,
    payload: {
      mentors,
      page,
      totalSize
    }
  };
}

export const getListMentorAction = (
  page,
  size,
  sortField, sortType,
  search) => {
  return async dispatch => {
    try {
      const mentorPage = await MentorApi.getAll(page, size, sortField, sortType, search);
      dispatch(listMentorAction(mentorPage.content, page, mentorPage.totalElements));
    } catch (error) {
      console.log(error);
    }
  }
}