import React from 'react';

import styling from './Button.module.scss';

const Button = (props) => (
    <button
        className={(styling[props.size] || styling.button) + ' ' + (styling[props.color] || '')}
        {...props}
        disabled={props.disabled || props.isLoading}
    >
        {props.isLoading && <div className={styling.spinner} />}{props.children}
    </button>
);

export const WideButton = (props) => (
    <button className={styling.wideButton} {...props} />
);

export const Action = (props) => (
    <button className={styling.action} {...props}>{props.icon} <span>{props.children}</span></button>
);

export default Button;