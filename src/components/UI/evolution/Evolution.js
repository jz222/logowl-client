import React, { useMemo } from 'react';

import utils from 'utils';

import styling from './Evolution.module.scss';

const Evolution = ({ data = {} }) => {
    
    const { evolution, largest } = useMemo(() => utils.computeEvolution(data), [data]);
    
    const calculateHeight = (count, largest) => Math.max(count * 100 / largest, 35) + '%';
    
    return (
        <div className={styling.evolution}>
            {evolution.map(day => (
                <div key={day.day} className={styling.bar} style={{ height: calculateHeight(day.count, largest) }}>
                    <div className={styling.bullet} />
                    
                    <div className={styling.tooltip}>
                        {day.count} times on {utils.getDate(day.day)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Evolution;