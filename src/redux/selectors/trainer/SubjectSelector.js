import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const subjectSelector = (state) => state.Subject;

const selectSubjectSelector = createSelector(
    subjectSelector,
    state => state.subjects);

const selectPageSelector = createSelector(
    subjectSelector,
    state => state.page);

const selectSizeSelector = createSelector(
    subjectSelector,
    state => state.size);

const selectTotalSizeSelector = createSelector(
    subjectSelector,
    state => state.totalSize);

/** function */
export const selectSubjects = (state) => {
    return selectSubjectSelector(state);
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