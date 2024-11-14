import React from "react";
import { useParams } from "react-router-dom";

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    FormGroup,
    Label,
    Row,
    Col
} from "reactstrap";
import { ReactstrapInput } from "reactstrap-formik";
import { FastField, Form, Formik, Field } from "formik";
import Select from "react-select";
import WithAnimationFadeIn from "../../../../components/animation/WithAnimationFadeIn";
import { Edit3 } from "react-feather";

const UpdateBasicInformationClass = (props) => {

    // mentee id
    let { id } = useParams();
    console.log("Mentee ID: " + id);

    const levelOptions = [
        { value: "Developer", label: "Developer" },
        { value: "Tester", label: "Tester" },
    ];

    const subjectOptions = [
        { value: "SQL", label: "SQL" },
        { value: "Java Core", label: "Java Core" },
        { value: "Frontend Basic", label: "Frontend Basic" },
        { value: "Java Advance", label: "Java Advance" },
        { value: "Frontend Advance", label: "Frontend Advance" },
        { value: "Mock Project", label: "Mock Project" },
        { value: "Android", label: "Android" },
        { value: "AWS", label: "AWS" },

    ];


    const lessonOptions = [

        { value: "1", label: "Lesson 1" },
        { value: "2", label: "Lesson 2" },
        { value: "3", label: "Lesson 3" },
        { value: "4", label: "Lesson 4" },
        { value: "5", label: "Lesson 5" },
        { value: "6", label: "Lesson 6" },
        { value: "7", label: "Lesson 7" },
        { value: "8", label: "Lesson 8" },
        { value: "9", label: "Lesson 9" },
        { value: "10", label: "Lesson 10" },

    ];

    return <Card>
        <Formik
            initialValues={{
                className: 'Rocket 09',
                courseCode: "Rocket_09_20_09_2021",
                level: "IT",
                facebook: "Link here....",
                type: "",
                schedule: "T2, T4, T6",
                address: "6th floor, AC Building, Duy Tan str., HN",
                startDate: "20/01/2021",
                expectEndDate: "20/06/2021",
                endDate: "",
                subject: "",
                actualLessonTotal: "70",
                menteeAmout: "20",
                status: "active",
                mentorName: "Nguyen Ngoc Duy",
                expectLesson: "90",
                standardTuitionTotal : 200000000,
                actualTuitionTotal : 135000000,
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
                        <div className="card-actions float-right">
                            <Button color="primary" type="submit">
                                Save
                            </Button>
                        </div>
                        <CardTitle tag="h5" className="mb-0">
                            Update Class Infor
                        </CardTitle>
                    </CardHeader>
                    <CardBody>

                        <Row>
                            <Col xl="6">
                                {/* Class Name */}
                                <FormGroup>
                                    <Label>
                                        Class Name
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        bsSize="md"
                                        name="className"
                                        placeholder="Enter Class Name"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>
                            </Col>

                            <Col xl="6">
                                {/* Code */}
                                <FormGroup>
                                    <Label>
                                        Course code
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        bsSize="md"
                                        name="courseCode"
                                        placeholder="Enter Course Code"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>

                    <hr className="my-0" />
                    <CardBody>
                        <CardTitle tag="h5">About</CardTitle>
                        <Row>
                            <Col md="6" xl="6">

                                {/* Level */}
                                <FormGroup>
                                    <Label>
                                        Level
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <Row>
                                        <Col xl="6">
                                            <Label>
                                                <Field type="radio" name="level" value="IT" />
                                                {" IT"}
                                            </Label>
                                        </Col>
                                        <Col xl="6">
                                            <Label>
                                                <Field type="radio" name="level" value="Non-IT" />
                                                {" Non-IT"}
                                            </Label>
                                        </Col>
                                    </Row>
                                </FormGroup>

                                {/* Type */}
                                <FormGroup style={{ marginTop: "18px" }} >
                                    <Label>Type</Label>
                                    <FastField
                                        bsSize="md"
                                        name="type"
                                        placeholder="Enter level"
                                        defaultValue={levelOptions[0]}
                                        options={levelOptions}
                                        component={Select}
                                    />
                                </FormGroup>

                                {/* Address */}
                                <FormGroup>
                                    <Label>
                                        Address
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        bsSize="md"
                                        name="address"
                                        placeholder="Enter Address"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                                {/* Mentee Amout */}
                                <FormGroup>
                                    <Label>
                                        Mentee amout
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        bsSize="md"
                                        name="menteeAmout"
                                        placeholder="Enter Mentee Amout"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                                {/* Expect lesson */}
                                <FormGroup>
                                    <Label>
                                        Expect Lesson
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        bsSize="md"
                                        type="number"
                                        name="expectLesson"
                                        placeholder="Enter Expect Lesson"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Schedule</Label>

                                    <Row>
                                        <Col xl="1">
                                            <Label>
                                                <Field type="checkbox" name="schedule" value="T2" />
                                                {" T2"}
                                            </Label>
                                        </Col>
                                        <Col xl="1">
                                            <Label>
                                                <Field type="checkbox" name="schedule" value="T3" />
                                                {" T3"}
                                            </Label>
                                        </Col>
                                        <Col xl="1">
                                            <Label>
                                                <Field type="checkbox" name="schedule" value="T4" />
                                                {" T4"}
                                            </Label>
                                        </Col>
                                        <Col xl="1">
                                            <Label>
                                                <Field type="checkbox" name="schedule" value="T5" />
                                                {" T5"}
                                            </Label>
                                        </Col>
                                        <Col xl="1">
                                            <Label>
                                                <Field type="checkbox" name="schedule" value="T6" />
                                                {" T6"}
                                            </Label>
                                        </Col>
                                        <Col xl="1">
                                            <Label>
                                                <Field type="checkbox" name="schedule" value="S.T7" />
                                                {" S.T7"}
                                            </Label>
                                        </Col>
                                        <Col xl="1">
                                            <Label>
                                                <Field type="checkbox" name="schedule" value="C.T7" />
                                                {" C.T7"}
                                            </Label>
                                        </Col>
                                        <Col xl="1">
                                            <Label>
                                                <Field type="checkbox" name="schedule" value="S.CN" />
                                                {" S.CN"}
                                            </Label>
                                        </Col>
                                        <Col xl="1">
                                            <Label>
                                                <Field type="checkbox" name="schedule" value="C.CN" />
                                                {" C.CN"}
                                            </Label>
                                        </Col>
                                    </Row>
                                </FormGroup>


                            </Col>

                            <Col md="6" xl="6">


                                {/* Start Date */}
                                <FormGroup>
                                    <Label>Start Date</Label>
                                    <FastField
                                        type="date"
                                        bsSize="md"
                                        name="startDate"
                                        placeholder="Enter Start Date"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                                {/* Expect End Date*/}
                                <FormGroup>
                                    <Label> Expect End Date</Label>
                                    <FastField
                                        type="date"
                                        bsSize="md"
                                        name=" expectEndDate"
                                        placeholder="Enter Expect End Date"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>End Date</Label>
                                    <FastField
                                        type="date"
                                        bsSize="md"
                                        name=" endDate"
                                        placeholder="Enter End Date"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                                {/* Subject */}
                                <FormGroup>
                                    <Label>Subject</Label>
                                    <FastField
                                        bsSize="md"
                                        name="subject"
                                        placeholder="Enter level"
                                        defaultValue={subjectOptions[1]}
                                        options={subjectOptions}
                                        component={Select}
                                    />
                                </FormGroup>

                                {/* Lesson */}
                                <FormGroup>
                                    <Label>Lesson</Label>
                                    <FastField
                                        bsSize="md"
                                        name="lesson"
                                        placeholder="Enter Lesson"
                                        defaultValue={lessonOptions[1]}
                                        options={lessonOptions}
                                        component={Select}
                                    />
                                </FormGroup>

                                {/* Expect lesson */}
                                <FormGroup>
                                    <Label>
                                        Actual Lesson Total
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        bsSize="md"
                                        type="number"
                                        name="actualLessonTotal"
                                        placeholder="Enter Actual Lesson Total"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="12" xl="12">
                                {/* Status */}
                                <FormGroup>
                                    <Label>
                                        Status
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <Row>
                                        <Col xl="3">
                                            <Label>
                                                <Field type="radio" name="status" value="Not-Started" />
                                                {" Not-Started"}
                                            </Label>
                                        </Col>
                                        <Col xl="3">
                                            <Label>
                                                <Field type="radio" name="status" value="Active" />
                                                {" Active"}
                                            </Label>
                                        </Col>
                                        <Col xl="3">
                                            <Label>
                                                <Field type="radio" name="status" value="Merge" />
                                                {" Merge"}
                                            </Label>
                                        </Col>
                                        <Col xl="3">
                                            <Label>
                                                <Field type="radio" name="status" value="Completed" />
                                                {" Completed"}
                                            </Label>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>


                        </Row>

                    </CardBody>

                    <hr className="my-0" />
                    <Row>
                        <Col xl="6">
                            <CardBody>
                                <CardTitle tag="h5">Contacts</CardTitle>
                                {/*  Mentor Name */}
                                <FormGroup>
                                    <Label>
                                        Mentor Name
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        type="tel"
                                        bsSize="md"
                                        name="mentorName"
                                        placeholder="Enter Mentor Name"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                                {/* Facebook */}
                                <FormGroup>
                                    <Label>
                                        Facebook
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        bsSize="md"
                                        name="facebook"
                                        placeholder="Enter facebook link"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                            </CardBody>
                        </Col>
                        <Col xl="6">
                            <CardBody>
                                <CardTitle tag="h5">Tuition</CardTitle>

                                {/* Tuition per mentee */}
                                <FormGroup>
                                    <Label>
                                        Standard tuition total
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        bsSize="lg"
                                        type="number"
                                        name="standardTuitionTotal"
                                        placeholder="Enter standard tuition total(VND)"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                                {/* Tuition */}
                                <FormGroup>
                                    <Label>
                                        Actual tuition total
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        bsSize="lg"
                                        type="number"
                                        name="actualTuitionTotal"
                                        placeholder="Enter actual tuition total (VND)"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                            </CardBody>
                        </Col>
                    </Row>

                    <hr className="my-0" />
                    <Row>
                        <Col md="2" xl="2">
                        </Col>

                        <Col md="8" xl="8">
                            <FormGroup>
                                <Label>
                                    <Edit3 color='red' /> <span style={{ color: 'red' }}><strong>Note</strong></span>
                                </Label>
                                <FastField
                                    bsSize="lg"
                                    type="textarea"
                                    name="takeNote"
                                    placeholder="Let take a note for this class...."
                                    component={ReactstrapInput}
                                />

                            </FormGroup>
                        </Col>

                        <Col md="2" xl="2">
                        </Col>

                    </Row>
                </Form>
            )}
        </Formik >
    </Card >
}

export default WithAnimationFadeIn(UpdateBasicInformationClass);