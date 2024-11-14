import React from 'react';

const CustomErrorMessage = (props) => {
    return (
        <div className="invalid-feedback" style={{ display: "block" }}>
            {props.children}
        </div>
    );
}

export default CustomErrorMessage;