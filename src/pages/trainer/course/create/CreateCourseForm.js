import React from "react";
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
import { PlusCircle, X } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { ReactstrapInput } from "reactstrap-formik";
import { FastField, FieldArray, Form, Formik, ErrorMessage } from "formik";
import AsyncSelect from 'react-select/async';
import NumberFormat from 'react-number-format';
import CustomErrorMessage from "../../../../components/formik/CustomErrorMessage";
import * as Yup from 'yup';

import PromptPopup from "../../../../components/formik/PromptPopup";
import { showSuccessNotification } from "../../../../utils/Notification";

import CourseApi from "../../../../api/trainer/CourseApi";
import SubjectApi from "../../../../api/trainer/SubjectApi";

import { hasSpecialCharacters } from "../../../../utils/Utils";

const CreateCourseForm = (props) => {

    const loadSubjectsOptions = async (value, callback) => {
        if (value && !hasSpecialCharacters(value[value.length - 1])) {
            return;
        } else {
            const result = await SubjectApi.getAll(1, 5, null, null, value);
            if (value) {
                callback(result.content);
            } else {
                return result.content;
            }
        }
    }

    return <Container fluid className="p-0">
        <h1 className="h3 mb-3">Create Course</h1>

        <Card>
            <CardBody>
                <Formik
                    initialValues={{
                        classCode: '',
                        menteeCode: '',
                        name: '',
                        note: '',

                        standardTuition: '',

                        payments: [
                            {
                                type: '',
                                payableTuition: '',
                            }
                        ],

                        subjects: [],
                    }}

                    validationSchema={
                        Yup.object({
                            name: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required')
                                .test('checkUniqueName', 'This name is already registered.', async name => {
                                    // call api
                                    const isExists = await CourseApi.existsByName(name);
                                    return !isExists;
                                }),

                            classCode: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required'),

                            menteeCode: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required'),

                            standardTuition: Yup.number()
                                .min(0, 'Must be greater than or equal 0')
                                .required('Required'),

                            payments: Yup.array().of(
                                Yup.object().shape({
                                    type: Yup.number()
                                        .min(0, 'Must be greater than or equal 0')
                                        .required('Required'),

                                    payableTuition: Yup.number()
                                        .min(0, 'Must be greater than or equal 0')
                                        .required('Required'),
                                })
                            ),

                            subjects: Yup.array().of(
                                Yup.object().shape({
                                    id: Yup.number()
                                        .required('Required')
                                })
                            ),

                            note: Yup.string()
                                .max(500, 'Must be less than 500 characters')
                        })
                    }
                    onSubmit={
                        async values => {
                            try {
                                // call API
                                await CourseApi.create(
                                    values.name,
                                    values.classCode,
                                    values.menteeCode,
                                    values.note,
                                    values.standardTuition,
                                    values.payments,
                                    !values.subjects || values.subjects.length === 0
                                        ? []
                                        : values.subjects.map(subject => subject.id));
                                // show notification
                                showSuccessNotification(
                                    "Create Course",
                                    "Create Course Successfully!"
                                );
                                props.history.push("/courses");
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
                            <Row>
                                <Col md="6" xl="6">
                                    <h4>Basic Informations</h4>
                                    <br />
                                    {/* Name */}
                                    <FormGroup>
                                        <Label>
                                            Name
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="name"
                                            placeholder="Enter name"
                                            autoFocus
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>

                                    {/* Class Code */}
                                    <FormGroup>
                                        <Label>
                                            Class Code
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="classCode"
                                            placeholder="Enter code"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>

                                    {/* Mentee Code */}
                                    <FormGroup>
                                        <Label>
                                            Mentee Code
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="menteeCode"
                                            placeholder="Enter code"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="6" xl="6">
                                    <h4>Tuition</h4>
                                    <br />

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
                                            customInput={Input}
                                        />
                                        <ErrorMessage name="standardTuition" component={CustomErrorMessage} />
                                    </FormGroup>

                                    <FieldArray
                                        name="payments"
                                        render={arrayHelpers => (
                                            <div>
                                                {values.payments.map((payment, index) => (
                                                    <Row key={index}>
                                                        <Col md="4" xl="4">
                                                            {/* payment type */}
                                                            <FormGroup>
                                                                <Label>
                                                                    Payment Type
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </Label>
                                                                <NumberFormat
                                                                    thousandSeparator={true}
                                                                    value={values.payments[index].type}
                                                                    onValueChange={(values) => {
                                                                        const { value } = values;
                                                                        setFieldValue("payments[" + index + "].type", value)
                                                                    }}
                                                                    bsSize="lg"
                                                                    placeholder="Enter type"
                                                                    customInput={Input}
                                                                />
                                                                <ErrorMessage name={"payments[" + index + "].type"} component={CustomErrorMessage} />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="6" xl="6">
                                                            {/* Payable tuition */}
                                                            <FormGroup>
                                                                <Label>
                                                                    Payable Tuition
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </Label>
                                                                <NumberFormat
                                                                    thousandSeparator={true}
                                                                    suffix={' VNĐ'}
                                                                    value={values.payments[index].payableTuition}
                                                                    onValueChange={(values) => {
                                                                        const { value } = values;
                                                                        setFieldValue("payments[" + index + "].payableTuition", value)
                                                                    }}
                                                                    bsSize="lg"
                                                                    placeholder="Enter payable tuition"
                                                                    customInput={Input}
                                                                />
                                                                <ErrorMessage name={"payments[" + index + "].payableTuition"} component={CustomErrorMessage} />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="2" xl="2">
                                                            {index === 0 &&
                                                                <Button
                                                                    color="primary"
                                                                    className="shadow-sm mr-1"
                                                                    onClick={
                                                                        () => arrayHelpers.insert(values.payments.length, {
                                                                            type: '',
                                                                            payableTuition: '',
                                                                        })}
                                                                >
                                                                    <PlusCircle size={24} className="feather" />
                                                                </Button>}

                                                            {index !== 0 &&
                                                                <Button
                                                                    className="shadow-sm mr-1"
                                                                    onClick={
                                                                        () => arrayHelpers.remove(index)}
                                                                >
                                                                    <X size={24} className="feather" />
                                                                </Button>}
                                                        </Col>
                                                    </Row>
                                                ))}
                                            </div>
                                        )}
                                    />
                                </Col>
                            </Row>
                            <hr />

                            <Row>
                                <Col md="12" xl="12">
                                    <h4>Subjects</h4>
                                    <br />
                                </Col>

                                <Col md="6" xl="6">
                                    {/* subjects */}
                                    <FieldArray
                                        name="subjects"
                                        render={arrayHelpers => (
                                            <div>
                                                <Button color="primary" onClick={
                                                    () => arrayHelpers.insert(values.subjects.length, {
                                                        id: "",
                                                        name: "",
                                                        version: ""
                                                    })
                                                }>
                                                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                                                    Add
                                                </Button>
                                                {" "}
                                                <small>
                                                    {values.subjects.length === 0
                                                        ? "Choose subjects"
                                                        : values.subjects.length + " subjects"
                                                    }
                                                </small>
                                                <br />

                                                {values.subjects.map((subject, index) => (
                                                    <Row key={index} style={{ marginTop: 12 }}>
                                                        <Col md="10" xl="10">
                                                            <FormGroup>
                                                                <Label>
                                                                    {`Subject ${index < 10 ? `0${(index + 1)}` : (index + 1)}`}
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </Label>

                                                                <FastField
                                                                    bsSize="lg"
                                                                    name={`subjects[${index}]`}
                                                                    placeholder="Enter subject"
                                                                    loadOptions={loadSubjectsOptions}
                                                                    cacheOptions
                                                                    defaultOptions
                                                                    getOptionValue={option => option.id}
                                                                    getOptionLabel={option => `${option.name} (${option.version})`}
                                                                    onChange={option => setFieldValue(`subjects[${index}]`, option)}
                                                                    component={AsyncSelect}
                                                                />
                                                                <ErrorMessage name={"subjects[" + index + "].id"} component={CustomErrorMessage} />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="2" xl="2">
                                                            <Button
                                                                className="shadow-sm mr-1"
                                                                onClick={
                                                                    () => arrayHelpers.remove(index)}
                                                            >
                                                                <X size={24} className="feather" />
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                ))}
                                            </div>
                                        )}
                                    />
                                </Col>
                                <Col md="6" xl="6">
                                    <Label>Subject:
                                        {` ${values.subjects.filter(subject => {
                                            return subject.id;
                                        }).length}`}
                                    </Label>
                                    <br />
                                    <Label>Lesson:
                                        {` ${values.subjects.reduce((total, subject) => {
                                            if (subject.totalLesson) {
                                                return total + subject.totalLesson
                                            };
                                            return total;
                                        }, 0)}`}
                                    </Label>
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
export default CreateCourseForm;