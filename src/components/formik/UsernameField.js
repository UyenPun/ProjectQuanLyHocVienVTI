import React, { useEffect } from 'react';
import { useField, useFormikContext } from 'formik';
import { FastField } from "formik";

import { convertToNonAccentVietnamese } from './../../utils/Utils';

function UsernameField(props) {

    const {
        values: { firstName, lastName, dateOfBirth },
        touched,
        setFieldValue,
    } = useFormikContext();

    const [field,] = useField(props);

    const getRandomNumberFromDateOfBirth = (date) => {
        let month = date.getMonth() + 1;
        if (month < 10) month = "0" + month;

        let day = date.getDate();
        if (day < 10) day = "0" + day;

        return `${day}${month}`;
    }

    useEffect(() => {
        if (firstName.trim() !== '' && lastName.trim() !== '' && dateOfBirth
            && touched.firstName && touched.lastName && touched.dateOfBirth
        ) {
            const firstNameNoSpace = convertToNonAccentVietnamese(firstName.replace(/\s/g, '').toLowerCase());
            const lastNameNoSpace = convertToNonAccentVietnamese(lastName.replace(/\s/g, '').toLowerCase());

            // get random number
            const randomNumber = getRandomNumberFromDateOfBirth(new Date(dateOfBirth));

            setFieldValue(props.name, `${firstNameNoSpace}.${lastNameNoSpace}${randomNumber}`);
        }
    }, [firstName, lastName, dateOfBirth,
        touched.firstName, touched.lastName, touched.dateOfBirth,
        setFieldValue, props.name]);

    return (
        <FastField
            {...field}
            {...props}
        />
    );
};

export default UsernameField;


