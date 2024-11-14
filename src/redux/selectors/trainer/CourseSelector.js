import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const courseSelector = (state) => state.Course;

const selectCourseSelector = createSelector(
    courseSelector,
    state => state.courses);

const selectPageSelector = createSelector(
    courseSelector,
    state => state.page);

const selectSizeSelector = createSelector(
    courseSelector,
    state => state.size);

const selectTotalSizeSelector = createSelector(
    courseSelector,
    state => state.totalSize);

/** function */
export const selectCourses = (state) => {
    return selectCourseSelector(state);
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