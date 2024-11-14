import React from 'react';

const CustomErrorListMessage = (props) => {

    return (
        <div className="invalid-feedback" style={{ display: "block" }}>
            {typeof props.children === "string" && props.children}
        </div>
    );
}

export default CustomErrorListMessage;