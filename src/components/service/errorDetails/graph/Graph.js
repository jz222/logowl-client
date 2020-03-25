import React, { useEffect, useRef } from 'react';
import { Chart } from 'frappe-charts/dist/frappe-charts.esm';

import styling from './Graph.module.scss';

import utils from 'utils';

const Graph = ({ data = {} }) => {
    
    const chart = useRef({});
    
    useEffect(() => {
        if (!Object.keys(data).length) {
            return;
        }
        
        const { evolution } = utils.computeEvolution(data);
        
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
        
    }, [data]);
    
    return (
        <div className={styling.evolution}>
            <h4>Evolution</h4>
            
            <div className={styling.chart} ref={chart} />
        </div>
    );
};

export default Graph;