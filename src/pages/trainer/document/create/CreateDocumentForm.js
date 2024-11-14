import React, { useState } from "react";

import {
    Button,
    Col,
    Row,
    FormGroup,
    Label,
    Input,
    Container,
    CardBody,
    Card
} from "reactstrap";

import { X } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { FieldArray, FastField, Form, Formik, ErrorMessage } from "formik";
import FileField from "./FileField";
import Select from "react-select";
import NumberFormat from 'react-number-format';
import CustomErrorMessage from "../../../../components/formik/CustomErrorMessage";
import CustomErrorListMessage from "../../../../components/formik/CustomErrorListMessage";
import * as Yup from 'yup';

import PromptPopup from "../../../../components/formik/PromptPopup";

import FileApi from "../../../../api/FileApi";
import DocumentApi from "../../../../api/trainer/DocumentApi";

import { showSuccessNotification } from "../../../../utils/Notification";

const CreateDocumentForm = (props) => {

    const typeOptions = [
        { value: "slides", label: "Slide", acceptedType: ".pdf, .ppt, .pptx" },
        { value: "knowledges", label: "Knowledge", acceptedType: ".pdf, .docx" },
        { value: "recordings", label: "Recording", acceptedType: ".mp4" },
        { value: "assignments", label: "Assignment", acceptedType: ".pdf, .docx" },
        { value: "answers", label: "Answer", acceptedType: ".pdf, .docx" }
    ];

    const [acceptedTypeUpload, setAcceptedTypeUpload] = useState("*");
    const changeAcceptedTypeUpload = (typeOption, setFieldValue) => {

        // reset field
        setFieldValue("uploadFiles", []);
        setFieldValue("remoteFiles", []);

        // reset options
        setAcceptedTypeUpload(typeOption.acceptedType);
    }

    return <Container fluid className="p-0">
        <h1 className="h3 mb-3">Upload Document</h1>

        <Card>
            <CardBody>
                <Formik
                    initialValues={{
                        type: '',
                        uploadFiles: [],
                        remoteFiles: [],
                        errorFiles: ''
                    }}
                    validationSchema={
                        Yup.object({
                            type: Yup.object()
                                .required('Required'),

                            uploadFiles: Yup.array().of(
                                Yup.object().shape({
                                    name: Yup.string()
                                        .max(200, 'Must be less than 200 characters')
                                        .required('Required'),
                                    type: Yup.string()
                                        .max(200, 'Must be less than 200 characters')
                                        .required('Required'),
                                    size: Yup.number()
                                        .min(0, 'Must be greater than 0')
                                        .required('Required')
                                })),

                            remoteFiles: Yup.array().of(
                                Yup.object().shape({
                                    name: Yup.string()
                                        .max(200, 'Must be less than 200 characters')
                                        .required('Required'),
                                    type: Yup.string()
                                        .max(200, 'Must be less than 200 characters')
                                        .required('Required'),
                                    size: Yup.number()
                                        .min(0, 'Must be greater than 0')
                                        .required('Required'),
                                    path: Yup.string()
                                        .max(200, 'Must be less than 200 characters')
                                        .required('Required')
                                })),

                            errorFiles: Yup.string()
                                .when(["uploadFiles", "remoteFiles"], {
                                    is: (uploadFiles, remoteFiles) => ((remoteFiles.length === 0 && uploadFiles.length === 0) ? true : false),
                                    then: Yup.string().required('Upload at least 1 local file or remote file.')
                                }),
                        })
                    }
                    onSubmit={
                        async values => {
                            try {
                                if (values.uploadFiles.length !== 0) {
                                    // upload document via API
                                    const paths = await FileApi.uploadDocuments(
                                        values.type.value,
                                        !values.uploadFiles || values.uploadFiles.length === 0
                                            ? []
                                            : values.uploadFiles.map(uploadFile => uploadFile.file),
                                        !values.uploadFiles || values.uploadFiles.length === 0
                                            ? []
                                            : values.uploadFiles.map(uploadFile => uploadFile.name));

                                    // add path to uploadFiles
                                    for (let index = 0; index < values.uploadFiles.length; index++) {
                                        values.uploadFiles[index].path = paths[index];
                                    }
                                }

                                // create subject via API
                                await DocumentApi.create(
                                    values.type.value,
                                    values.uploadFiles,
                                    values.remoteFiles);

                                // show notification
                                showSuccessNotification(
                                    "Create Document",
                                    "Create Document Successfully!"
                                );
                                props.history.push("/documents");
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    enableReinitialize
                >
                    {({ values, isSubmitting, setFieldValue, setFieldTouched, setFieldError }) => (
                        <Form>
                            <PromptPopup />
                            <Row>
                                <Col md="6" xl="6">
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
                                            onChange={option => {
                                                setFieldValue("type", option);
                                                changeAcceptedTypeUpload(option, setFieldValue);
                                            }}
                                        />
                                        <ErrorMessage name="type" component={CustomErrorMessage} />
                                    </FormGroup>
                                </Col>
                            </Row>

                            {/* Local Documents */}
                            <Row>
                                <Col md="12" xl="12">
                                    <br />
                                    <h4>Local Documents</h4>
                                </Col>
                                <Col md="6" xl="6">
                                    {/* Upload */}
                                    <FormGroup>
                                        <FastField
                                            name="uploadFiles"
                                            acceptedType={acceptedTypeUpload}
                                            text="Choose documents"
                                            component={FileField} />
                                    </FormGroup>
                                </Col>
                                <Col md="12" xl="12">
                                    {/* uploadFiles */}
                                    <FieldArray
                                        name="uploadFiles"
                                        render={arrayHelpers => (
                                            <div>
                                                {values.uploadFiles.map((file, index) => (
                                                    <Row key={index}>
                                                        <Col md="4" xl="4">
                                                            {/* File Name */}
                                                            <FormGroup>
                                                                <Label>
                                                                    Name
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </Label>
                                                                <FastField
                                                                    value={values.uploadFiles[index].name}
                                                                    bsSize="lg"
                                                                    name={`uploadFiles[${index}].name`}
                                                                    onChange={e => setFieldValue(`uploadFiles[${index}].name`, e.target.value)}
                                                                    placeholder="Enter name"
                                                                    component={Input}
                                                                />
                                                                <ErrorMessage name={"uploadFiles[" + index + "].name"} component={CustomErrorMessage} />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="3" xl="3">
                                                            {/* File Type */}
                                                            <FormGroup>
                                                                <Label>
                                                                    Type
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </Label>
                                                                <FastField
                                                                    value={values.uploadFiles[index].type}
                                                                    bsSize="lg"
                                                                    name={`uploadFiles[${index}].type`}
                                                                    onChange={e => setFieldValue(`uploadFiles[${index}].type`, e.target.value)}
                                                                    placeholder="Enter type"
                                                                    component={Input}
                                                                />
                                                                <ErrorMessage name={"uploadFiles[" + index + "].type"} component={CustomErrorMessage} />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="3" xl="3">
                                                            {/* File Size */}
                                                            <FormGroup>
                                                                <Label>
                                                                    Size
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </Label>
                                                                <NumberFormat
                                                                    suffix=" bytes"
                                                                    thousandSeparator={true}
                                                                    value={values.uploadFiles[index].size}
                                                                    onValueChange={(values) => {
                                                                        const { value } = values;
                                                                        setFieldValue("uploadFiles[" + index + "].size", value)
                                                                    }}
                                                                    bsSize="lg"
                                                                    placeholder="Enter size"
                                                                    customInput={Input}
                                                                />
                                                                <ErrorMessage name={"uploadFiles[" + index + "].size"} component={CustomErrorMessage} />
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
                            </Row>

                            {/* Remote Documents */}
                            <Row>
                                <Col md="12" xl="12">
                                    <br />
                                    <h4>Remote Documents</h4>
                                </Col>
                                <Col md="12" xl="12">
                                    {/* remoteFiles */}
                                    <FieldArray
                                        name="remoteFiles"
                                        render={arrayHelpers => (
                                            <div>
                                                <Button color="primary" onClick={
                                                    () => {
                                                        if (values.type === "") {
                                                            setFieldError("type", "Required");
                                                            setFieldTouched("type", true);
                                                        } else {
                                                            arrayHelpers.insert(values.remoteFiles.length, {
                                                                name: "",
                                                                type: "",
                                                                size: "",
                                                                path: ""
                                                            });
                                                        }
                                                    }
                                                }>
                                                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                                                    Add
                                                </Button>
                                                {" "}
                                                <small>
                                                    {values.remoteFiles.length === 0
                                                        ? "Choose documents"
                                                        : values.remoteFiles.length + " files"
                                                    }
                                                </small>
                                                <br />
                                                {values.remoteFiles.map((file, index) => (
                                                    <Row key={index} style={{ marginTop: 12 }}>
                                                        <Col md="4" xl="4">
                                                            {/* File Name */}
                                                            <FormGroup>
                                                                <Label>
                                                                    Name
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </Label>
                                                                <FastField
                                                                    value={values.remoteFiles[index].name}
                                                                    bsSize="lg"
                                                                    name={`remoteFiles[${index}].name`}
                                                                    onChange={e => setFieldValue(`remoteFiles[${index}].name`, e.target.value)}
                                                                    placeholder="Enter name"
                                                                    component={Input}
                                                                />
                                                                <ErrorMessage name={"remoteFiles[" + index + "].name"} component={CustomErrorMessage} />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="3" xl="3">
                                                            {/* File Type */}
                                                            <FormGroup>
                                                                <Label>
                                                                    Type
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </Label>
                                                                <FastField
                                                                    value={values.remoteFiles[index].type}
                                                                    bsSize="lg"
                                                                    name={`remoteFiles[${index}].type`}
                                                                    onChange={e => setFieldValue(`remoteFiles[${index}].type`, e.target.value)}
                                                                    placeholder="Enter type"
                                                                    component={Input}
                                                                />
                                                                <ErrorMessage name={"remoteFiles[" + index + "].type"} component={CustomErrorMessage} />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="3" xl="3">
                                                            {/* File Size */}
                                                            <FormGroup>
                                                                <Label>
                                                                    Size
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </Label>
                                                                <NumberFormat
                                                                    suffix=" bytes"
                                                                    thousandSeparator={true}
                                                                    value={values.remoteFiles[index].size}
                                                                    onValueChange={(values) => {
                                                                        const { value } = values;
                                                                        setFieldValue("remoteFiles[" + index + "].size", value)
                                                                    }}
                                                                    bsSize="lg"
                                                                    placeholder="Enter size"
                                                                    customInput={Input}
                                                                />
                                                                <ErrorMessage name={"remoteFiles[" + index + "].size"} component={CustomErrorMessage} />
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
                                                        <Col md="10" xl="10">
                                                            {/* File Path */}
                                                            <FormGroup>
                                                                <Label>
                                                                    Path
                                                                    <span style={{ color: "red" }}>*</span>
                                                                </Label>
                                                                <FastField
                                                                    value={values.remoteFiles[index].path}
                                                                    bsSize="lg"
                                                                    name={`remoteFiles[${index}].path`}
                                                                    onChange={e => setFieldValue(`remoteFiles[${index}].path`, e.target.value)}
                                                                    placeholder="Ex: https://drive.google.com/file/d/1SmVcBaFt2QwFnkMA4T6xQ1t5F60sZN3J/view?usp=sharing"
                                                                    component={Input}
                                                                />
                                                                <ErrorMessage name={"remoteFiles[" + index + "].path"} component={CustomErrorMessage} />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                ))}
                                            </div>
                                        )}
                                    />
                                </Col>
                            </Row>

                            <br />
                            <ErrorMessage name="errorFiles" component={CustomErrorListMessage} />

                            <hr />
                            <Button type="submit" color="primary" disabled={isSubmitting}>Submit</Button>
                        </Form>
                    )}
                </Formik >
            </CardBody>
        </Card >
    </Container >
}
export default CreateDocumentForm;