import * as types from "../../constants";

const initialState = {
  documents: [],

  // paging
  page: 1,
  size: 5,
  totalSize: 0
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_LIST_DOCUMENT:
      return {
        ...state,
        documents: actions.payload.documents,
        page: actions.payload.page,
        totalSize: actions.payload.totalSize
      };
    default:
      return state;
  }
}
