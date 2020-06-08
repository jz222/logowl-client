import React from 'react';

import styling from './Button.module.scss';

const Button = ({ size, color, disabled, onClick, isLoading, hidden, children}) => (
    <button
        className={(styling[size] || styling.button) + ' ' + (styling[color] || '')}
        onClick={onClick}
        disabled={disabled || isLoading}
        hidden={hidden}
    >
        {isLoading && <div className={styling.spinner} />}{children}
    </button>
);

export const WideButton = (props) => (
    <button className={styling.wideButton} {...props} />
);

export const Action = (props) => (
    <button className={styling.action} {...props}>{props.icon} <span>{props.children}</span></button>
);

export default Button;