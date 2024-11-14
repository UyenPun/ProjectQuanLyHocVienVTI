import { combineReducers } from "redux";

import sidebar from "./sidebarReducers";
import layout from "./layoutReducer";
import theme from "./themeReducer";
import { reducer as toastr } from "react-redux-toastr";

import Login from "./LoginReducers";

// trainer
import Document from "./trainer/DocumentReducers";
import Subject from "./trainer/SubjectReducers";
import Course from "./trainer/CourseReducers";
import Class from "./trainer/ClassReducers";
import Mentor from "./trainer/MentorReducers";
import Mentee from "./trainer/MenteeReducers";

// mentor
import Attendance from "./mentor/AttendanceReducers";

export default combineReducers({
  sidebar,
  layout,
  theme,
  toastr,

  Login,

  // trainer
  Document,
  Subject,
  Course,
  Class,
  Mentee,
  Mentor,

  // mentor
  Attendance
});
