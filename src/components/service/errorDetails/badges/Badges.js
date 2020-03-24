import React from 'react';

import styling from './Badges.module.scss';

const Badges = ({ badges = {} }) => {
    if (!Object.keys(badges).length) {
        return null;
    }
    
    return (
        <div className={styling.badges}>
            <h4>Badges</h4>
            
            {Object.keys(badges).map(key => (
                <div className={styling.badge}>
                    <div className={styling.cell}>{key}</div>
                    <div className={styling.cell}>{badges[key]}</div>
                </div>
            ))}
        </div>
    );
};

export default Badges;