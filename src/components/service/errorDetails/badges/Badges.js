import React from 'react';

import Badge from '../badge/Badge';

import styling from './Badges.module.scss';

const Badges = ({ badges = {} }) => {
    if (!Object.keys(badges).length) {
        return null;
    }
    
    return (
        <section className={styling.badges}>
            <h4>Badges</h4>
            
            {Object.keys(badges).map(key => <Badge key={key} name={key} value={badges[key]} />)}
        </section>
    );
};

export default Badges;