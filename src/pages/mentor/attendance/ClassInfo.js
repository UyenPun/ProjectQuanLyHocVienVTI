import React, { useState, useEffect, useRef } from "react";

import {
    Row,
    Col,
    Card,
    Button,
    CardImg,
    CardHeader,
    CardText,
    CardTitle,
    CardBody,
    Progress,
    UncontrolledTooltip,
} from "reactstrap";

import unsplash1 from "../../../assets/img/photos/unsplash-1.jpg";
import unsplash2 from "../../../assets/img/photos/unsplash-2.jpg";
import unsplash3 from "../../../assets/img/photos/unsplash-3.jpg";

import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faUsers, faUser, faUserCheck, faTrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ClassApi from '../../../api/mentor/ClassApi';
import AttendanceTable from "./AttendanceTable";

const ClassInfoOverview = (props) => {

    const randomClazzImage = () => {
        // random 0 --> 2
        const randomNumber = props.clazz.id % 3;
        switch (randomNumber) {
            case 0:
                return unsplash1;
            case 1:
                return unsplash2;
            case 2:
                return unsplash3;
            default:
                break;
        }
    };

    const handClickCheckAttendance = () => {
        props.setCurrentSubject(
            props.clazz.currentSubjectLesson && props.clazz.currentSubjectLesson.subjectId ?
                props.clazz.subjectProgresses.find(subject => subject.id === props.clazz.currentSubjectLesson.subjectId)
                : props.clazz.subjectProgresses[0]);
        props.scrollToAttendanceTable();
    };

    return (
        <Card>
            <CardImg top width="100%" src={randomClazzImage()} alt={props.clazz.name} />
            <CardHeader>
                <CardTitle tag="h5" className="mb-0">
                    <FontAwesomeIcon icon={faTrain} className="align-middle mr-2" fixedWidth />
                    <span id="tooltip_clazz_name">
                        {props.clazz.name}
                    </span>
                    <UncontrolledTooltip
                        placement={"bottom"}
                        target={"tooltip_clazz_name"}>
                        {props.clazz.code}
                    </UncontrolledTooltip>
                </CardTitle>
            </CardHeader>
            <CardBody>
                <CardText>
                    <FontAwesomeIcon icon={faCalendarAlt} className="align-middle mr-2" fixedWidth /> <span id={"tooltip_clazz_start_date"}>Start date: {props.clazz.startDate}</span>
                    <br />
                    <UncontrolledTooltip
                        placement={"bottom"}
                        target={"tooltip_clazz_start_date"}>
                        Expected end date: {props.clazz.expectedEndDate}
                    </UncontrolledTooltip>
                    <FontAwesomeIcon icon={faUsers} className="align-middle mr-2" fixedWidth /> <span>Active mentees: {`${props.clazz.activeMenteeTotal}/${props.clazz.menteeTotal}`}</span>
                    <br />
                    <FontAwesomeIcon icon={faUser} className="align-middle mr-2" fixedWidth /> <span id={"tooltip_clazz_mentor"}>Mentor: {props.clazz.mentor && props.clazz.mentor.fullName}</span>
                    <br />
                    {props.clazz.mentor &&
                        <UncontrolledTooltip
                            placement={"bottom"}
                            target={"tooltip_clazz_mentor"}>
                            {props.clazz.mentor.username}
                        </UncontrolledTooltip>
                    }
                </CardText>
                <Button color="primary" onClick={handClickCheckAttendance}>
                    <FontAwesomeIcon icon={faUserCheck} className="align-middle mr-2" fixedWidth /> Check Attendance
                </Button>
            </CardBody>
        </Card>
    );
}

const SubjectProgress = (props) => {

    const progress = Math.ceil(props.subject.totalFinishedLesson / props.subject.totalLesson * 100);

    const statusBadge = () => {
        switch (progress) {
            // Done
            case 100:
                return "badge badge-primary float-right";
            // In-Progress
            case 0:
                return "badge badge-warning float-right";
            // Pending
            default:
                return "badge badge-danger float-right";
        }
    }

    const statusText = () => {
        switch (progress) {
            case 100:
                return "Done";
            case 0:
                return "Pending";
            default:
                return "In-Progress";
        }
    }

    const statusColor = () => {
        switch (progress) {
            case 100:
                return "primary";
            case 0:
                return "warning";
            default:
                return "danger";
        }
    }

    const handClickNameSubject = (e) => {
        e.preventDefault();
        props.setCurrentSubject(props.subject);
        props.scrollToAttendanceTable();
    }

    return (
        <Card className="flex-fill">
            <CardHeader>
                <span className={statusBadge()}>{statusText()}</span>
                <a
                    className="card-title mb-0" style={{ color: "#3B82EC" }}
                    onClick={handClickNameSubject}
                    href="/#"
                >
                    {props.subject.name}
                </a>
            </CardHeader>
            <CardBody className="my-2">
                <Row className="d-flex align-items-center mb-4">
                    <Col xs="8">
                        <span className="d-flex align-items-center mb-0 font-weight-light">
                            {`${props.subject.totalFinishedLesson}/${props.subject.totalLesson} Lessons`}
                        </span>
                    </Col>
                    <Col xs="4" className="text-right">
                        <span className="text-muted">{`${progress}%`}</span>
                    </Col>
                </Row>

                <Progress
                    color={statusColor()}
                    value={progress}
                    className="progress-sm shadow-sm mb-1"
                />
            </CardBody>
        </Card>
    )
}

const ClassInfo = (props) => {

    const [detailClazz, setDetailClazz] = useState();
    const [currentSubject, setCurrentSubject] = useState();

    const attendanceTableRef = useRef(null);
    const scrollToAttendanceTable = () => {
        attendanceTableRef.current.scrollIntoView();
    }

    const [valueForceUpdate, setValueForceUpdate] = useState(1);
    const forceUpdate = () => setValueForceUpdate(valueForceUpdate + 1);

    useEffect(() => {
        const getDetailClassForAttendance = async () => {
            const clazz = await ClassApi.getDetailClassForAttendance(props.classId);
            setDetailClazz(clazz);
            if (!currentSubject) {
                // find current subject
                setCurrentSubject(
                    clazz.currentSubjectLesson ?
                        clazz.subjectProgresses.find(subject => subject.id === clazz.currentSubjectLesson.subjectId)
                        : clazz.subjectProgresses[0]);
            }
        }
        getDetailClassForAttendance();
        // eslint-disable-next-line
    }, [props.classId, valueForceUpdate]);

    return (
        <>
            {detailClazz &&
                <>
                    <Row>
                        <Col md="6" lg="4">
                            <ClassInfoOverview
                                clazz={detailClazz}
                                setCurrentSubject={setCurrentSubject}
                                scrollToAttendanceTable={scrollToAttendanceTable}
                            />
                        </Col>
                        <Col md="6" lg="8">
                            <Row>
                                {detailClazz.subjectProgresses.map((subject, index) => {
                                    return (
                                        <Col md="6" lg="6" key={index}>
                                            <SubjectProgress
                                                subject={subject}
                                                setCurrentSubject={setCurrentSubject}
                                                scrollToAttendanceTable={scrollToAttendanceTable}
                                            />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Col>
                    </Row>
                    <div ref={attendanceTableRef}>
                        {currentSubject &&
                            <Row>
                                <Col>
                                    <AttendanceTable
                                        clazz={detailClazz}
                                        subject={currentSubject}
                                        forceUpdate={forceUpdate}
                                        valueForceUpdate={valueForceUpdate}
                                    />
                                </Col>
                            </Row>
                        }
                    </div>
                </>
            }
        </>
    );
}

export default ClassInfo;
