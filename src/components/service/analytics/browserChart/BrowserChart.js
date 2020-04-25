import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import config from 'config';

import styling from './BrowserChart.module.scss';

const BrowserChart = ({ pageViews = [] }) => {
    const chart = useRef({});
    
    useEffect(() => {
        const ctx = chart.current.getContext('2d');
        
        const data = [];
        const labels = [];
        
        let chrome = 0;
        let safari = 0;
        let firefox = 0;
        let opera = 0;
        let edge = 0;
        let ie = 0;
        let others = 0;
        
        for (let pageView of pageViews) {
            chrome += pageView.chrome || 0;
            safari += pageView.safari || 0;
            firefox += pageView.firefox || 0;
            opera += pageView.opera || 0;
            edge += pageView.edge || 0;
            ie += pageView.ie || 0;
            others += pageView.others || 0;
        }
        
        if (chrome) {
            data.push(chrome);
            labels.push('Chrome');
        }
        
        if (safari) {
            data.push(safari);
            labels.push('Safari');
        }
        
        if (firefox) {
            data.push(firefox);
            labels.push('Firefox');
        }
        
        if (opera) {
            data.push(edge);
            labels.push('Edge');
        }
        
        if (ie) {
            data.push(ie);
            labels.push('IE');
        }
        
        if (others) {
            data.push(others);
            labels.push('Others');
        }
        
        const chartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data,
                    borderColor: '#fff',
                    backgroundColor: ['#5d77fe', '#7bd6fd', '#07BEB8', '#3dccc7', '#68D8D6', '#9CEAEF', '#c4fff9'],
                    borderWidth: 0
                }],
                labels
            },
            options: config.graph.getGraphOptions(false, true)
        });
        
        return () => chartInstance.destroy();
    }, [pageViews]);
    
    return (
        <div className={styling.chart}>
            <canvas ref={chart} />
        </div>
    );
};

export default BrowserChart;