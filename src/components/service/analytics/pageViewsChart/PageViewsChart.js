import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import config from 'config';
import utils from 'utils';

import styling from './PageViewsChart.module.scss';

const PageViewsChart = ({ pageViews = [], mode = '' }) => {
    const chart = useRef({});
    
    useEffect(() => {
        const ctx = chart.current.getContext('2d');
        
        const visits = [];
        const labels = [];
        const sessions = [];
        const newVisitors = [];
        
        for (let pageView of pageViews || []) {
            pageView.unit = (mode === 'today') ? utils.getTime(pageView.unit, true) : utils.getDate(pageView.unit);
            
            labels.push(pageView.unit || '');
            visits.push(pageView.visits || 0);
            sessions.push(pageView.sessions || 0);
            newVisitors.push(pageView.newVisitors || 0);
        }
        
        const chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                datasets: [
                    {
                        label: 'Visits',
                        data: visits,
                        ...config.graph.lineOptions
                    },
                    {
                        label: 'Sessions',
                        data: sessions,
                        ...config.graph.barOptions1
                    },
                    {
                        label: 'New Visitors',
                        data: newVisitors,
                        ...config.graph.barOptions2
                    }
                ],
                labels
            },
            options: config.graph.getGraphOptions(true, false, true)
        });
        
        return () => chartInstance.destroy();
    }, [mode, pageViews]);
    
    return (
        <div className={styling.chart}>
            <canvas ref={chart} />
        </div>
    );
};

export default PageViewsChart;