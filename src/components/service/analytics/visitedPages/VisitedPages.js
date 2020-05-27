import React from 'react';

import styling from './VisitedPages.module.scss';

const VisitedPages = ({pageViews = []}) => {
    const aggregatedPageViews = {};
    
    // Aggregate page views for the current period
    for(let pageView of pageViews || []) {
        for(let key in pageView.pages || {}) {
            if(key in aggregatedPageViews) {
                aggregatedPageViews[key] += pageView.pages[key];
            } else {
                aggregatedPageViews[key] = pageView.pages[key];
            }
        }
    }
    
    return (
        <div className={styling.visitedPages}>
            <h3>Visited Pages</h3>
            <ul>
                {Object.keys(aggregatedPageViews).map(key => (
                    <li key={key}>
                        <span>{key}</span>
                        <span>{aggregatedPageViews[key]} views</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VisitedPages;