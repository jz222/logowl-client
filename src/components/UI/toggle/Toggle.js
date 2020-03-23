import React from 'react';

import styling from './Toggle.module.scss';

const Toggle = (props) => (
    <label className={styling.label}>
        <input {...props} className={styling.input} type='checkbox' aria-label='toggle' />
        <span className={styling.slider} />
    </label>
);

export default Toggle;