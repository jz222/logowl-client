import React from 'react';

import styling from './Badge.module.scss';

const Badge = ({ children, size, type, hidden, click }) => {
    return (
        <span className={styling[size] + ' ' + styling[type]} hidden={hidden} onClick={click}>{children}</span>
    );
};

export default Badge;