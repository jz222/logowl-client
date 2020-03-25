import React from 'react';

import styling from './Button.module.scss';

const Button = (props) => (
    <button className={(styling[props.size] || styling.button) + ' ' + (styling[props.color] || '')} {...props} />
);

export default Button;