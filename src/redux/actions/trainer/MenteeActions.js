import * as types from "../../constants";
import MenteeApi from '../../../api/trainer/MenteeApi';

const listMenteeAction = (mentees, page, totalSize, search) => {
  return {
    type: types.GET_LIST_MENTEE,
    payload: {
      mentees,
      page,
      totalSize
    }
  };
}

export const getListMenteeAction = (
  page,
  size,
  sortField, sortType,
  search) => {
  return async dispatch => {
    try {
      const menteePage = await MenteeApi.getAll(page, size, sortField, sortType, search);
      dispatch(listMenteeAction(menteePage.content, page, menteePage.totalElements));
    } catch (error) {
      console.log(error);
    }
  }
}