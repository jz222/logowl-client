import React from 'react';

import styling from './Badge.module.scss';

const Badge = ({ name, value }) => (
    <div className={styling.badge}>
        <div className={styling.cell}>{name}</div>
        <div className={styling.cell}>{value}</div>
    </div>
);

export default Badge;