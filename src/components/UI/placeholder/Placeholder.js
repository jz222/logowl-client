import React from 'react';
import { FiActivity } from 'react-icons/fi';

import styling from './Placeholder.module.scss';

const Placeholder = ({ title, children }) => {
    return (
        <div className={styling.wrapper}>
            <div className={styling.icon}>
                <FiActivity />
            </div>
            
            <h3>{title}</h3>
            
            {children}
        </div>
    );
};

export default Placeholder;