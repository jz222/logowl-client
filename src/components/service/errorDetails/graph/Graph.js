import React, { useEffect, useRef, useMemo } from 'react';
import { Chart } from 'frappe-charts/dist/frappe-charts.esm';

import Badge from '../badge/Badge';

import utils from 'utils';

import styling from './Graph.module.scss';

const Graph = ({ data = {}, firstSeen, lastSeen }) => {
    
    const chart = useRef({});
    
    const { evolution, largest } = useMemo(() => utils.computeEvolution(data), [data]);
    
    /**
     * Loads the chart if the component is mounted.
     * It removes its event listeners on unmount.
     */
    useEffect(() => {
        if (!Object.keys(data).length) {
            return;
        }
        
        const labels = evolution.map(day => day.day);
        const values = evolution.map(day => day.count);
        
        const chartInstance = new Chart(chart.current, {
            data: {
                labels,
                datasets: [{ values }]
            },
            type: 'line',
            height: 300,
            lineOptions: {
                dotSize: 8
            },
            colors: ['#ff0353']
        });
        
        return () => chartInstance.destroy();
        
    }, [data, evolution]);
    
    return (
        <section className={styling.evolution}>
            <h4>Evolution</h4>
            
            <Badge name='first seen' value={utils.getDateWithTime(firstSeen)} />
            <Badge name='last seen' value={utils.getDateWithTime(lastSeen)} />
            <Badge name='peak' value={largest} />
            
            <div className={styling.chart} ref={chart} />
        </section>
    );
};

export default Graph;