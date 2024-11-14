import React, { useState } from "react";

import LessonForm from "./LessonForm";

const ListLessonForm = (props) => {

    const initLesson = () => {
        return {
            type: {
                value: "Compulsory",
                label: "Compulsory Lesson"
            }, // default
            schedules: [
                {
                    content: '',
                    teachingMethod: '',
                    duration: ''
                }
            ],
            document: {
                slides: [],
                knowledges: [],
                recordings: [],
                assignments: [],
                answers: []
            },
            extraDocument: {
                slides: [],
                knowledges: [],
                recordings: [],
                assignments: [],
                answers: []
            }
        };
    }

    const [currentLesson, setCurrentLesson] = useState(0);
    const [lessons, setLessons] = useState([initLesson()]);

    const nextLesson = (values) => {
        lessons[currentLesson] = values;
        if (currentLesson === lessons.length - 1) {
            lessons.push(initLesson());
        }
        setLessons([...lessons]);
        setCurrentLesson(currentLesson + 1);
    }

    const prevLesson = (values) => {
        lessons[currentLesson] = values;
        setLessons([...lessons]);
        setCurrentLesson(currentLesson - 1);
    }

    const finishLesson = (values) => {
        lessons[currentLesson] = values;
        props.nextStep(lessons);
    }

    return (
        <LessonForm
            currentLesson={currentLesson}
            lesson={lessons[currentLesson]}
            nextLesson={nextLesson}
            prevLesson={prevLesson}
            finishLesson={finishLesson}
        />
    );
}
export default ListLessonForm;