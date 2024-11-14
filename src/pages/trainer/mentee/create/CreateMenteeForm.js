import React, { useState } from "react";
import {
    Button,
    Col,
    Container,
    Row,
    Card,
    CardBody,
    FormGroup,
    Label,
    Input
} from "reactstrap";

import { ReactstrapInput } from "reactstrap-formik";
import { FastField, Form, Formik, Field, ErrorMessage } from "formik";
import UsernameField from "../../../../components/formik/UsernameField";
import CustomErrorMessage from "../../../../components/formik/CustomErrorMessage";
import NumberFormat from 'react-number-format';
import * as Yup from 'yup';
import Select from "react-select";
import AsyncSelect from 'react-select/async';

import PromptPopup from "../../../../components/formik/PromptPopup";

import UserApi from "../../../../api/UserApi";
import MenteeApi from "../../../../api/trainer/MenteeApi";
import ClassApi from "../../../../api/trainer/ClassApi";
import { showSuccessNotification } from "../../../../utils/Notification";

const CreateMenteeForm = (props) => {

    const loadClassOptions = async () => {
        const result = await ClassApi.getAllActiveOrNotStartedClasses();
        return result;
    }

    const [paymentTypeOptions, setPaymentTypeOptions] = useState([]);
    const changePaymentTypeOption = (clazzOption, setFieldValue) => {
        // reset choose
        setFieldValue("paymentType", "");

        // reset options
        setPaymentTypeOptions(clazzOption.course.payments);
    }

    return <Container fluid className="p-0">
        <h1 className="h3 mb-3">Create Mentee</h1>

        <Card>
            <CardBody>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        dateOfBirth: "",
                        gender: 'male',
                        username: '',
                        code: '',
                        school: '',
                        currentAddress: '',
                        homeTown: '',
                        currentWorkingLocation: '',

                        phoneNumber: '',
                        email: '',
                        facebookLink: '',

                        clazz: '',
                        course: '',
                        standardTuition: '',
                        paymentType: '',
                        payableTuition: '',
                        paiedTuition: '',
                        note: ''
                    }}

                    validationSchema={
                        Yup.object({
                            firstName: Yup.string()
                                .min(2, 'Must be between 2 and 100 characters')
                                .max(100, 'Must be between 2 and 100 characters')
                                .required('Required'),

                            lastName: Yup.string()
                                .min(2, 'Must be between 2 and 100 characters')
                                .max(100, 'Must be between 2 and 100 characters')
                                .required('Required'),

                            dateOfBirth: Yup.date()
                                .min(new Date(1970, 10, 10), 'Must be greater than 1970')
                                .max(new Date(Date.now()), 'Must be less than now')
                                .required('Required'),

                            username: Yup.string()
                                .min(6, 'Must be between 6 and 100 characters')
                                .max(100, 'Must be between 6 and 100 characters')
                                .required('Required')
                                .test('checkUniqueUsername', 'This username is already registered.', async username => {
                                    // call api
                                    const isExists = await UserApi.existsByUsername(username);
                                    return !isExists;
                                }),

                            code: Yup.string()
                                .min(6, 'Must be between 6 and 100 characters')
                                .max(100, 'Must be between 6 and 100 characters')
                                .required('Required')
                                .test('checkUniqueCode', 'This code is already registered.', async code => {
                                    // call api
                                    const isExists = await MenteeApi.existsByCode(code);
                                    return !isExists;
                                }),

                            school: Yup.string()
                                .max(100, 'Must be less than 100 characters'),

                            currentAddress: Yup.string()
                                .max(100, 'Must be less than 100 characters'),

                            homeTown: Yup.string()
                                .max(100, 'Must be less than 100 characters'),

                            currentWorkingLocation: Yup.string()
                                .max(100, 'Must be less than 100 characters'),

                            phoneNumber: Yup.string()
                                .matches(/^(\\+)|((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                                    'Phone number is not valid')
                                .max(100, 'Must be less than 100 characters')
                                .required('Required')
                                .test('checkUniquePhoneNumber', 'This phone number is already registered.', async phoneNumber => {
                                    // call api
                                    const isExists = await UserApi.existsByPhoneNumber(phoneNumber);
                                    return !isExists;
                                }),

                            email: Yup.string()
                                .email()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required')
                                .test('checkUniqueEmail', 'This email is already registered.', async email => {
                                    // call api
                                    const isExists = await UserApi.existsByEmail(email);
                                    return !isExists;
                                }),

                            facebookLink: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required'),

                            clazz: Yup.object()
                                .required('Required'),

                            paymentType: Yup.object()
                                .required('Required'),

                            payableTuition: Yup.number()
                                .min(0, 'Must be greater than or equal 0')
                                .required('Required'),

                            paiedTuition: Yup.number()
                                .min(0, 'Must be greater than or equal 0')
                                .required('Required'),

                            note: Yup.string()
                                .max(500, 'Must be less than 500 characters')
                        })
                    }

                    onSubmit={
                        async values => {
                            try {
                                // call API
                                await MenteeApi.create(
                                    values.firstName, values.lastName, values.dateOfBirth, values.gender, values.username,
                                    values.school, values.currentAddress, values.homeTown, values.currentWorkingLocation,
                                    values.phoneNumber, values.email, values.facebookLink,
                                    values.clazz.id, values.code, values.paymentType.id, values.payableTuition, values.paiedTuition,
                                    values.note
                                );
                                // show notification
                                showSuccessNotification(
                                    "Create Mentee",
                                    "Create Mentee Successfully!"
                                );
                                props.history.push("/mentees");
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                >
                    {({ values, isSubmitting, setFieldValue }) => (
                        <Form>
                            <PromptPopup />
                            <h4>Basic Informations</h4>
                            <br />
                            <Row>
                                <Col md="6" xl="6">
                                    {/* First name */}
                                    <FormGroup>
                                        <Label>
                                            Firstname
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="firstName"
                                            placeholder="Enter first name"
                                            autoFocus
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>

                                    {/* Last name */}
                                    <FormGroup>
                                        <Label>
                                            Lastname
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="lastName"
                                            placeholder="Enter last name"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>

                                    {/* BirthDay */}
                                    <FormGroup>
                                        <Label>
                                            Date Of Birth
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            type="date"
                                            bsSize="lg"
                                            name="dateOfBirth"
                                            placeholder="Enter date of birth"
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
                                            <Col xl="3">
                                                <Label>
                                                    <Field type="radio" name="gender" value="male" />
                                                    {" Male"}
                                                </Label>
                                            </Col>
                                            <Col xl="3">
                                                <Label>
                                                    <Field type="radio" name="gender" value="female" />
                                                    {" Female"}
                                                </Label>
                                            </Col>
                                            <Col xl="3">
                                                <Label>
                                                    <Field type="radio" name="gender" value="other" />
                                                    {" Other"}
                                                </Label>
                                            </Col>
                                        </Row>
                                    </FormGroup>

                                    {/* Username */}
                                    <FormGroup>
                                        <Label>
                                            Username
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <UsernameField
                                            bsSize="lg"
                                            name="username"
                                            placeholder="Enter username"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md="6" xl="6">
                                    {/* School */}
                                    <FormGroup >
                                        <Label>School</Label>
                                        <FastField
                                            bsSize="lg"
                                            name="school"
                                            placeholder="Ex: UET University, Nam Truc Highschool"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>

                                    {/* Current Address */}
                                    <FormGroup>
                                        <Label>Current Address</Label>
                                        <FastField
                                            bsSize="lg"
                                            name="currentAddress"
                                            placeholder="Enter current address"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>

                                    {/* Home town */}
                                    <FormGroup>
                                        <Label>Home Town</Label>
                                        <FastField
                                            bsSize="lg"
                                            name="homeTown"
                                            placeholder="Ex: Nam Dinh"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>

                                    {/* Current working location */}
                                    <FormGroup>
                                        <Label>Current Working Location</Label>
                                        <FastField
                                            bsSize="lg"
                                            name="currentWorkingLocation"
                                            placeholder="Ex: VTI Company"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr />

                            <Row>
                                <Col md="6" xl="6">
                                    <h4>Contacts</h4>
                                    <br />
                                    {/* Phone number */}
                                    <FormGroup>
                                        <Label>
                                            Phone Number
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            type="tel"
                                            bsSize="lg"
                                            name="phoneNumber"
                                            placeholder="Ex: 033 278 2798"
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
                                            bsSize="lg"
                                            name="email"
                                            placeholder="Ex: duy.nguyenngoc1@vti.com.vn"
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
                                            bsSize="lg"
                                            name="facebookLink"
                                            placeholder="Ex: https://www.facebook.com/duynn2012"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6" xl="6">
                                    <h4>Learning & Tuition</h4>
                                    <br />
                                    {/* Class */}
                                    <FormGroup>
                                        <Label>
                                            Class
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="clazz"
                                            placeholder="Enter class"
                                            loadOptions={loadClassOptions}
                                            cacheOptions
                                            defaultOptions
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={clazz => {
                                                setFieldValue("clazz", clazz);
                                                setFieldValue("course", clazz.course.name);
                                                setFieldValue("code", clazz.course.suggestMenteeCode);
                                                setFieldValue("standardTuition", clazz.course.standardTuition);
                                                changePaymentTypeOption(clazz, setFieldValue);
                                                setFieldValue("payableTuition", "");
                                            }}
                                            component={AsyncSelect}
                                        />
                                        <ErrorMessage name="clazz" component={CustomErrorMessage} />
                                    </FormGroup>

                                    {/* Course */}
                                    <FormGroup>
                                        <Label >
                                            Course
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="course"
                                            disabled
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>

                                    {/* Code */}
                                    <FormGroup>
                                        <Label>
                                            Code
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="code"
                                            placeholder="Enter code"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>

                                    {/* Startdard tuition */}
                                    <FormGroup>
                                        <Label>
                                            Standard Tuition
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <NumberFormat
                                            thousandSeparator={true}
                                            suffix={' VNĐ'}
                                            value={values.standardTuition}
                                            onValueChange={(values) => {
                                                const { value } = values;
                                                setFieldValue("standardTuition", value)
                                            }}
                                            bsSize="lg"
                                            placeholder="Enter standard tuition"
                                            disabled
                                            customInput={Input}
                                        />
                                        <ErrorMessage name="standardTuition" component={CustomErrorMessage} />
                                    </FormGroup>

                                    {/* Payment Type */}
                                    <FormGroup>
                                        <Label>
                                            Payment Type
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <Select
                                            size="lg"
                                            value={values.paymentType}
                                            name="paymentType"
                                            placeholder="Enter payment type"
                                            options={paymentTypeOptions}
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => {
                                                if (option.type === 0) {
                                                    return "Free";
                                                }
                                                return `${option.type} Times`;
                                            }}
                                            onChange={option => {
                                                setFieldValue("paymentType", option);
                                                setFieldValue("payableTuition", option.payableTuition);
                                            }}
                                        />
                                        <ErrorMessage name="paymentType" component={CustomErrorMessage} />
                                    </FormGroup>

                                    {/* Payable tuition */}
                                    <FormGroup>
                                        <Label>
                                            Payable Tuition
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <NumberFormat
                                            thousandSeparator={true}
                                            suffix={' VNĐ'}
                                            value={values.payableTuition}
                                            onValueChange={(values) => {
                                                const { value } = values;
                                                setFieldValue("payableTuition", value)
                                            }}
                                            bsSize="lg"
                                            placeholder="Enter payable tuition"
                                            customInput={Input}
                                        />
                                        <ErrorMessage name="payableTuition" component={CustomErrorMessage} />
                                    </FormGroup>

                                    {/* Paied tuition */}
                                    <FormGroup>
                                        <Label>
                                            Paied Tuition
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <NumberFormat
                                            thousandSeparator={true}
                                            suffix={' VNĐ'}
                                            value={values.paiedTuition}
                                            onValueChange={(values) => {
                                                const { value } = values;
                                                setFieldValue("paiedTuition", value)
                                            }}
                                            bsSize="lg"
                                            placeholder="Enter paied tuition"
                                            customInput={Input}
                                        />
                                        <ErrorMessage name="paiedTuition" component={CustomErrorMessage} />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <br />
                            <hr />
                            <Row>
                                <Col md="12" xl="12">
                                    <h4>Note</h4>
                                    {/* Note */}
                                    <FastField
                                        type="textarea"
                                        bsSize="lg"
                                        name="note"
                                        placeholder="Enter note"
                                        component={ReactstrapInput}
                                    />
                                </Col>
                            </Row>
                            <hr />

                            <Button type="submit" color="primary" disabled={isSubmitting}>Submit</Button>
                        </Form>
                    )}
                </Formik >
            </CardBody>
        </Card>
    </Container >
}


export default CreateMenteeForm;
