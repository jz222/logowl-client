import React, { useState } from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

import styling from './InfoBox.module.scss';

const InfoBox = ({ type, children, title, closeable, hidden }) => {
    const [isVisible, setIsVisible] = useState(true);
    
    return (
        <div className={styling[type]} hidden={hidden || !isVisible}>
            <div className={styling.icon}>
                <FiAlertTriangle />
                <FiX onClick={() => setIsVisible(false)} hidden={!closeable} />
            </div>
            <h6>{title}</h6>
            <p>{children}</p>
        </div>
    );
};

export default InfoBox;