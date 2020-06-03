import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

import config from 'config';

import styling from './DoughnutChart.module.scss';

const DoughnutChart = ({ pageViews = [], title = '', type = 'browsers' }) => {
    const chart = useRef({});
    
    /**
     * Aggregates browser data for the given metrics.
     * @param pageViews {array} contains analytic data
     * @returns {{data: [], labels: []}}
     */
    const aggregateBrowserData = (pageViews) => {
        const data = [];
        const labels = [];
        
        let chrome = 0;
        let safari = 0;
        let firefox = 0;
        let opera = 0;
        let edge = 0;
        let ie = 0;
        let otherBrowsers = 0;
        
        for (let pageView of pageViews) {
            chrome += pageView.chrome || 0;
            safari += pageView.safari || 0;
            firefox += pageView.firefox || 0;
            opera += pageView.opera || 0;
            edge += pageView.edge || 0;
            ie += pageView.ie || 0;
            otherBrowsers += pageView.otherBrowsers || 0;
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
            data.push(opera);
            labels.push('Opera');
        }
        
        if (edge) {
            data.push(edge);
            labels.push('Edge');
        }
        
        if (ie) {
            data.push(ie);
            labels.push('IE');
        }
        
        if (otherBrowsers) {
            data.push(otherBrowsers);
            labels.push('Others');
        }
        
        return { data, labels };
    };
    
    
    /**
     * Aggregates referrer data for the given metrics.
     * @param pageViews {array} contains analytic data
     * @returns {{data: [], labels: []}}
     */
    const aggregateReferrerData = (pageViews) => {
        const data = [];
        const labels = [];
        
        const aggregatedResult = {};
        
        for (let pageView of pageViews) {
            for (let [key, value] of Object.entries(pageView.referrer || {})) {
                if (key in aggregatedResult) {
                    aggregatedResult[key] += value;
                } else {
                    aggregatedResult[key] = value;
                }
            }
        }
        
        for (let [key, value] of Object.entries(aggregatedResult)) {
            labels.push(key.replace('%2E', '.'));
            data.push(value);
        }
        
        return { data, labels };
    };
    
    
    /**
     * Aggregates device data for the given metrics.
     * @param pageViews {array} contains analytic data
     * @returns {{data: [], labels: []}}
     */
    const aggregateDeviceData = (pageViews) => {
        const data = [];
        const labels = [];
        
        let mobile = 0;
        let tablet = 0;
        let desktop = 0;
        
        for (let pageView of pageViews) {
            mobile += pageView.mobile || 0;
            tablet += pageView.tablet || 0;
            desktop += pageView.desktop || 0;
        }
        
        if (mobile) {
            data.push(mobile);
            labels.push('mobile');
        }
        
        if (tablet) {
            data.push(tablet);
            labels.push('tablet');
        }
        
        if (desktop) {
            data.push(desktop);
            labels.push('desktop');
        }
        
        return { data, labels };
    };
    
    
    /**
     * Renders the graph for the given analytic data.
     */
    useEffect(() => {
        const ctx = chart.current.getContext('2d');
        
        let labels = [];
        let data = [];
        
        if (type === 'browsers') {
            const aggregatedData = aggregateBrowserData(pageViews);
            
            labels = aggregatedData.labels;
            data = aggregatedData.data;
        }
        
        if (type === 'referrer') {
            const aggregatedData = aggregateReferrerData(pageViews);
            
            labels = aggregatedData.labels;
            data = aggregatedData.data;
        }
        
        if (type === 'devices') {
            const aggregatedData = aggregateDeviceData(pageViews);
            
            labels = aggregatedData.labels;
            data = aggregatedData.data;
        }
        
        const options = config.graph.getGraphOptions(false, true);
        
        options.layout.padding.top = 10;
        
        const chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data,
                    ...config.graph.getDoughnutOptions()
                }],
                labels
            },
            options
        });
        
        return () => chartInstance.destroy();
    }, [pageViews, type]);
    
    
    return (
        <div className={styling.card}>
            <h3>{title}</h3>
            <div className={styling.chart}>
                <canvas ref={chart} />
            </div>
        </div>
    );
};

export default DoughnutChart;