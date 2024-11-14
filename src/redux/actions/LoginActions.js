import * as types from "../constants";

export function setUserLoginInfo(firstName, lastName, fullName, gender, username, email, role) {
  return {
    type: types.USER_LOGIN_INFO,
    payload: {
      "firstName": firstName,
      "lastName": lastName,
      "fullName": fullName,
      "gender": gender,
      "username": username,
      "email": email,
      "role": role
    }
  };
}