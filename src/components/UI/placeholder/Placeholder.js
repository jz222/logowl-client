import React from 'react';
import { FiActivity } from 'react-icons/fi';

import styling from './Placeholder.module.scss';

const Placeholder = ({ children }) => (
    <div className={styling.wrapper}>
        <div className={styling.icon}>
            <FiActivity />
        </div>
        
        {children}
    </div>
);

export default Placeholder;