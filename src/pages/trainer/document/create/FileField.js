import React, { useRef } from "react";
import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function FileField({
    field,
    form: { setFieldValue, values, setFieldError, setFieldTouched },
    ...props
}) {
    const inputFileRef = useRef(null);

    const getFileType = (fileName) => {
        var dotIndex = fileName.lastIndexOf(".");
        var format = fileName.substring(dotIndex + 1, fileName.length);
        switch (format) {
            case "pdf":
                return "Pdf";

            case "ppt":
            case "pptx":
                return "Powerpoint";

            case "docx":
            case "doc":
                return "Word";

            case "mp4":
                return "Video";

            default:
                return format;
        }
    }

    const onChangeFiles = (e) => {
        if (e.currentTarget.files.length === 0) return;

        // reset outputFiles
        const outputFiles = [];
        e.currentTarget.files.forEach(file => {
            outputFiles.push({
                name: file.name,
                type: getFileType(file.name),
                size: file.size,
                file: file
            });
        });

        setFieldValue(field.name, outputFiles);
    };

    return (
        <>
            <input
                type="file"
                accept={props.acceptedType}
                multiple
                ref={inputFileRef}
                onChange={onChangeFiles}
                style={{ display: 'none' }}
            />

            <Button
                color="primary"
                onClick={(e) => {
                    if (values.type === "") {
                        setFieldError("type", "Required");
                        setFieldTouched("type", true);
                    } else {
                        inputFileRef.current.click();
                    }
                }}
            >
                <FontAwesomeIcon icon={faUpload} style={{ marginRight: 5 }} />
                Upload
            </Button> {" "}
            <small>
                {field.value.length === 0
                    ? props.text
                    : field.value.length + " files"
                }
            </small>
        </>
    );
};

export default FileField;

