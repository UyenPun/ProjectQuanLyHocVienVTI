import * as types from "../../constants";

const initialState = {
  courses: [],

  // paging
  page: 1,
  size: 5,
  totalSize: 0
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_COURSE:
      return {
        ...state,
        courses: actions.payload.courses,
        page: actions.payload.page,
        totalSize: actions.payload.totalSize
      };
    default:
      return state;
  }
}
