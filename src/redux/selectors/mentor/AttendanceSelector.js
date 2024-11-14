import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const attendanceSelector = (state) => state.Attendance;

const selectOldAttendancesSelector = createSelector(
    attendanceSelector,
    state => state.oldAttendances);

const selectNewAttendancesSelector = createSelector(
    attendanceSelector,
    state => state.newAttendances);

/** function */
export const selectOldAttendances = (state) => {
    return selectOldAttendancesSelector(state);
}

export const selectNewAttendances = (state) => {
    return selectNewAttendancesSelector(state);
}