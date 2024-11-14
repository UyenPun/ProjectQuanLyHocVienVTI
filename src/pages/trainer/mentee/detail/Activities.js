
import React from "react";

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Media,
    Row,
    Col
} from "reactstrap";
import Select from "react-select";

import { Formik, FastField, Form } from 'formik';

import avatar2 from "../../../../assets/img/avatars/avatar-2.jpg";

const Activities = (props) => {

    const filterOptions = [
        { value: "all", label: "All" },
        { value: "attendance", label: "Attendance" },
        { value: "exam", label: "Exam" },
        { value: "deferred", label: "Deferred" },
        { value: "tuition", label: "Tuition" },
        { value: "job", label: "Job" },
    ];

    return <Card>
        <Formik
            initialValues={{
                name: '',
                account: "duy.nguyenngoc1",
                code: "VA13020073",
                firstName: "Nguyen Ngoc",
                lastName: "Duy",
                gender: "Male",
                dateOfbirth: "1995-12-20",
                currentAddress: "Duong Noi, Ha Dong, Ha Noi",
                school: "UET University",
                homeTown: "Nam Dinh",
                currentWorkingLocation: "VTI Academy",
                phoneNumber: "0332782798",
                email: "duy.nguyenngoc1@vti.com.vn",
                facebook: "https://www.facebook.com/duynn2012",
                joinedDate: "2020-12-20",
                employmentStatus: "Not yet",
                note: ""
            }}
            onSubmit={
                values => {
                    console.log(values);
                    props.setUpdateBasicInformation(false);
                }
            }
            validateOnChange={false}
            validateOnBlur={false}
        >
            {({ isSubmitting }) => (
                <Form>
                    <CardHeader>
                        <Row>
                            <Col md="8">
                                <CardTitle tag="h5" className="mb-0">
                                    Activities
                                </CardTitle>
                            </Col>
                            {/* Class */}
                            <Col md="4">
                                <FastField
                                    bsSize="lg"
                                    name="filter"
                                    placeholder="Enter filter"
                                    isMulti
                                    options={filterOptions}
                                    component={Select}
                                />
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Media>
                            <img
                                src={avatar2}
                                width="36"
                                height="36"
                                className="rounded-circle mr-2"
                                alt="Ashley Briggs"
                            />
                            <Media body>
                                <small className="float-right text-navy">5m ago</small>
                                <strong>Duy Nguyen</strong> started learning{" "}
                                <strong>Java Core - Lesson 02</strong>
                                <br />
                                <small className="text-muted">Today 7:51 pm</small>
                                <br />
                            </Media>
                        </Media>

                        <hr />
                        <Media>
                            <img
                                src={avatar2}
                                width="36"
                                height="36"
                                className="rounded-circle mr-2"
                                alt="Ashley Briggs"
                            />
                            <Media body>
                                <small className="float-right text-navy">1 day ago</small>
                                <strong>Duy Nguyen</strong> absent{" "}
                                <strong>Java Core - Lesson 01</strong>
                                <br />
                                <small className="text-muted">Yesterday 7:02 pm</small>
                                <br />
                            </Media>
                        </Media>

                        <hr />
                        <Media>
                            <img
                                src={avatar2}
                                width="36"
                                height="36"
                                className="rounded-circle mr-2"
                                alt="Ashley Briggs"
                            />
                            <Media body>
                                <small className="float-right text-navy">2 days ago</small>
                                <strong>Duy Nguyen</strong> has finished{" "}
                                <strong>SQL Exam</strong>
                                <br />
                                <small className="text-muted">At 9:50 pm</small>
                                <br />
                            </Media>
                        </Media>

                        <hr />
                        <Media>
                            <img
                                src={avatar2}
                                width="36"
                                height="36"
                                className="rounded-circle mr-2"
                                alt="Ashley Briggs"
                            />
                            <Media body>
                                <small className="float-right text-navy">2 days ago</small>
                                <strong>Duy Nguyen</strong> has started taking{" "}
                                <strong>SQL Exam</strong>
                                <br />
                                <small className="text-muted">At 7:03 pm</small>
                                <br />
                            </Media>
                        </Media>

                        <hr />
                        <Media>
                            <img
                                src={avatar2}
                                width="36"
                                height="36"
                                className="rounded-circle mr-2"
                                alt="Ashley Briggs"
                            />
                            <Media body>
                                <small className="float-right text-navy">3 days ago</small>
                                <strong>Duy Nguyen</strong> started learning{" "}
                                <strong>SQL - Lesson 07</strong>
                                <br />
                                <small className="text-muted">At 7:03 pm</small>
                                <br />
                            </Media>
                        </Media>

                        <hr />
                        <Media>
                            <img
                                src={avatar2}
                                width="36"
                                height="36"
                                className="rounded-circle mr-2"
                                alt="Ashley Briggs"
                            />
                            <Media body>
                                <small className="float-right text-navy">9 days ago</small>
                                <strong>Duy Nguyen</strong> comeback to learn{" "}
                                <strong>SQL - Lesson 01</strong>
                                <br />
                                <small className="text-muted">At 7:03 pm</small>
                                <br />
                            </Media>
                        </Media>

                        <hr />
                        <Media>
                            <img
                                src={avatar2}
                                width="36"
                                height="36"
                                className="rounded-circle mr-2"
                                alt="Ashley Briggs"
                            />
                            <Media body>
                                <small className="float-right text-navy">22 days ago</small>
                                <strong>Duy Nguyen</strong> has {" "}
                                <strong>deferred</strong>
                                <br />
                                <small className="text-muted">At 7:04 pm</small>
                                <br />
                            </Media>
                        </Media>

                        <hr />
                        <Media>
                            <img
                                src={avatar2}
                                width="36"
                                height="36"
                                className="rounded-circle mr-2"
                                alt="Ashley Briggs"
                            />
                            <Media body>
                                <small className="float-right text-navy">23 days ago</small>
                                <strong>Duy Nguyen</strong> started learning{" "}
                                <strong>SQL - Lesson 02</strong>
                                <br />
                                <small className="text-muted">At 7:04 pm</small>
                                <br />
                            </Media>
                        </Media>

                        <hr />
                        <Media>
                            <img
                                src={avatar2}
                                width="36"
                                height="36"
                                className="rounded-circle mr-2"
                                alt="Ashley Briggs"
                            />
                            <Media body>
                                <small className="float-right text-navy">25 days ago</small>
                                <strong>Duy Nguyen</strong> started learning{" "}
                                <strong>SQL - Lesson 01</strong>
                                <br />
                                <small className="text-muted">At 7:03 pm</small>
                                <br />
                            </Media>
                        </Media>

                        <hr />
                        <Media>
                            <img
                                src={avatar2}
                                width="36"
                                height="36"
                                className="rounded-circle mr-2"
                                alt="Ashley Briggs"
                            />
                            <Media body>
                                <small className="float-right text-navy">1 month ago</small>
                                <strong>Duy Nguyen</strong> has been registered{" "}
                                <strong>AWS Class</strong>
                                <br />
                                <small className="text-muted">At 7:02 pm</small>
                                <br />
                            </Media>
                        </Media>

                        <hr />
                        <Button color="primary" block>
                            Load more
                        </Button>
                    </CardBody>
                </Form>
            )}
        </Formik >
    </Card>
}

export default Activities;