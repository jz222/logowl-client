import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import config from 'config';

import styling from './SessionTime.module.scss';

const SessionTime = ({ pageViews = [] }) => {
    const chart = useRef({});
    
    useEffect(() => {
        const ctx = chart.current.getContext('2d');
        
        const data = [];
        const labels = [];
        
        for (let pageView of pageViews) {
            data.push(Math.floor(pageView.totalTimeOnPage / pageView.sessions));
            labels.push(pageView.day);
        }
        
        const chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        data,
                        label: 'Session Time in Seconds',
                        ...config.graph.getLineOptions(ctx, true)
                    }
                ],
                labels
            },
            options: config.graph.getGraphOptions()
        });
        
        return () => chartInstance.destroy();
    }, [pageViews]);
    
    return (
        <div className={styling.chart}>
            <canvas ref={chart} />
        </div>
    );
};

export default SessionTime;