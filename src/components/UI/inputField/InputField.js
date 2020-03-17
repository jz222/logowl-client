import React from 'react';

import styling from './InputField.module.scss';

const InputField = (props) => {
    const updatedProps = {
        type: props.type ? props.type : 'text',
        ...props
    };
    
    return (
        <input className={styling[props.size] || styling.large} {...updatedProps} />
    );
};

export default InputField;