import React, { useCallback, useMemo } from 'react';

import utils from 'utils';

import styling from './Evolution.module.scss';

const Evolution = ({ data = {} }) => {
    
    const prepareData = useCallback((data) => {
        const format = (key) => ({ day: key, count: data[key] });
        const ascending = (a, b) => a.day - b.day;
        
        const evolution = Object.keys(data).map(format).sort(ascending);
        const reducedEvolution = evolution.slice(Math.max(evolution.length - 15, 0));
        const largest = reducedEvolution.reduce((a, c) => c.count > a ? c.count : a, 0);
        
        return { evolution: reducedEvolution, largest };
    }, []);
    
    const { evolution, largest } = useMemo(() => prepareData(data), [data, prepareData]);
    
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