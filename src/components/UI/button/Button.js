import React from 'react';

import styling from './Button.module.scss';

const Button = (props) => (
    <button className={(styling[props.size] || styling.button) + ' ' + (styling[props.color] || '')} {...props} />
);

export const Action = (props) => (
    <button className={styling.action} {...props}>{props.icon} <span>{props.children}</span></button>
);

export default Button;