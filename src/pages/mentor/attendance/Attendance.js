import React from "react";

import {
    Col,
    Container,
    Row
} from "reactstrap";

import CourseChoose from "./CourseChoose";

const Attendance = () => {

    return (
        <Container fluid className="p-0">
            <h1 className="h3 mb-3">Attendance Record</h1>

            <hr />
            <Row>
                <Col>
                    <CourseChoose />
                </Col>
            </Row>
        </Container>
    );
}

export default Attendance;