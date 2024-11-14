import React, { useState, useEffect } from "react";
import classnames from "classnames";

import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";

import ScrollMenu from 'react-horizontal-scrolling-menu';
import ClassChoose from "./ClassChoose";

import CourseApi from '../../../api/mentor/CourseApi';

const CourseChoose = () => {

  const [activeCourseId, setActiveCourseId] = useState();
  const toggleActiveCourse = (id) => {
    if (activeCourseId !== id) {
      setActiveCourseId(id);
    }
  }

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourseAndActiveClasses = async () => {
      const courses = await CourseApi.getAllActiveClasses();
      setCourses(courses);
    }
    getCourseAndActiveClasses();
  }, []);

  const CourseTab = (props) => {

    const course = courses[props.index];

    return (
      <NavItem>
        <NavLink
          className={classnames({ active: activeCourseId === course.id })}
          onClick={() => { toggleActiveCourse(course.id); }}
        >
          {course.name}
        </NavLink>
      </NavItem>
    );
  };

  const renderCourseTabs = () =>
    [...Array(courses.length).keys()].map(index => {
      return <CourseTab index={index} key={index} />
    });

  return (
    <>
      <h4>Courses</h4>

      <div className={"tab tab-primary"}>
        {/* Course */}
        <Nav tabs className={"scrollMenu-container"}>
          <ScrollMenu
            alignCenter={false}
            clickWhenDrag={true}
            dragging={true}
            hideArrows={true}
            hideSingleArrow={true}
            wheel={false}
            data={renderCourseTabs()}
          />
        </Nav>

        <br />
        {/* Class */}
        {activeCourseId && (
          <TabContent activeTab={activeCourseId} className="mytab-primary" style={{ border: "none", padding: 0, boxShadow: "none" }}>
            <TabPane tabId={activeCourseId}>
              <ClassChoose classes={courses.find(course => course.id === activeCourseId).classes} />
            </TabPane>
          </TabContent>
        )}
      </div>
    </>
  );
}

export default CourseChoose;
