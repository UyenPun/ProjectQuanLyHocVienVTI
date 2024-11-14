import React, { useEffect, useState } from "react";

import {
    Button,
    Col,
    Container,
    Row,
    Card,
    CardBody,
    FormGroup,
    Label
} from "reactstrap";

import { FieldArray, FastField, Form, Formik, ErrorMessage } from "formik";
import { ReactstrapInput } from "reactstrap-formik";
import AsyncSelect from 'react-select/async';
import ExpectedEndDateField from "./ExpectedEndDateField";
import CustomErrorMessage from "../../../../components/formik/CustomErrorMessage";
import * as Yup from 'yup';

import PromptPopup from "../../../../components/formik/PromptPopup";
import { showSuccessNotification } from "../../../../utils/Notification";

import CourseApi from "../../../../api/trainer/CourseApi";
import ClassApi from "../../../../api/trainer/ClassApi";
import MentorApi from "../../../../api/trainer/MentorApi";
import MenteeApi from "../../../../api/trainer/MenteeApi";

import { hasSpecialCharacters } from "../../../../utils/Utils";


const CreateClassForm = (props) => {

    const loadCourseOptions = async (value, callback) => {
        if (value && !hasSpecialCharacters(value[value.length - 1])) {
            return;
        } else {
            const result = await CourseApi.getAll(1, 5, null, null, value);
            if (value) {
                callback(result.content);
            } else {
                return result.content;
            }
        }
    }

    const [scheduleOptions, setScheduleOptions] = useState([]);
    useEffect(() => {
        const loadScheduleOptions = async () => {
            const result = await ClassApi.getAllSchedules();
            setScheduleOptions(result);
        };
        loadScheduleOptions();
    }, []);

    const loadMentorOptions = async (value, callback) => {
        if (value && !hasSpecialCharacters(value[value.length - 1])) {
            return;
        } else {
            const result = await MentorApi.getAll(1, 5, null, null, value);
            if (value) {
                callback(result.content);
            } else {
                return result.content;
            }
        }
    }

    const loadMenteeOptions = async (value, callback) => {
        if (value && !hasSpecialCharacters(value[value.length - 1])) {
            return;
        } else {
            const result = await MenteeApi.getAll(1, 5, null, null, value);
            if (value) {
                callback(result.content);
            } else {
                return result.content;
            }
        }
    }

    return <Container fluid className="p-0">
        <h1 className="h3 mb-3">Create Class</h1>

        <Card>
            <CardBody>
                <Formik
                    initialValues={{
                        name: '',
                        course: '',
                        code: '',
                        address: '',
                        facebookLink: '',
                        groupChat: '',
                        schedules: scheduleOptions,
                        startDate: '',
                        expectedEndDate: '',
                        mentors: '',
                        mentees: '',
                        note: ''
                    }}

                    validationSchema={
                        Yup.object({
                            name: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required')
                                .test('checkUniqueName', 'This name is already registered.', async name => {
                                    // call api
                                    const isExists = await ClassApi.existsByName(name);
                                    return !isExists;
                                }),

                            course: Yup.object()
                                .required('Required'),

                            code: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required')
                                .test('checkUniqueCode', 'This code is already registered.', async code => {
                                    // call api
                                    const isExists = await ClassApi.existsByCode(code);
                                    return !isExists;
                                }),

                            address: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required'),

                            facebookLink: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required'),

                            groupChat: Yup.string()
                                .max(100, 'Must be less than 100 characters')
                                .required('Required'),

                            schedules: Yup.array()
                                .test('checkHasSchedule', 'Required', schedules => {
                                    for (const schedule of schedules) {
                                        if (schedule.isChecked) {
                                            return true;
                                        }
                                    }
                                    return false;
                                }),

                            startDate: Yup.date()
                                .min(new Date(1970, 10, 10), 'Must be greater than 1970')
                                .required('Required'),

                            expectedEndDate: Yup.date()
                                .min(
                                    Yup.ref('startDate'),
                                    "Must be later than start date"
                                ),

                            note: Yup.string()
                                .max(500, 'Must be less than 500 characters')
                        })
                    }

                    onSubmit={
                        async values => {
                            try {
                                // call API
                                await ClassApi.create(
                                    values.name, values.course.id, values.code, values.address, values.facebookLink, values.groupChat,
                                    values.schedules.filter(schedule => schedule.isChecked).map(schedule => schedule.id), values.startDate, values.expectedEndDate,
                                    !values.mentors || values.mentors.length === 0
                                        ? []
                                        : values.mentors.map(mentor => {
                                            return {
                                                mentorId: mentor.id,
                                                subjectId: mentor.subjectId
                                            }
                                        }),
                                    !values.mentees || values.mentees.length === 0
                                        ? []
                                        : values.mentees.map(mentee => mentee.id),
                                    values.note
                                );
                                // show notification
                                showSuccessNotification(
                                    "Create Class",
                                    "Create Class Successfully!"
                                );
                                props.history.push("/classes");
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    }
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize
                >
                    {({ values, isSubmitting, setFieldValue }) => (
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
                                            autoFocus
                                            bsSize="lg"
                                            name="name"
                                            placeholder="Enter name"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>

                                    {/* Course */}
                                    <FormGroup>
                                        <Label>
                                            Course
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>

                                        <FastField
                                            bsSize="lg"
                                            name="course"
                                            placeholder="Enter course"
                                            loadOptions={loadCourseOptions}
                                            cacheOptions
                                            defaultOptions
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => option.name}
                                            onChange={course => {
                                                setFieldValue('course', course);
                                                setFieldValue("code", course.suggestClassCode);
                                                setFieldValue('mentors', []);
                                            }}
                                            component={AsyncSelect}
                                        />
                                        <ErrorMessage name="course" component={CustomErrorMessage} />
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

                                    {/* Address */}
                                    <FormGroup >
                                        <Label>
                                            Address
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="address"
                                            placeholder="Enter Address"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>

                                    {/* Group Facebook */}
                                    <FormGroup>
                                        <Label>
                                            Group Facebook
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="facebookLink"
                                            placeholder="Ex: https://www.facebook.com/groups/352351949903329"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>

                                    {/* Chat */}
                                    <FormGroup>
                                        <Label>
                                            Group Chat
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <FastField
                                            bsSize="lg"
                                            name="groupChat"
                                            placeholder="Ex: https://www.facebook.com/messages/t/4104080909643187"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md="6" xl="6">
                                    <FormGroup>
                                        <Label>
                                            Schedule
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>
                                        <Row>
                                            {values.schedules.map((schedule, index) =>
                                                <Col xl="auto" key={index}>
                                                    <FastField
                                                        type="checkbox"
                                                        name={`schedules[${index}]`}
                                                        checked={schedule.isChecked ? schedule.isChecked : false}
                                                        onChange={e =>
                                                            setFieldValue(
                                                                `schedules[${index}]`,
                                                                {
                                                                    ...schedule,
                                                                    isChecked: e.target.checked
                                                                })
                                                        }
                                                    />
                                                    <br />
                                                    <Label>{schedule.name}</Label>
                                                </Col>
                                            )}
                                        </Row>
                                        <ErrorMessage name="schedules" component={CustomErrorMessage} />
                                    </FormGroup>

                                    {/* Start Date */}
                                    <FormGroup>
                                        <Label>
                                            Start Date
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>

                                        <FastField
                                            bsSize="lg"
                                            type="date"
                                            name="startDate"
                                            placeholder="Enter Start Date"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>

                                    {/* Expected End Date */}
                                    <FormGroup>
                                        <Label>
                                            Expected End Date
                                            <span style={{ color: "red" }}>*</span>
                                        </Label>

                                        <ExpectedEndDateField
                                            bsSize="lg"
                                            type="date"
                                            name="expectedEndDate"
                                            placeholder="Enter End Date"
                                            component={ReactstrapInput}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr />

                            <Row>
                                <Col md="6" xl="6">
                                    <h4>Mentors</h4>
                                    <br />
                                    {values.course &&
                                        <FieldArray
                                            name="mentors"
                                            render={arrayHelpers =>
                                                values.course.subjects.map((subject, index) =>
                                                    <FormGroup key={`${subject.id}-${index}`}>
                                                        <Label>{subject.name}</Label>
                                                        <FastField
                                                            bsSize="lg"
                                                            value={values.mentors[index]}
                                                            name={`mentors[${index}]`}
                                                            placeholder="Enter mentor"
                                                            loadOptions={loadMentorOptions}
                                                            cacheOptions
                                                            defaultOptions
                                                            getOptionValue={option => option.id}
                                                            getOptionLabel={option => `${option.fullName} (${option.username})`}
                                                            onChange={option =>
                                                                setFieldValue(`mentors[${index}]`,
                                                                    {
                                                                        ...option,
                                                                        subjectId: subject.id
                                                                    })
                                                            }
                                                            component={AsyncSelect}
                                                        />
                                                    </FormGroup>
                                                )
                                            }
                                        />

                                    }
                                </Col>
                                <Col md="6" xl="6">
                                    <h4>Mentees</h4>
                                    <br />

                                    <FormGroup>
                                        <Label>Mentees</Label>
                                        <FastField
                                            bsSize="lg"
                                            value={values.mentees}
                                            name="mentees"
                                            placeholder="Enter mentee"
                                            loadOptions={loadMenteeOptions}
                                            isMulti
                                            cacheOptions
                                            defaultOptions
                                            getOptionValue={option => option.id}
                                            getOptionLabel={option => `${option.fullName} (${option.username})`}
                                            onChange={option => setFieldValue("mentees", option)}
                                            component={AsyncSelect}
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
export default CreateClassForm;