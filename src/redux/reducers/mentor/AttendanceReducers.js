import * as types from "../../constants";
import { getStringFromDate } from "../../../utils/Utils";

const initialState = {
  oldAttendances: [],
  newAttendances: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {

    case types.ATTENDANCE_FINISHED_CHANGE_DATE:
      return handleFinishedLessonChangeDate(state, actions);

    case types.ATTENDANCE_FINISHED_CHANGE_TYPE_MENTEE:
      return handleFinishedLessonChangeTypeMentee(state, actions);

    case types.ATTENDANCE_UNFINISHED_CHANGE_DATE_AND_INIT_MENTEE_ATTENDANCE:
      return handleUnfinishedLessonChangeDateAndInitMenteeAttendance(state, actions);

    case types.ATTENDANCE_UNFINISHED_CHANGE_DATE:
      return handleUnfinishedLessonChangeDate(state, actions);

    case types.ATTENDANCE_UNFINISHED_CHANGE_TYPE_MENTEE:
      return handleUnfinishedLessonChangeTypeMentee(state, actions);

    case types.ATTENDANCE_RESET:
      return {
        oldAttendances: [],
        newAttendances: []
      };

    default:
      return state;
  }
}

const handleFinishedLessonChangeDate = (state, actions) => {
  const oldAttendances = state.oldAttendances;

  const lessonId = actions.payload.lessonId;
  const date = getStringFromDate(actions.payload.date);
  const index = oldAttendances.findIndex(attendance => attendance.lessonId === lessonId)

  let lesson;
  if (index !== -1) {
    lesson = oldAttendances[index];
    lesson.date = date;
    // replace lesson
    oldAttendances[index] = lesson;

  } else {
    lesson = {
      lessonId,
      date
    };
    // add new lesson
    oldAttendances.push(lesson);
  }

  return {
    ...state,
    oldAttendances: [...oldAttendances]
  };
}

const handleFinishedLessonChangeTypeMentee = (state, actions) => {
  const oldAttendances = state.oldAttendances;

  const lessonId = actions.payload.lessonId;
  const menteeId = actions.payload.menteeId;
  const type = actions.payload.type;

  const indexLesson = oldAttendances.findIndex(attendance => attendance.lessonId === lessonId);

  let lesson;
  const mentee = {
    id: menteeId,
    type
  };

  if (indexLesson !== -1) {
    lesson = oldAttendances[indexLesson];
    let mentees = lesson.mentees;
    if (!mentees) {
      mentees = [mentee];
    } else {
      const indexMentee = !mentees ? -1 : mentees.findIndex(attendance => attendance.id === menteeId);
      if (indexMentee !== -1) {
        mentees[indexMentee] = mentee;
      } else {
        mentees.push(mentee);
      }
    }
    lesson.mentees = mentees;
    // replace lesson
    oldAttendances[indexLesson] = lesson;

  } else {
    lesson = {
      lessonId,
      mentees: [mentee]
    };
    // add new lesson
    oldAttendances.push(lesson);
  }

  return {
    ...state,
    oldAttendances: [...oldAttendances]
  };

}

const handleUnfinishedLessonChangeDateAndInitMenteeAttendance = (state, actions) => {
  const newAttendances = state.newAttendances;

  const ordinal = actions.payload.ordinal;
  const date = getStringFromDate(actions.payload.date);
  const menteeIds = actions.payload.menteeIds;

  const mentees = menteeIds.map(menteeId => {
    return {
      id: menteeId,
      type: true
    };
  });

  let lesson = {
    ordinal,
    date,
    mentees
  };

  // add new lesson
  newAttendances.push(lesson);

  return {
    ...state,
    newAttendances: [...newAttendances]
  };
}

const handleUnfinishedLessonChangeDate = (state, actions) => {
  const newAttendances = state.newAttendances;

  const ordinal = actions.payload.ordinal;
  const date = getStringFromDate(actions.payload.date);
  const index = newAttendances.findIndex(attendance => attendance.ordinal === ordinal)
  newAttendances[index].date = date;

  return {
    ...state,
    newAttendances: [...newAttendances]
  };

}

const handleUnfinishedLessonChangeTypeMentee = (state, actions) => {
  const newAttendances = state.newAttendances;

  const ordinal = actions.payload.ordinal;
  const menteeId = actions.payload.menteeId;
  const type = actions.payload.type;

  const indexLesson = newAttendances.findIndex(attendance => attendance.ordinal === ordinal);

  const mentee = {
    id: menteeId,
    type
  };

  let mentees = newAttendances[indexLesson].mentees;
  const indexMentee = mentees.findIndex(attendance => attendance.id === menteeId);
  mentees[indexMentee] = mentee;
  newAttendances[indexLesson].mentees = mentees;

  return {
    ...state,
    newAttendances: [...newAttendances]
  };

}
