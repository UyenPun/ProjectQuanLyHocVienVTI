import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const menteeSelector = (state) => state.Mentee;

const selectMenteeSelector = createSelector(
    menteeSelector,
    state => state.mentees);

const selectPageSelector = createSelector(
    menteeSelector,
    state => state.page);

const selectSizeSelector = createSelector(
    menteeSelector,
    state => state.size);

const selectTotalSizeSelector = createSelector(
    menteeSelector,
    state => state.totalSize);

/** function */
export const selectMentees = (state) => {
    return selectMenteeSelector(state);
}

export const selectPage = (state) => {
    return selectPageSelector(state);
}

export const selectSize = (state) => {
    return selectSizeSelector(state);
}

export const selectTotalSize = (state) => {
    return selectTotalSizeSelector(state);
}