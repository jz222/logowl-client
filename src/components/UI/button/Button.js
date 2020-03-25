import React from 'react';

import styling from './Button.module.scss';

const Button = (props) => <button className={styling[props.color] || styling.button} {...props} />;

export default Button;