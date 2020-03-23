import React from 'react';

import styling from './Badge.module.scss';

const Badge = ({ children, size, type }) => {
    return (
        <span className={styling[size] + ' ' + styling[type]}>{children}</span>
    );
};

export default Badge;