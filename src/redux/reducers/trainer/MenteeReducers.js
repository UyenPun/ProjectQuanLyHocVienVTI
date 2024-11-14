import * as types from "../../constants";

const initialState = {
  mentees: [],

  // paging
  page: 1,
  size: 5,
  totalSize: 0
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_MENTEE:
      return {
        ...state,
        mentees: actions.payload.mentees,
        page: actions.payload.page,
        totalSize: actions.payload.totalSize
      };
    default:
      return state;
  }
}
