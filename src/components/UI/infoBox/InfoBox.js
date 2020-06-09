import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

import styling from './InfoBox.module.scss';

const InfoBox = ({ type, children, title }) => (
    <div className={styling[type]}>
        <div className={styling.icon}>
            <FiAlertTriangle />
        </div>
        <h6>{title}</h6>
        <p>{children}</p>
    </div>
);

export default InfoBox;