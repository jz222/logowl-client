import React from 'react';

import styling from './Badge.module.scss';

const Badge = ({ name, value, hidden }) => (
    <div className={styling.badge} hidden={hidden}>
        <div className={styling.cell}>{name}</div>
        <div className={styling.cell}>{value}</div>
    </div>
);

export default Badge;