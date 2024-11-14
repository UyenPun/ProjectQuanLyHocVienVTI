import * as types from "../../constants";

const initialState = {
  classes: [],

  // paging
  page: 1,
  size: 5,
  totalSize: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_CLASS:
      return {
        ...state,
        classes: actions.payload.classes,
        page: actions.payload.page,
        totalSize: actions.payload.totalSize,
      };
    default:
      return state;
  }
}
