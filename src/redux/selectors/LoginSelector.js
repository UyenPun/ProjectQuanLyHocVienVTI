import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const loginSelector = (state) => state.Login;

const selectUserInfoSelector = createSelector(
    loginSelector,
    state => state.userInfo);

const selectLastNameSelector = createSelector(
    selectUserInfoSelector,
    state => state.lastName);

const selectFullNameSelector = createSelector(
    selectUserInfoSelector,
    state => state.firstName + " " + state.lastName);

/** function */

export const selectUserInfo = (state) => {
    return selectUserInfoSelector(state);
}

export const selectLastName = (state) => {
    return selectLastNameSelector(state);
}

export const selectFullName = (state) => {
    return selectFullNameSelector(state);
}