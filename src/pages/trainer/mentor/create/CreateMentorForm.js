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

import { FastField, Form, Formik, Field, ErrorMessage } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import UsernameField from "../../../../components/formik/UsernameField";
import CustomErrorMessage from "../../../../components/formik/CustomErrorMessage";
import NumberFormat from 'react-number-format';
import * as Yup from 'yup';

import Select from "react-select";
import AsyncSelect from 'react-select/async';

import PromptPopup from "../../../../components/formik/PromptPopup";

import UserApi from "../../../../api/UserApi";
import MentorApi from "../../../../api/trainer/MentorApi";
import SubjectApi from "../../../../api/trainer/SubjectApi";
import ClassApi from "../../../../api/trainer/ClassApi";

import { showSuccessNotification } from "../../../../utils/Notification";


const CreateMentorForm = (props) => {

    const typeOptions = [
        { value: "Internal", label: "Internal" },
        { value: "External", label: "External" }
    ];

    const loadTeachableSubjectOptions = async () => {
        const result = await SubjectApi.getAllTeachableSubjects();
        return result;
    }

    const loadClassOptions = async () => {
        const result = await ClassApi.getAllactiveClassesAndActiveSubjects();
        return result;
    }

    const [subjectOptions, setSubjectOptions] = useState([]);
    const changeSubjectOptions = (clazzOption, setFieldValue) => {
        // reset choose
        setFieldValue("subjects", "");

        // reset options
        setSubjectOptions(clazzOption.unassignedSubjects);
    }

    return <Container fluid className="p-0">
        <h1 className="h3 mb-3">Create Mentor</h1>

        <Card>
            <CardBody>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        dateOfBirth: "",
                        gender: 'male',
                        username: '',
                        school: '',
                        currentAddress: '',
                        homeTown: '',
                        currentWorkingLocation: '',

                        phoneNumber: '',
                        email: '',
                        facebookLink: '',

                        type: typeOptions[1],
                        teachableSubjects: [],
                        hourlySalary: '',
                        clazz: '',
                        subjects: [],

                        bankName: '',
                        accountNumber: '',
                        bankAccountName: '',
                        taxNumber: '',
                        taxAddress: '',
                        identifyNumber: '',
                        identifyDate: '',
                        identifyPlace: '',
                        permanentAddress: '',
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

                            type: Yup.object()
                                .required('Required'),

                            teachableSubjects: Yup.array()
                                .min(1, 'Required'),

                            hourlySalary: Yup.number()
                                .min(0, 'Must be greater than 0')
                                .required('Required'),

                            clazz: Yup.object()
                                .required('Required'),

                            subjects: Yup.array()
                                .min(1, 'Required'),

                            bankName: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required'),

                            accountNumber: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required'),

                            bankAccountName: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required'),

                            taxNumber: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required'),

                            taxAddress: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required'),

                            identifyNumber: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required')
                                .test('checkUniqueIdentifyNumber', 'This number is already registered.', async identifyNumber => {
                                    // call api
                                    const isExists = await UserApi.existsByIdentifyNumber(identifyNumber);
                                    return !isExists;
                                }),

                            identifyDate: Yup.date()
                                .min(new Date(1970, 10, 10), 'Must be greater than 1970')
                                .max(new Date(Date.now()), 'Must be less than now')
                                .required('Required'),

                            identifyPlace: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required'),

                            permanentAddress: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required'),

                            note: Yup.string()
                                .max(500, 'Must be less than 500 characters')
                        })
                    }
                    onSubmit={
                        async values => {
                            try {
                                // call API
                                await MentorApi.create(
                                    values.firstName, values.lastName, values.dateOfBirth, values.gender, values.username,
                                    values.school, values.currentAddress, values.homeTown, values.currentWorkingLocation,
                                    values.phoneNumber, values.email, values.facebookLink,
                                    values.type.value, values.teachableSubjects.map(subject => subject.id), values.hourlySalary, values.clazz.id, values.subjects.map(subject => subject.id),
                                    values.bankName, values.accountNumber, values.bankAccountName, values.taxNumber, values.taxAddress, values.identifyNumber, values.identifyDate, values.identifyPlace, values.permanentAddress,
                                    values.note
                                );
                                // show notification
                                showSuccessNotification(
                                    "Create Mentor",
                                    "Create Mentor Successfully!"
                                );
                                props.history.push("/mentors");
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    validateOnChange={false}
                    validateOnBlur={false}
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

                                    <br />
                                    <h4 style={{ marginTop: 11 }}>Teaching Information</h4>
                                    <br />
                                    {/* Type */}
                                    <FormGroup>
                                        <Label>
                                            Type
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <Select
                                            size="lg"
                                            value={values.type}
                                            name="type"
                                            placeholder="Enter type"
                                            options={typeOptions}
                                            getOptionValue={option => option.value}
                                            getOptionLabel={option => option.label}
                                            onChange={option => setFieldValue("type", option)}
                                        />
                                    </FormGroup>

                                    {/* Teachable Subjects */}
                                    <FormGroup>
                                        <Label>
                                            Teachable Subjects
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="teachableSubjects"
                                            placeholder="Enter teachable subjects"
                                            loadOptions={loadTeachableSubjectOptions}
                                            cacheOptions
                                            defaultOptions
                                            isMulti
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => `${option.name} (${option.version})`}
                                            onChange={subject => setFieldValue("teachableSubjects", subject)}
                                            component={AsyncSelect}
                                        />
                                        <ErrorMessage name="teachableSubjects" component={CustomErrorMessage} />
                                    </FormGroup>

                                    {/* Hourly salary */}
                                    <FormGroup>
                                        <Label>
                                            Hourly salary
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <NumberFormat
                                            thousandSeparator={true}
                                            suffix={' VNĐ'}
                                            value={values.hourlySalary}
                                            onValueChange={(values) => {
                                                const { value } = values;
                                                setFieldValue("hourlySalary", value)
                                            }}
                                            bsSize="lg"
                                            placeholder="Enter hourly salary"
                                            customInput={Input}
                                        />
                                        <ErrorMessage name="hourlySalary" component={CustomErrorMessage} />
                                    </FormGroup>

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
                                                changeSubjectOptions(clazz, setFieldValue);
                                            }}
                                            component={AsyncSelect}
                                        />
                                        <ErrorMessage name="clazz" component={CustomErrorMessage} />
                                    </FormGroup>

                                    {/* Subject */}
                                    <FormGroup>
                                        <Label>
                                            Subjects
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <Select
                                            size="lg"
                                            value={values.subjects}
                                            name="subjects"
                                            placeholder="Enter subjects"
                                            options={subjectOptions}
                                            isMulti
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={option => setFieldValue("subjects", option)}
                                        />
                                        <ErrorMessage name="subjects" component={CustomErrorMessage} />
                                    </FormGroup>
                                </Col>

                                <Col md="6" xl="6">
                                    <h4>Payments</h4>
                                    <br />
                                    {/* Bank Name*/}
                                    <FormGroup>
                                        <Label>
                                            Bank Name
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="bankName"
                                            placeholder="Ex: TP Bank Hà Nội"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>
                                    {/* Account Number  */}
                                    <FormGroup>
                                        <Label>
                                            Account Number
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="accountNumber"
                                            placeholder="Ex: 0016 1882 001"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>
                                    {/* Bank Account Name  */}
                                    <FormGroup>
                                        <Label>
                                            Bank Account Name
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="bankAccountName"
                                            placeholder="Ex: Nguyễn Ngọc Duy"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>
                                    {/* Tax Number */}
                                    <FormGroup>
                                        <Label>
                                            Tax Number
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="taxNumber"
                                            placeholder="Ex: 8380153491"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>
                                    {/* Tax Address */}
                                    <FormGroup>
                                        <Label>
                                            Tax Address
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="taxAddress"
                                            placeholder="Ex: VTI"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>
                                    {/* Identify Number */}
                                    <FormGroup>
                                        <Label>
                                            Identify Number
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="identifyNumber"
                                            placeholder="Ex: 163333930"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>
                                    {/* Identify Date */}
                                    <FormGroup>
                                        <Label>
                                            Identify Date
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            type="date"
                                            bsSize="lg"
                                            name="identifyDate"
                                            placeholder="Ex: 07/07/2012"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>
                                    {/* Identify Place */}
                                    <FormGroup>
                                        <Label>
                                            Identify Place
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="identifyPlace"
                                            placeholder="Ex: Tỉnh Nam Định"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>
                                    {/* Permanent Address */}
                                    <FormGroup>
                                        <Label>
                                            Permanent Address
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="permanentAddress"
                                            placeholder="Ex: TT Nam Giang, Nam Trực, Nam Định"
                                            component={ReactstrapInput}
                                        />
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
export default CreateMentorForm;