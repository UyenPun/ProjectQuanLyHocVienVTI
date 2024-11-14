import React from "react";

import {
    Button,
    Col,
    Row,
    FormGroup,
    Label,
    Input
} from "reactstrap";

import { PlusCircle, X } from "react-feather";

import { FieldArray, FastField, Form, Formik, ErrorMessage } from "formik";
import Select from "react-select";
import AsyncSelect from 'react-select/async';
import CustomErrorMessage from "../../../../components/formik/CustomErrorMessage";
import * as Yup from 'yup';

import PromptPopup from "../../../../components/formik/PromptPopup";

import DocumentApi from "../../../../api/trainer/DocumentApi";

import { hasSpecialCharacters } from "../../../../utils/Utils";

const LessonForm = (props) => {

    const typeOptions = [
        { value: "Compulsory", label: "Compulsory Lesson" },
        { value: "Optional", label: "Optional Lesson" }
    ];

    const teachingMethodOptions = [
        {
            id: 1,
            name: 'Concept/Lecture'
        },
        {
            id: 2,
            name: 'Assignment/Lab'
        },
        {
            id: 3,
            name: 'Guides/Review'
        },
        {
            id: 4,
            name: 'Exam'
        }
    ];

    const loadDocumentOptions = (type) => {
        return async (value, callback) => {
            if (value && !hasSpecialCharacters(value[value.length - 1])) {
                return;
            } else {
                const result = await DocumentApi.getAll(1, 5, null, null, value, type);
                if (value) {
                    callback(result.content);
                } else {
                    return result.content;
                }
            }
        }
    }

    let choose;

    const prev = (submitForm) => {
        choose = "prev";
        submitForm();
    }

    const next = (submitForm) => {
        choose = "next";
        submitForm();
    }

    const finish = (submitForm) => {
        choose = "finish";
        submitForm();
    }

    return (
        <Formik
            initialValues={{
                type: props.lesson.type,
                schedules: props.lesson.schedules,
                document: props.lesson.document,
                extraDocument: props.lesson.extraDocument
            }}
            validationSchema={
                Yup.object({
                    schedules: Yup.array().of(
                        Yup.object().shape({
                            content: Yup.string()
                                .max(200, 'Must be less than 200 characters')
                                .required('Required'),

                            teachingMethod: Yup.object()
                                .required('Required'),

                            duration: Yup.number()
                                .min(0, 'Must be greater than or equal 0')
                                .required('Required'),
                        })
                    )
                })
            }
            onSubmit={
                async (values) => {
                    switch (choose) {
                        case "prev":
                            props.prevLesson(values);
                            break;
                        case "next":
                            props.nextLesson(values);
                            break;
                        case "finish":
                            props.finishLesson(values);
                            break;
                        default:
                            break;
                    }

                    if (choose !== "finish") {
                        window.scrollTo(0, 0);
                    }
                }
            }
            enableReinitialize
            validateOnChange={false}
            validateOnBlur={false}
        >
            {({ values, isSubmitting, submitForm, setFieldValue }) => (
                <Form>
                    <PromptPopup />
                    <h4>Lesson {" "}
                        {props.currentLesson < 9 ?
                            ("0" + (props.currentLesson + 1))
                            : (props.currentLesson + 1)}
                    </h4>
                    <br />

                    <Row>
                        <Col md="4" xl="4">
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
                                    options={typeOptions}
                                    defaultOptions
                                    getOptionValue={option => option.value}
                                    getOptionLabel={option => option.label}
                                    onChange={option => setFieldValue("type", option)}
                                />
                                <ErrorMessage name="type" component={CustomErrorMessage} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <br />
                    <h5>Schedule</h5>
                    <FieldArray
                        name="schedules"
                        render={arrayHelpers => (
                            <div>
                                {values.schedules.map((schedule, index) => (
                                    <Row key={index}>
                                        <Col md="4" xl="4">
                                            {/* Content */}
                                            <FormGroup>
                                                <Label>
                                                    Content
                                                    <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <FastField
                                                    value={values.schedules[index].content}
                                                    bsSize="lg"
                                                    name={`schedules[${index}].content`}
                                                    onChange={e => setFieldValue(`schedules[${index}].content`, e.target.value)}
                                                    placeholder="Enter content"
                                                    component={Input}
                                                />
                                                <ErrorMessage name={`schedules[${index}].content`} component={CustomErrorMessage} />
                                            </FormGroup>
                                        </Col>

                                        <Col md="3" xl="3">
                                            {/* Teaching Method */}
                                            <FormGroup>
                                                <Label>
                                                    Teaching Method
                                                    <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <Select
                                                    size="lg"
                                                    value={values.schedules[index].teachingMethod}
                                                    name={"schedules[" + index + "].teachingMethod"}
                                                    placeholder="Enter teaching method"
                                                    options={teachingMethodOptions}
                                                    getOptionValue={option => option.id}
                                                    getOptionLabel={option => option.name}
                                                    onChange={option => setFieldValue("schedules[" + index + "].teachingMethod", option)}
                                                />
                                                <ErrorMessage name={"schedules[" + index + "].teachingMethod"} component={CustomErrorMessage} />
                                            </FormGroup>
                                        </Col>

                                        <Col md="3" xl="3">
                                            {/* Duration */}
                                            <FormGroup>
                                                <Label>
                                                    Duration
                                                    <span style={{ color: "red" }}>*</span>
                                                </Label>
                                                <FastField
                                                    value={values.schedules[index].duration}
                                                    type="number"
                                                    bsSize="lg"
                                                    name={"schedules[" + index + "].duration"}
                                                    onChange={e => setFieldValue(`schedules[${index}].duration`, e.target.value)}
                                                    placeholder="Enter duration"
                                                    component={Input}
                                                />
                                                <ErrorMessage name={"schedules[" + index + "].duration"} component={CustomErrorMessage} />
                                            </FormGroup>
                                        </Col>

                                        <Col md="2" xl="2">
                                            {index === 0 &&
                                                <Button
                                                    color="primary"
                                                    className="shadow-sm mr-1"
                                                    onClick={
                                                        () => arrayHelpers.insert(values.schedules.length, {
                                                            content: '',
                                                            teachingMethod: '',
                                                            duration: ''
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

                    <hr />
                    <br />
                    <Row>
                        <Col md="6" xl="6">
                            <h5>Document</h5>
                            {/* Slide */}
                            <FormGroup>
                                <Label>Slides</Label>

                                <FastField
                                    bsSize="lg"
                                    value={values.document.slides}
                                    name="document.slides"
                                    placeholder="Enter slides"
                                    loadOptions={loadDocumentOptions("slides")}
                                    cacheOptions
                                    defaultOptions
                                    isMulti
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                    onChange={option => setFieldValue("document.slides", option)}
                                    component={AsyncSelect}
                                />
                                <ErrorMessage name="document.slides" component={CustomErrorMessage} />
                            </FormGroup>

                            {/* Knowledge */}
                            <FormGroup>
                                <Label>Knowledges</Label>
                                <FastField
                                    bsSize="lg"
                                    value={values.document.knowledges}
                                    name="document.knowledges"
                                    placeholder="Enter knowledges"
                                    loadOptions={loadDocumentOptions("knowledges")}
                                    cacheOptions
                                    defaultOptions
                                    isMulti
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                    onChange={option => setFieldValue("document.knowledges", option)}
                                    component={AsyncSelect}
                                />
                                <ErrorMessage name="document.knowledges" component={CustomErrorMessage} />
                            </FormGroup>

                            {/* Recording */}
                            <FormGroup>
                                <Label>Recordings</Label>
                                <FastField
                                    bsSize="lg"
                                    value={values.document.recordings}
                                    name="document.recordings"
                                    placeholder="Enter recordings"
                                    loadOptions={loadDocumentOptions("recordings")}
                                    cacheOptions
                                    defaultOptions
                                    isMulti
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                    onChange={option => setFieldValue("document.recordings", option)}
                                    component={AsyncSelect}
                                />
                                <ErrorMessage name="document.recordings" component={CustomErrorMessage} />
                            </FormGroup>

                            {/* Assignment */}
                            <FormGroup>
                                <Label>Assignments</Label>
                                <FastField
                                    bsSize="lg"
                                    value={values.document.assignments}
                                    name="document.assignments"
                                    placeholder="Enter assignments"
                                    loadOptions={loadDocumentOptions("assignments")}
                                    cacheOptions
                                    defaultOptions
                                    isMulti
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                    onChange={option => setFieldValue("document.assignments", option)}
                                    component={AsyncSelect}
                                />
                                <ErrorMessage name="document.assignments" component={CustomErrorMessage} />
                            </FormGroup>

                            {/* Answers */}
                            <FormGroup>
                                <Label>Answers</Label>
                                <FastField
                                    bsSize="lg"
                                    value={values.document.answers}
                                    name="document.answers"
                                    placeholder="Enter answers"
                                    loadOptions={loadDocumentOptions("answers")}
                                    cacheOptions
                                    defaultOptions
                                    isMulti
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                    onChange={option => setFieldValue("document.answers", option)}
                                    component={AsyncSelect}
                                />
                                <ErrorMessage name="document.answers" component={CustomErrorMessage} />
                            </FormGroup>
                        </Col>

                        <Col md="6" xl="6">
                            <h5>Extra Document</h5>
                            {/* Slide */}
                            <FormGroup>
                                <Label>Slides</Label>
                                <FastField
                                    bsSize="lg"
                                    value={values.extraDocument.slides}
                                    name="extraDocument.slides"
                                    placeholder="Enter slides"
                                    loadOptions={loadDocumentOptions("slides")}
                                    cacheOptions
                                    defaultOptions
                                    isMulti
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                    onChange={option => setFieldValue("extraDocument.slides", option)}
                                    component={AsyncSelect}
                                />
                                <ErrorMessage name="extraDocument.slides" component={CustomErrorMessage} />
                            </FormGroup>

                            {/* Knowledge */}
                            <FormGroup>
                                <Label>Knowledges</Label>
                                <FastField
                                    bsSize="lg"
                                    value={values.extraDocument.knowledges}
                                    name="extraDocument.knowledges"
                                    placeholder="Enter knowledges"
                                    loadOptions={loadDocumentOptions("knowledges")}
                                    cacheOptions
                                    defaultOptions
                                    isMulti
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                    onChange={option => setFieldValue("extraDocument.knowledges", option)}
                                    component={AsyncSelect}
                                />
                                <ErrorMessage name="extraDocument.knowledges" component={CustomErrorMessage} />
                            </FormGroup>

                            {/* Recording */}
                            <FormGroup>
                                <Label>Recordings</Label>
                                <FastField
                                    bsSize="lg"
                                    value={values.extraDocument.recordings}
                                    name="extraDocument.recordings"
                                    placeholder="Enter recordings"
                                    loadOptions={loadDocumentOptions("recordings")}
                                    cacheOptions
                                    defaultOptions
                                    isMulti
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                    onChange={option => setFieldValue("extraDocument.recordings", option)}
                                    component={AsyncSelect}
                                />
                                <ErrorMessage name="extraDocument.recordings" component={CustomErrorMessage} />
                            </FormGroup>

                            {/* Assignment */}
                            <FormGroup>
                                <Label>Assignments</Label>
                                <FastField
                                    bsSize="lg"
                                    value={values.extraDocument.assignments}
                                    name="extraDocument.assignments"
                                    placeholder="Enter assignments"
                                    loadOptions={loadDocumentOptions("assignments")}
                                    cacheOptions
                                    defaultOptions
                                    isMulti
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                    onChange={option => setFieldValue("extraDocument.assignments", option)}
                                    component={AsyncSelect}
                                />
                                <ErrorMessage name="extraDocument.assignments" component={CustomErrorMessage} />
                            </FormGroup>

                            {/* Answers */}
                            <FormGroup>
                                <Label>Answers</Label>
                                <FastField
                                    bsSize="lg"
                                    value={values.extraDocument.answers}
                                    name="extraDocument.answers"
                                    placeholder="Enter answers"
                                    loadOptions={loadDocumentOptions("answers")}
                                    cacheOptions
                                    defaultOptions
                                    isMulti
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                    onChange={option => setFieldValue("extraDocument.answers", option)}
                                    component={AsyncSelect}
                                />
                                <ErrorMessage name="extraDocument.answers" component={CustomErrorMessage} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <br />
                    <hr />
                    <Row className="float-right pull-right" style={{ paddingright: 20 }}>
                        <Col xl="12">
                            {/* previous button */}
                            {props.currentLesson !== 0 &&
                                <>
                                    <Button onClick={() => prev(submitForm)} color="primary" disabled={isSubmitting}>Prev</Button>
                                    {" "}
                                </>
                            }
                            {/* next button */}
                            <Button onClick={() => next(submitForm)} color="primary" disabled={isSubmitting}>Next</Button> {" "}
                            {/* finish button */}
                            <Button onClick={() => finish(submitForm)} color="primary" disabled={isSubmitting}>Finish</Button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik >
    );
}
export default LessonForm;