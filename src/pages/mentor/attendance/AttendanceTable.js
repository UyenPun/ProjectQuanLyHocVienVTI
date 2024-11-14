import React, { useState, useEffect, forwardRef } from "react";
import { connect } from "react-redux";

import {
    Button,
    UncontrolledTooltip,
} from "reactstrap";

import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ScrollMenu from 'react-horizontal-scrolling-menu';

import {
    attendanceFinishChangeDateAction, attendanceFinishChangeTypeMenteeAction,
    attendanceUnfinishChangeDateAndInitMenteeAttendanceAction, attendanceUnfinishChangeDateAction, attendanceUnfinishChangeTypeMenteeAction,
    attendanceResetAction
} from '../../../redux/actions/mentor/AttendanceActions';
import { selectOldAttendances, selectNewAttendances } from "../../../redux/selectors/mentor/AttendanceSelector";

import { getDayMonthFromDate } from "../../../utils/Utils";
import storage from "../../../storage/Storage";

import { showSuccessNotification } from "../../../utils/Notification";
import AttendanceApi from '../../../api/mentor/AttendanceApi';

const AttendanceTable = (props) => {

    const forceUpdate = props.forceUpdate;

    const userRole = storage.getUserInfo().role;

    const [lessons, setLessons] = useState();
    const [mentees, setMentees] = useState();

    useEffect(() => {
        const getSubjectAttendancesByClass = async () => {
            const result = await AttendanceApi.getSubjectAttendancesByClass(props.clazz.id, props.subject.id);
            if (!result || result.length === 0) {
                setMentees(null);
                setLessons(null);
                return;
            }

            if (result[0].date) {
                const menteeTemps = JSON.parse(JSON.stringify(result[0].mentees)); // deep clone
                menteeTemps.forEach(mentee => {
                    mentee.type = null;
                });
                setMentees(menteeTemps);
                setLessons(result);
            } else {
                result.forEach(mentee => {
                    mentee.type = null;
                });
                setMentees(result);
                setLessons(null);
            }
        }
        getSubjectAttendancesByClass();
        props.attendanceResetAction();
        // eslint-disable-next-line
    }, [props.clazz.id, props.subject.id, props.valueForceUpdate]);

    const getStyleFromStatus = (status) => {
        switch (status) {
            case "Active":
            case "Not-started":
                return { backgroundColor: "white" };

            default:
                return { backgroundColor: "rgb(183, 183, 183)" };
        }
    }

    const AttendanceCell = (props) => {

        const mentee = props.mentee;
        const lessonId = props.lessonId;
        const [isUpdateAttendance, setUpdateAttendance] = useState(false);

        return (
            <div
                id={`tooltip_mentee_type_${lessonId}_${mentee.id}_${props.isUnfinished ? "unfinished" : "finished"}`}
                className="scrollview-header"
                style={{
                    borderColor: isUpdateAttendance || (props.isUnfinished && mentee.type) ? "red" : "#dee2e6",
                    ...getStyleFromStatus(mentee.status)
                }}
            >
                <span style={{ visibility: mentee.type ? "visible" : "hidden" }}>
                    {
                        mentee.type ?
                            <AttendanceButton
                                lessonId={lessonId}
                                menteeId={mentee.id}
                                type={mentee.type}
                                status={mentee.status}
                                setUpdateAttendance={setUpdateAttendance}
                                isUnfinished={props.isUnfinished}
                            />
                            : <Button>.</Button>
                    }
                </span>
                {mentee.type &&
                    <UncontrolledTooltip
                        placement={"bottom"}
                        target={`tooltip_mentee_type_${lessonId}_${mentee.id}_${props.isUnfinished ? "unfinished" : "finished"}`}>
                        {mentee.type === "P" ? "Present" : "Absent"}
                    </UncontrolledTooltip>
                }
            </div>
        );
    };

    const AttendanceButtonComponent = (props) => {
        const [isPresent, updatePresent] = useState(props.type === "P");
        const toggleAttendance = () => {
            if (!props.isUnfinished) {
                props.attendanceFinishChangeTypeMenteeAction(props.lessonId, props.menteeId, !isPresent);
            } else {
                props.attendanceUnfinishChangeTypeMenteeAction(props.lessonId + 1, props.menteeId, !isPresent);
            }
            updatePresent(!isPresent);
            props.setUpdateAttendance(true);
        };

        return (
            <Button
                color={isPresent ? "primary" : "danger"}
                onClick={userRole === "Mentor" ? toggleAttendance : null}
                disabled={props.status !== "Active" && props.status !== "Not-started"}
            >
                {isPresent ? "P" : "A"}
            </Button>
        )
    };
    const AttendanceButton = connect(null, { attendanceFinishChangeTypeMenteeAction, attendanceUnfinishChangeTypeMenteeAction })(AttendanceButtonComponent);

    const FinishedLessonColumnComponent = (props) => {

        const lesson = props.lesson;

        const [date, setDate] = useState(new Date(lesson.date));
        const [isFirstTimeBindingDate, setFirstTimeBindingDate] = useState(false);
        const DateInput = forwardRef(({ value, onClick }, ref) => {
            return (
                <>
                    <div
                        id={`tooltip_lesson_date_${lesson.id}`}
                        className="scrollview-header"
                        style={{ backgroundColor: "white" }}
                        onClick={userRole === "Mentor" ? onClick : null}
                        ref={ref}
                    >
                        <b style={{ color: value !== lesson.date ? "red" : "black" }}>
                            {getDayMonthFromDate(new Date(value))}
                        </b>
                    </div>
                    <UncontrolledTooltip
                        placement={"bottom"}
                        target={`tooltip_lesson_date_${lesson.id}`}>
                        <div>{lesson.name}</div>
                        <div>{lesson.mentor.fullName}</div>
                        <div>{`(${lesson.mentor.username})`}</div>
                    </UncontrolledTooltip>
                </>
            );
        });
        useEffect(() => {
            if (date) {
                if (!isFirstTimeBindingDate) {
                    setFirstTimeBindingDate(true);
                } else {
                    props.attendanceFinishChangeDateAction(lesson.id, date);
                }
            }
            // eslint-disable-next-line
        }, [date]);

        return <>
            <DatePicker
                selected={date}
                onChange={value => setDate(value)}
                customInput={<DateInput />}
                dateFormat="yyyy-MM-dd"
            />

            {lesson.mentees.map(mentee =>
                <AttendanceCell
                    key={`${lesson.id}_${mentee.id}`}
                    mentee={mentee}
                    lessonId={lesson.id}
                />
            )}
        </>
    };
    const FinishedLessonColumn = connect(null, { attendanceFinishChangeDateAction })(FinishedLessonColumnComponent);

    const UnfinishedLessonColumnComponent = (props) => {

        const [date, setDate] = useState(null);
        const DateInput = forwardRef(({ value, onClick }, ref) => {
            return (
                <>
                    <div
                        id={`tooltip_lesson_name_${props.index}`}
                        className="scrollview-header"
                        style={{ backgroundColor: "white" }}
                        onClick={userRole === "Mentor" ? onClick : null}
                        ref={ref}
                    >
                        <b style={{ color: value ? "red" : "black" }}>
                            {
                                !value
                                    ? `Lesson ${props.index + 1}`
                                    : getDayMonthFromDate(new Date(value))
                            }
                        </b>
                    </div>

                    <UncontrolledTooltip
                        placement={"bottom"}
                        target={`tooltip_lesson_name_${props.index}`}>
                        {
                            !value
                                ? "Unfinished"
                                : (
                                    <>
                                        <div>{`Lesson ${props.index + 1}`}</div>
                                        <div>{storage.getUserInfo().fullName}</div>
                                        <div>{`(${storage.getUserInfo().username})`}</div>
                                    </>
                                )
                        }
                    </UncontrolledTooltip>
                </>
            );
        });

        const [menteeAttendances, setMenteeAttendances] = useState([...mentees]);
        const [isInitAttendance, setInitAttendance] = useState(false);
        useEffect(() => {
            if (date && !isInitAttendance) {
                // init attendance
                menteeAttendances.forEach(mentee => {
                    if (mentee.status === "Active" || mentee.status === "Not-started") {
                        mentee.type = "P";
                    }
                });
                setMenteeAttendances([...menteeAttendances]);
                setInitAttendance(true);
            }
            // eslint-disable-next-line
        }, [date]);
        useEffect(() => {
            if (date) {
                if (!isInitAttendance) {
                    props.attendanceUnfinishChangeDateAndInitMenteeAttendanceAction(
                        props.index + 1,
                        date,
                        [...mentees.filter(mentee => mentee.status === "Active" || mentee.status === "Not-started").map(mentee => mentee.id)]);
                } else {
                    props.attendanceUnfinishChangeDateAction(props.index + 1, date);
                }
            }
            // eslint-disable-next-line
        }, [date]);

        return <>
            <DatePicker
                selected={date}
                onChange={value => setDate(value)}
                customInput={<DateInput />}
                dateFormat="yyyy-MM-dd"
            />

            {menteeAttendances.map(mentee =>
                <AttendanceCell
                    key={`${props.index}_${mentee.id}`}
                    mentee={mentee}
                    lessonId={props.index}
                    isUnfinished={true}
                />
            )}
        </>
    };
    const UnfinishedLessonColumn = connect(null, { attendanceUnfinishChangeDateAndInitMenteeAttendanceAction, attendanceUnfinishChangeDateAction })(UnfinishedLessonColumnComponent);

    const MenteeNameColumn = (props) => {
        return <>
            <div className="scrollview-header" style={{ backgroundColor: "white" }}>
                <b>Mentee Name</b>
            </div>
            {mentees.map((mentee, index) =>
                <div id={`tooltip_mentee_fullName_${index}`}
                    className="scrollview-header"
                    style={{ textAlign: "left", ...getStyleFromStatus(mentee.status) }}
                    key={`mentee-fullName-${index}`}
                >
                    {mentee.fullName}
                    <span style={{ visibility: "hidden" }}>
                        <Button>.</Button>
                    </span>
                    <UncontrolledTooltip
                        placement={"bottom"}
                        target={`tooltip_mentee_fullName_${index}`}>
                        <div>{mentee.username}</div>
                        {mentee.status !== "Active" && <div>{mentee.status}</div>
                        }
                    </UncontrolledTooltip>
                </div>
            )}
        </>
    };

    const renderTable = () => {

        const columns = [];

        // mentee name
        columns.push(
            <div className="arrow-prev" key={`columns-mentee-name-0`}>
                <MenteeNameColumn />
            </div >
        );

        const lessonOrdinals = Array.from({ length: props.subject.totalLesson }, (_, i) => i + 1);

        lessonOrdinals.forEach((lessonOrdinal, index) => {
            // finished lesson
            const indexLesson = (!lessons || lessons.length === 0) ? -1 : lessons.findIndex(lesson => lesson.ordinal === lessonOrdinal);
            if (indexLesson !== -1) {
                const finishedLessonColumn = (
                    <div className="arrow-prev" key={`columns-finish-lesson-${index + 1}`} >
                        <FinishedLessonColumn lesson={lessons[indexLesson]} />
                    </div>
                );
                columns.push(finishedLessonColumn);
            } else {
                // Unfinished lesson
                const unfinishedLessonColumn = (
                    <div className="arrow-prev" key={`columns-unfinish-lesson-${index + 1}`}>
                        <UnfinishedLessonColumn index={index} />
                    </div>
                );
                columns.push(unfinishedLessonColumn);
            }
        });

        return columns;
    };

    const SaveButtonComponent = (props) => {
        const handleSave = async () => {
            try {
                // call API
                await AttendanceApi.update(
                    props.clazzId,
                    props.subjectId,
                    props.oldAttendances,
                    props.newAttendances
                );
                // show notification
                showSuccessNotification(
                    "Update Attendance",
                    "Update Attendance Successfully!"
                );
                forceUpdate();
            } catch (error) {
                console.log(error);
            }
        };

        return (
            < Button
                color="primary"
                onClick={handleSave}
                disabled={props.oldAttendances.length === 0 && props.newAttendances.length === 0}
            >
                <FontAwesomeIcon icon={faCheckCircle} className="align-middle mr-2" fixedWidth />
                Save
            </Button >
        );
    };

    const SaveButton = connect(state => {
        return {
            oldAttendances: selectOldAttendances(state),
            newAttendances: selectNewAttendances(state)
        };
    })(SaveButtonComponent);

    if (!mentees) {
        return null;
    }

    return (
        <>
            <h4>
                <FontAwesomeIcon icon={faCheckCircle} className="align-middle mr-2" fixedWidth />
                {props.subject.name} Attendance check for {props.clazz.name}
            </h4>

            <hr />
            <ScrollMenu
                alignCenter={false}
                clickWhenDrag={true}
                dragging={true}
                hideArrows={true}
                hideSingleArrow={true}
                wheel={false}
                data={renderTable()}
            />

            {
                userRole === "Mentor" && <>
                    <br />
                    <SaveButton
                        clazzId={props.clazz.id}
                        subjectId={props.subject.id}
                    />
                </>
            }
        </>
    )
};

export default connect(null, { attendanceResetAction })(AttendanceTable);