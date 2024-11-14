import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const mentorSelector = (state) => state.Mentor;

const selectMentorSelector = createSelector(
    mentorSelector,
    state => state.mentors);

const selectPageSelector = createSelector(
    mentorSelector,
    state => state.page);

const selectSizeSelector = createSelector(
    mentorSelector,
    state => state.size);

const selectTotalSizeSelector = createSelector(
    mentorSelector,
    state => state.totalSize);

/** function */
export const selectMentors = (state) => {
    return selectMentorSelector(state);
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