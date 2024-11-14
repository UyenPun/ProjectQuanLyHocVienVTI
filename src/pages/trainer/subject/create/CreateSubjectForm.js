import React, { useState } from "react";
import {
    Container,
    Card,
    CardBody,
} from "reactstrap";

import BasicInformationForm from "./BasicInformationForm";
import ListLessonForm from "./ListLessonForm";

import SubjectApi from "../../../../api/trainer/SubjectApi";

import { showSuccessNotification } from "../../../../utils/Notification";

const CreateSubjectForm = (props) => {

    const [step, setStep] = useState(1);
    const [basicInfo, setBasicInfo] = useState();

    const completeBasicInformation = (choose, values) => {
        if (choose === "finish") {
            saveSubject(values, []);
        } else {
            // choose = next
            setBasicInfo(values);
            setStep(step + 1);
            window.scrollTo(0, 0);
        }
    }

    const completeLesson = (lessons) => {
        saveSubject(basicInfo, lessons);
    }

    const saveSubject = async (basicInfo, lessons) => {
        try {
            // convert data
            const lessonForms = lessons.map(lesson => {

                // schedule
                const schedules = lesson.schedules.map(
                    schedule => {
                        return {
                            content: schedule.content,
                            duration: schedule.duration,
                            teachingMethod: schedule.teachingMethod.name
                        }
                    }
                );

                // documents
                const documentIds = [
                    ...(!lesson.document.slides ? [] : lesson.document.slides.map(slide => slide.id)),
                    ...(!lesson.document.knowledges ? [] : lesson.document.knowledges.map(knowledge => knowledge.id)),
                    ...(!lesson.document.recordings ? [] : lesson.document.recordings.map(recording => recording.id)),
                    ...(!lesson.document.assignments ? [] : lesson.document.assignments.map(assignment => assignment.id)),
                    ...(!lesson.document.answers ? [] : lesson.document.answers.map(answer => answer.id)),
                ];

                // extra documents
                const extraDocumentIds = [
                    ...(!lesson.extraDocument.slides ? [] : lesson.extraDocument.slides.map(slide => slide.id)),
                    ...(!lesson.extraDocument.knowledges ? [] : lesson.extraDocument.knowledges.map(knowledge => knowledge.id)),
                    ...(!lesson.extraDocument.recordings ? [] : lesson.extraDocument.recordings.map(recording => recording.id)),
                    ...(!lesson.extraDocument.assignments ? [] : lesson.extraDocument.assignments.map(assignment => assignment.id)),
                    ...(!lesson.extraDocument.answers ? [] : lesson.extraDocument.answers.map(answer => answer.id)),
                ];

                return {
                    type: lesson.type.value,
                    schedules: schedules,
                    documentIds: documentIds,
                    extraDocumentIds: extraDocumentIds
                }
            })

            // call API
            await SubjectApi.create(
                basicInfo.name, basicInfo.code, basicInfo.version, basicInfo.note, lessonForms);

            // show notification
            showSuccessNotification(
                "Create Subject",
                "Create Subject Successfully!"
            );
            props.history.push("/subjects");

        } catch (error) {
            console.log(error);
        }
    }

    return <Container fluid className="p-0">
        <h1 className="h3 mb-3">Create Subject</h1>

        <Card>
            <CardBody>
                {
                    step === 1 ?
                        <BasicInformationForm nextStep={completeBasicInformation} />
                        : <ListLessonForm nextStep={completeLesson} />
                }
            </CardBody>
        </Card>
    </Container >
}
export default CreateSubjectForm;