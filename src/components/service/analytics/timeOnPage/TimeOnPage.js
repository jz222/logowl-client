import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import { FaInfo } from 'react-icons/fa';

import config from 'config';

import styling from './TimeOnPage.module.scss';

const TimeOnPage = ({ pageViews = [] }) => {
    const chart = useRef({});
    
    useEffect(() => {
        const ctx = chart.current.getContext('2d');
        
        const data = [];
        const labels = [];
        
        for (let pageView of pageViews) {
            data.push(Math.floor(pageView.totalTimeOnPage / (pageView.visits - pageView.mobile)));
            labels.push(pageView.day);
        }
        
        const chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        data,
                        label: 'Average Time on Page in Seconds',
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
            <a
                className={styling.info}
                href='https://docs.logowl.io/docs/enabling-analytics#known-issues-and-limitations'
                target='_blank'
                rel='noopener noreferrer'
            >
                <FaInfo />
            </a>
            
            <div className={styling.disclaimer}>
                Due to technical limitations mobile devices are excluded in the calculations below. Read more about this
                topic in our documentation.
            </div>
            
            <canvas ref={chart} />
        </div>
    );
};

export default TimeOnPage;