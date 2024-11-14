import React from "react";
import {
    Button,
    Col,
    Row,
    FormGroup,
    Label
} from "reactstrap";

import { FastField, Form, Formik } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import * as Yup from 'yup';

import PromptPopup from "../../../../components/formik/PromptPopup";

import SubjectApi from "../../../../api/trainer/SubjectApi";

const BasicInformationForm = (props) => {

    let choose;

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
                name: '',
                code: '',
                version: '',
                note: ''
            }}
            validationSchema={
                Yup.object({
                    name: Yup.string()
                        .max(100, 'Must be less than 100 characters')
                        .required('Required'),

                    code: Yup.string()
                        .max(100, 'Must be less than 100 characters')
                        .required('Required')
                        .test('checkUniqueCode', 'This code is already registered.', async code => {
                            // call api
                            const isExists = await SubjectApi.existsByCode(code);
                            return !isExists;
                        }),

                    version: Yup.string()
                        .max(100, 'Must be less than 100 characters')
                        .required('Required'),

                    note: Yup.string()
                        .max(500, 'Must be less than 500 characters')
                })
            }
            onSubmit={
                values => {
                    props.nextStep(choose, values);
                }
            }
            validateOnChange={false}
            validateOnBlur={false}
        >
            {({ isSubmitting, submitForm }) => (
                <Form>
                    <PromptPopup />
                    <h4>Basic Informations</h4>
                    <br />
                    <Row>
                        <Col md="6" xl="6">
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

                            {/* Version */}
                            <FormGroup>
                                <Label>
                                    Version
                                    <span style={{ color: "red" }}>*</span>
                                </Label>
                                <FastField
                                    bsSize="lg"
                                    name="version"
                                    placeholder="Enter version"
                                    component={ReactstrapInput}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
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
                    <Row className="float-right pull-right" style={{ paddingright: 20 }}>
                        <Col xl="12">
                            {/* next button */}
                            <Button onClick={() => next(submitForm)} color="primary" disabled={isSubmitting}>Next</Button>  {" "}
                            {/* finish button */}
                            <Button onClick={() => finish(submitForm)} color="primary" disabled={isSubmitting}>Finish</Button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik >
    );
}
export default BasicInformationForm;