import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const documentSelector = (state) => state.Document;

const selectDocumentSelector = createSelector(
    documentSelector,
    state => state.documents);

const selectPageSelector = createSelector(
    documentSelector,
    state => state.page);

const selectSizeSelector = createSelector(
    documentSelector,
    state => state.size);

const selectTotalSizeSelector = createSelector(
    documentSelector,
    state => state.totalSize);

/** function */
export const selectDocuments = (state) => {
    return selectDocumentSelector(state);
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