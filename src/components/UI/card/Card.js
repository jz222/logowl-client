import React from 'react';

import styling from './Card.module.scss';

const Card = ({ children }) => {
    return (
        <div className={styling.card}>
            {children}
        </div>
    );
};

export const Header = ({ icon, children }) => (
    <>
        <div className={styling.icon}>{icon}</div>
        
        <h3>{children}</h3>
    </>
);

export const Title = ({ icon, children }) => (
    <div className={styling.title}>{icon} <span>{children}</span></div>
);

export default Card;