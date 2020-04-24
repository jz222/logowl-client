import React, { useEffect, useMemo, useRef } from 'react';
import Chart from 'chart.js';

import Badge from '../badge/Badge';

import config from 'config';
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
        if (!Object.keys(data || {}).length) {
            return;
        }
        
        const labels = evolution.map(day => day.day);
        const values = evolution.map(day => day.count);
        
        const ctx = chart.current.getContext('2d');
        
        const chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Occurrences',
                        data: [0, ...values],
                        ...config.graph.lineOptions,
                        backgroundColor: '#FF0055',
                        borderColor: '#FF0055'
                    }
                ],
                labels: ['', ...labels]
            },
            options: config.graph.getGraphOptions(true)
        });
        
        return () => chartInstance.destroy();
        
    }, [data, evolution]);
    
    return (
        <section className={styling.evolution}>
            <h4>Evolution</h4>
            
            <Badge name='first seen' value={utils.getDateWithTime(firstSeen)} />
            <Badge name='last seen' value={utils.getDateWithTime(lastSeen)} />
            <Badge name='peak' value={largest} />
            
            <div className={styling.chart}>
                <canvas ref={chart} />
            </div>
        </section>
    );
};

export default Graph;