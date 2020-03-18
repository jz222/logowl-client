import React from 'react';

import styling from './InputField.module.scss';

const InputField = (props) => {
    const updatedProps = {
        type: props.type ? props.type : 'text',
        'aria-label': props.name || '',
        ...props
    };
    
    delete updatedProps.test;
    
    let invalidStyle = '';
    
    if (props.test && props.value) {
        invalidStyle = !props.test.test(props.value) && styling.invalid;
    }
    
    return (
        <input className={styling[props.size] || styling.large + ' ' + invalidStyle} {...updatedProps} />
    );
};

export default InputField;