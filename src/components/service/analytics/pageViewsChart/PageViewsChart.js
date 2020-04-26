import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import config from 'config';

import styling from './PageViewsChart.module.scss';

const PageViewsChart = ({ pageViews = [] }) => {
    const chart = useRef({});
    
    /**
     * Renders a mixed chart for the given page views.
     */
    useEffect(() => {
        const ctx = chart.current.getContext('2d');
        
        const visits = [];
        const labels = [];
        const sessions = [];
        const newVisitors = [];
        
        for (let pageView of pageViews || []) {
            labels.push(pageView.day || '');
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
                        ...config.graph.getLineOptions(ctx, false)
                    },
                    {
                        label: 'Sessions',
                        data: sessions,
                        ...config.graph.getBarOptions1()
                    },
                    {
                        label: 'New Visitors',
                        data: newVisitors,
                        ...config.graph.getBarOptions2()
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

export default PageViewsChart;