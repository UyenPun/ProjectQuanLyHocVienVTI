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

import avatar2 from "../../../../assets/img/avatars/avatar-2.jpg";

import WithAnimationFadeIn from "../../../../components/animation/WithAnimationFadeIn";

const UpdateBasicInformationForm = (props) => {

    // mentee id
    let { id } = useParams();
    console.log("Mentee ID: " + id);

    const levelOptions = [
        { value: "IT", label: "IT" },
        { value: "NonIT", label: "NonIT" },
        { value: "Tester", label: "Tester" },
        { value: "AWS", label: "AWS" }
    ];

    const classOptions = [
        { value: "Rocket 09", label: "Rocket 09" },
        { value: "Railway 08", label: "Railway 08" },
        { value: "AWS 01", label: "AWS 01" }
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
                        <div className="card-actions float-right">
                            <Button color="primary" type="submit">
                                Save
                            </Button>
                        </div>
                        <CardTitle tag="h5" className="mb-0">
                            Update Profile
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className="text-center">
                            <img
                                src={avatar2}
                                alt="Nguyen Ngoc Duy"
                                className="img-fluid rounded-circle mb-2"
                                width="128"
                                height="128"
                            />
                            <CardTitle tag="h5" className="mb-0">
                                Nguyen Ngoc Duy
                            </CardTitle>
                            <br />
                        </div>

                        <Row>
                            <Col xl="6">
                                {/* Account */}
                                <FormGroup>
                                    <Label>
                                        Account
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        bsSize="md"
                                        name="account"
                                        placeholder="Enter account"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>
                            </Col>
                            <Col xl="6">
                                {/* Code */}
                                <FormGroup>
                                    <Label>
                                        Code
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        bsSize="md"
                                        name="code"
                                        placeholder="Enter code"
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
                                {/* First name */}
                                <FormGroup>
                                    <Label>
                                        Firstname
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        bsSize="md"
                                        name="firstName"
                                        placeholder="Enter first name"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                                {/* Gender */}
                                <FormGroup>
                                    <Label>
                                        Gender
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <Row>
                                        <Col xl="4">
                                            <Label>
                                                <Field type="radio" name="gender" value="Male" />
                                                {" Male"}
                                            </Label>
                                        </Col>
                                        <Col xl="4">
                                            <Label>
                                                <Field type="radio" name="gender" value="Female" />
                                                {" Female"}
                                            </Label>
                                        </Col>
                                        <Col xl="4">
                                            <Label>
                                                <Field type="radio" name="gender" value="Other" />
                                                {" Other"}
                                            </Label>
                                        </Col>
                                    </Row>
                                </FormGroup>

                                {/* School */}
                                <FormGroup style={{ marginTop: "18px" }} >
                                    <Label>School</Label>
                                    <FastField
                                        bsSize="md"
                                        name="school"
                                        placeholder="Enter high school or university"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                                {/* Home town */}
                                <FormGroup>
                                    <Label>Home Town</Label>
                                    <FastField
                                        bsSize="md"
                                        name="homeTown"
                                        placeholder="Enter home town"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6" xl="6">
                                {/* Last name */}
                                <FormGroup>
                                    <Label>
                                        Lastname
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        bsSize="md"
                                        name="lastName"
                                        placeholder="Enter last name"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                                {/* BirthDay */}
                                <FormGroup>
                                    <Label>Date Of Birth</Label>
                                    <FastField
                                        type="date"
                                        bsSize="md"
                                        name="dateOfbirth"
                                        placeholder="Enter date of birth"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                                {/* Current Address */}
                                <FormGroup>
                                    <Label>Current Address</Label>
                                    <FastField
                                        bsSize="md"
                                        name="currentAddress"
                                        placeholder="Enter current address"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                                {/* Current working location */}
                                <FormGroup>
                                    <Label>Current Working Location</Label>
                                    <FastField
                                        bsSize="md"
                                        name="currentWorkingLocation"
                                        placeholder="Enter current working location"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>

                    <hr className="my-0" />
                    <Row>
                        <Col xl="6">
                            <CardBody>
                                <CardTitle tag="h5">Contacts</CardTitle>
                                {/* Phone number */}
                                <FormGroup>
                                    <Label>
                                        Phone Number
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        type="tel"
                                        bsSize="md"
                                        name="phoneNumber"
                                        placeholder="Enter phone number"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                                {/* Email */}
                                <FormGroup>
                                    <Label>
                                        Email
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        type="email"
                                        bsSize="md"
                                        name="email"
                                        placeholder="Enter email"
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
                                <CardTitle tag="h5">Learning</CardTitle>
                                {/* Joined Date */}
                                <FormGroup>
                                    <Label>
                                        Joined Date
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        type="tel"
                                        bsSize="md"
                                        name="joinedDate"
                                        placeholder="Enter joined date"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>

                                {/* Level */}
                                <FormGroup>
                                    <Label >
                                        Level
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        bsSize="md"
                                        name="level"
                                        placeholder="Enter level"
                                        defaultValue={levelOptions[1]}
                                        options={levelOptions}
                                        component={Select}
                                    />
                                </FormGroup>

                                {/* Class */}
                                <FormGroup>
                                    <Label>
                                        Class
                                        <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <FastField
                                        bsSize="md"
                                        name="class"
                                        placeholder="Enter class"
                                        defaultValue={classOptions[1]}
                                        options={classOptions}
                                        component={Select}
                                    />
                                </FormGroup>

                                {/* Employment Status */}
                                <FormGroup>
                                    <Label>Employee Status</Label>
                                    <FastField
                                        type="text"
                                        bsSize="md"
                                        name="employmentStatus"
                                        placeholder="Enter status"
                                        component={ReactstrapInput}
                                    />
                                </FormGroup>
                            </CardBody>
                        </Col>
                    </Row>

                    <hr className="my-0" />
                    <CardBody>
                        <CardTitle tag="h5">Note</CardTitle>
                        {/* Note */}
                        <FormGroup>
                            <FastField
                                type="textarea"
                                bsSize="md"
                                name="note"
                                placeholder="Enter note"
                                component={ReactstrapInput}
                            />
                        </FormGroup>
                    </CardBody>
                </Form>
            )}
        </Formik >
    </Card >
}

export default WithAnimationFadeIn(UpdateBasicInformationForm);