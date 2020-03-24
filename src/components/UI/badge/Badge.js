import React from 'react';

import styling from './Badge.module.scss';

const Badge = ({ children, size, type, hidden }) => {
    return (
        <span className={styling[size] + ' ' + styling[type]} hidden={hidden}>{children}</span>
    );
};

export default Badge;