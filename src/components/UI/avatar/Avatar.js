import React from 'react';

import styling from './Avatar.module.scss';

const Avatar = ({ firstName = '', lastName = '' }) => {
    let style = styling.one;
    
    const charCode = firstName.toUpperCase().charCodeAt(0) || 0;
    
    if (charCode >= 75) {
        style = styling.two;
    }
    
    if (charCode >= 83) {
        style = styling.three;
    }
    
    return <div className={style}>{firstName[0]}{lastName[0]}</div>;
};

export default Avatar;