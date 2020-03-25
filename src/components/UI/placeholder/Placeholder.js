import React from 'react';
import { FiActivity, FiXCircle } from 'react-icons/fi';

import styling from './Placeholder.module.scss';

const Placeholder = ({ title, children }) => (
    <div className={styling.wrapper}>
        <div className={styling.icon}>
            <FiActivity />
        </div>
        
        <h3>{title}</h3>
        
        {children}
    </div>
);

const ErrorPlaceholder = ({ title, message }) => (
    <div className={styling.errorPlaceholder}>
        <div className={styling.icon}>
            <FiXCircle />
        </div>
        
        <h3>{title}</h3>
        
        <p>{message}</p>
    </div>
);

export { Placeholder, ErrorPlaceholder };