import React from 'react';
import { Prompt } from 'react-router-dom';
import { useFormikContext } from 'formik';

const PromptPopup = () => {
    const formik = useFormikContext();
    return (
        <Prompt
            when={formik.dirty && formik.submitCount === 0}
            message="Are you sure you want to leave? You have with unsaved changes."
        />
    );
};

export default PromptPopup;