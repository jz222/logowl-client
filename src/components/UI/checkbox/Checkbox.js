import React from 'react';

import styling from './Checkbox.module.scss';

const Checkbox = ({ checked, id = '', changeHandler }) => {
    return (
        <label className={styling.checkBox}>
            <input type='checkbox' checked={checked} data-id={id} onChange={changeHandler} />
            <span className={styling.checkmark} />
        </label>
    );
};

export default Checkbox;