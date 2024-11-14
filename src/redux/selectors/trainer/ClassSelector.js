import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const classSelector = (state) => state.Class;

const selectClassSelector = createSelector(
    classSelector,
    state => state.classes);

const selectPageSelector = createSelector(
    classSelector,
    state => state.page);

const selectSizeSelector = createSelector(
    classSelector,
    state => state.size);

const selectTotalSizeSelector = createSelector(
    classSelector,
    state => state.totalSize);

/** function */
export const selectClasses = (state) => {
    return selectClassSelector(state);
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