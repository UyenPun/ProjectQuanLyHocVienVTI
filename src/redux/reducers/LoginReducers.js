import storage from "../../storage/Storage";
import * as types from "../constants";

const initialState = {
  userInfo: storage.getUserInfo()
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.USER_LOGIN_INFO:
      return {
        ...state,
        userInfo: actions.payload
      };
    default:
      return state;
  }
}
