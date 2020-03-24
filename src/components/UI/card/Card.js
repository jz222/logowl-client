import React from 'react';

import styling from './Card.module.scss';

const Card = ({ children }) => {
    return (
        <div className={styling.card}>
            {children}
        </div>
    );
};

export default Card;