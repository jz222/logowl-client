import React from 'react';

import styling from './Spinner.module.scss';

const Spinner = ({ size, invert, hidden }) => {
    const style = (styling[size] || styling.medium) + ' ' + (invert && styling.invert);
    
    return (
        <div className={style} hidden={hidden}>
            <div />
            <div />
        </div>
    );
};

export default Spinner;