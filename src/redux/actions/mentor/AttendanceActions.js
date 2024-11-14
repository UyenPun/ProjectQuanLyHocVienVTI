import * as types from "../../constants";

export const attendanceFinishChangeDateAction = (lessonId, date) => {
  return {
    type: types.ATTENDANCE_FINISHED_CHANGE_DATE,
    payload: {
      lessonId,
      date
    }
  };
};

export const attendanceFinishChangeTypeMenteeAction = (lessonId, menteeId, type) => {
  return {
    type: types.ATTENDANCE_FINISHED_CHANGE_TYPE_MENTEE,
    payload: {
      lessonId,
      menteeId,
      type
    }
  };
};

export const attendanceUnfinishChangeDateAndInitMenteeAttendanceAction = (ordinal, date, menteeIds) => {
  return {
    type: types.ATTENDANCE_UNFINISHED_CHANGE_DATE_AND_INIT_MENTEE_ATTENDANCE,
    payload: {
      ordinal,
      date,
      menteeIds
    }
  };
};

export const attendanceUnfinishChangeDateAction = (ordinal, date) => {
  return {
    type: types.ATTENDANCE_UNFINISHED_CHANGE_DATE,
    payload: {
      ordinal,
      date
    }
  };
};

export const attendanceUnfinishChangeTypeMenteeAction = (ordinal, menteeId, type) => {
  return {
    type: types.ATTENDANCE_UNFINISHED_CHANGE_TYPE_MENTEE,
    payload: {
      ordinal,
      menteeId,
      type
    }
  };
};

export const attendanceResetAction = () => {
  return {
    type: types.ATTENDANCE_RESET
  };
};