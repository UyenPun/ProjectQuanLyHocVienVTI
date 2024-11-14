import {
  BookOpen as BookOpenIcon,
  Sliders as SlidersIcon,
  Users as UsersIcon
} from "react-feather";

import withAuth from "../HOC/withAuth";

/******************************* TRAINER *******************************/
// Dashboard
import Dashboard from "../pages/trainer/dashboard/DashBoard";

// document
import Document from "../pages/trainer/document/Document";
import CreateDocumentForm from "../pages/trainer/document/create/CreateDocumentForm";

// subject
import Subject from "../pages/trainer/subject/Subject";
import CreateSubjectForm from "../pages/trainer/subject/create/CreateSubjectForm";

// course
import Course from "../pages/trainer/course/Course";
import CreateCourseForm from "../pages/trainer/course/create/CreateCourseForm";

// Class
import Class from "../pages/trainer/class/Class";
import DetailClass from "../pages/trainer/class/detail/DetailClass";
import CreateClassForm from "../pages/trainer/class/create/CreateClassForm";

//Mentor
import Mentor from "../pages/trainer/mentor/Mentor";
import DetailMentor from "../pages/trainer/mentor/detail/DetailMentor";
import CreateMentorForm from "../pages/trainer/mentor/create/CreateMentorForm";

// Mentee
import Mentee from "../pages/trainer/mentee/Mentee";
import DetailMentee from "../pages/trainer/mentee/detail/DetailMentee";
import CreateMenteeForm from "../pages/trainer/mentee/create/CreateMenteeForm";

// event
import News from "../pages/trainer/event/News";
import DailyEvent from "../pages/trainer/event/dailyEvent/DailyEvent";

/******************************* MENTOR *******************************/
// Attendance
import Attendance from "../pages/mentor/attendance/Attendance";

/******************************* OTHER *******************************/
// Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import NewPassword from "../pages/auth/NewPassword";
import PageInvalidResetPasswordToken from "../pages/auth/PageInvalidResetPasswordToken";
import Page403 from "../pages/auth/Page403";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

/******************************* TRAINER *******************************/
const dashboardRoutes = {
  path: ["/dashboard", "/"],
  name: "Dashboard",
  icon: SlidersIcon,
  component: withAuth(Dashboard),
  roles: ["Trainer", "Mentor"]
};

const eventRoutes = {
  path: "/event",
  name: "Events",
  icon: SlidersIcon,
  children: [
    {
      path: "/event/news",
      name: "News",
      component: withAuth(News),
      roles: ["Trainer"]
    },
    {
      path: "/event/daily",
      name: "Daily Events",
      component: withAuth(DailyEvent, "Trainer"),
      roles: ["Trainer"]
    }
  ],
  roles: ["Trainer"]
};

const documentRoutes = {
  path: "/documents",
  name: "Documents",
  icon: SlidersIcon,
  component: withAuth(Document, "Trainer"),
  roles: ["Trainer"]
};

const createDocumentFormRoutes = {
  path: "/documents/new",
  name: "Create Document",
  component: withAuth(CreateDocumentForm, "Trainer"),
  roles: ["Trainer"]
};

const subjectRoutes = {
  path: "/subjects",
  name: "Subjects",
  icon: SlidersIcon,
  component: withAuth(Subject, "Trainer"),
  roles: ["Trainer"]
};

const createSubjectFormRoutes = {
  path: "/subjects/new",
  name: "Create Subject",
  component: withAuth(CreateSubjectForm, "Trainer"),
  roles: ["Trainer"]
};

const courseRoutes = {
  path: "/courses",
  name: "Courses",
  icon: SlidersIcon,
  component: withAuth(Course, "Trainer"),
  roles: ["Trainer"]
};

const createCourseFormRoutes = {
  path: "/courses/new",
  name: "Create Crouse",
  component: withAuth(CreateCourseForm, "Trainer"),
  roles: ["Trainer"]
};

const classRoutes = {
  path: "/classes",
  name: "Class",
  icon: BookOpenIcon,
  component: withAuth(Class, "Trainer"),
  roles: ["Trainer"]
};

const detailClassRoutes = {
  path: "/classes/:id/detail",
  name: "Detail Class",
  component: withAuth(DetailClass, "Trainer"),
  roles: ["Trainer"]
};

const createClassFormRoutes = {
  path: "/classes/new",
  name: "Create Class",
  component: withAuth(CreateClassForm, "Trainer"),
  roles: ["Trainer"]
};

const mentorRoutes = {
  path: "/mentors",
  name: "Mentors",
  icon: UsersIcon,
  component: withAuth(Mentor, "Trainer"),
  roles: ["Trainer"]
}

const detailMentorRoutes = {
  path: "/mentors/:id/detail",
  name: "Detail Mentors",
  component: withAuth(DetailMentor, "Trainer"),
  roles: ["Trainer"]
}

const createMentorFormRoutes = {
  path: "/mentors/new",
  name: "Create Mentor",
  component: withAuth(CreateMentorForm, "Trainer"),
  roles: ["Trainer"]
}

const menteeRoutes = {
  path: "/mentees",
  name: "Mentees",
  icon: UsersIcon,
  component: withAuth(Mentee, "Trainer"),
  roles: ["Trainer"]
};

const detailMenteeRoutes = {
  path: "/mentees/:id/detail",
  name: "Detail Mentees",
  component: withAuth(DetailMentee, "Trainer"),
  roles: ["Trainer"]
};

const createMenteeFormRoutes = {
  path: "/mentees/new",
  name: "Create Mentee",
  component: withAuth(CreateMenteeForm, "Trainer"),
  roles: ["Trainer"]
};

/******************************* MENTOR *******************************/
const attendanceRoutes = {
  path: "/attendances",
  name: "Attendance",
  icon: UsersIcon,
  component: withAuth(Attendance, "Trainer", "Mentor"),
  roles: ["Trainer", "Mentor"]
};

/******************************* EXPORT *******************************/
export const authRoutes = {
  path: "/auth",
  name: "Auth",
  icon: UsersIcon,
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword
    },
    {
      path: "/auth/new-password/:token",
      name: "New Password",
      component: NewPassword
    },
    {
      path: "/auth/reset-password/invalid-token",
      name: "Invalid Token Page",
      component: PageInvalidResetPasswordToken
    },
    {
      path: "/auth/403",
      name: "403 Page",
      component: Page403
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500
    }
  ]
};

// Dashboard specific routes
export const dashboard = [
  /******************************* TRAINER *******************************/
  dashboardRoutes,
  eventRoutes,
  // document
  documentRoutes,
  createDocumentFormRoutes,
  // subject
  subjectRoutes,
  createSubjectFormRoutes,
  // course
  courseRoutes,
  createCourseFormRoutes,
  // class
  classRoutes,
  detailClassRoutes,
  createClassFormRoutes,
  // mentor
  mentorRoutes,
  detailMentorRoutes,
  createMentorFormRoutes,
  // mentee
  menteeRoutes,
  detailMenteeRoutes,
  createMenteeFormRoutes,

  /******************************* MENTOR *******************************/
  attendanceRoutes,

  /******************************* OTHER *******************************/
];

// All routes
export default [
  /******************************* TRAINER *******************************/
  dashboardRoutes,
  eventRoutes,
  documentRoutes,
  subjectRoutes,
  courseRoutes,
  classRoutes,
  mentorRoutes,
  menteeRoutes,

  /******************************* MENTOR *******************************/
  attendanceRoutes,

  /******************************* OTHER *******************************/
];
