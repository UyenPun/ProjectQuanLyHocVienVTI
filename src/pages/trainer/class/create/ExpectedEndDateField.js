import React, { useEffect } from 'react';
import { useField, useFormikContext } from 'formik';
import { FastField } from "formik";

function ExpectedEndDateField(props) {

    const {
        values: { course, startDate, schedules },
        touched,
        setFieldValue,
    } = useFormikContext();

    const [field,] = useField(props);

    useEffect(() => {
        const totalLessonInWeek = schedules.filter(schedule => schedule.isChecked).length;

        if (course && startDate && touched.startDate && touched.schedules && totalLessonInWeek !== 0) {

            const totalLesson = course.totalLesson;
            let estimateTotalDay = totalLesson / totalLessonInWeek * 7;
            estimateTotalDay += estimateTotalDay * 5 / 100; // + thêm 5% số buổi nghỉ
            estimateTotalDay = Math.round(estimateTotalDay); // convert float to int

            // get expected end date
            const expectedEndDate = new Date(startDate);
            expectedEndDate.setDate(expectedEndDate.getDate() + estimateTotalDay);

            setFieldValue(props.name, expectedEndDate.toISOString().split('T')[0]);
        }
    }, [course, startDate, schedules,
        touched.startDate, touched.schedules,
        setFieldValue, props.name]);

    return (
        <FastField
            {...field}
            {...props}
        />
    );
};

export default ExpectedEndDateField;


