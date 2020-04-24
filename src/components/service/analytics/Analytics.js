import React, { useCallback, useEffect, useState } from 'react';

import PageViewsChart from './pageViewsChart/PageViewsChart';
import Dropdown from 'components/UI/dropdown/Dropdown';

import fetchClient from 'fetchClient';

import styling from './Analytics.module.scss';

const Analytics = ({ serviceId = '' }) => {
    const [{ mode, pageViews }, setState] = useState({
        mode: 'today',
        pageViews: []
    });
    
    const dropdownHandler = (selection) => {
        setState(prevState => ({ ...prevState, mode: selection }));
    };
    
    const fetchAnalyticData = useCallback(async () => {
        try {
            const url = '/event/' + serviceId + '/analytics';
            const queryParam = '?mode=' + mode;
            
            const res = await fetchClient('getAnalytics', null, url + queryParam);
            
            setState(prevState => ({ ...prevState, ...(res || {}) }));
        } catch (error) {
            console.error(error);
        }
    }, [mode, serviceId]);
    
    useEffect(() => {
        fetchAnalyticData();
    }, [fetchAnalyticData]);
    
    const timeFrames = [
        { key: 'Today', value: 'today', id: 'today' },
        { key: 'Last 7 Days', value: 'lastSevenDays', id: 'lastSevenDays' },
        { key: 'Last 14 Days', value: 'lastFourteenDays', id: 'lastFourteenDays' },
        { key: 'Last Month', value: 'lastMonth', id: 'lastMonth' }
    ];
    
    let title;
    
    switch (mode) {
        case 'today':
            title = 'Today';
            break;
        case 'lastSevenDays':
            title = 'Last 7 Days';
            break;
        case 'lastFourteenDays':
            title = 'Last 14 Days';
            break;
        case 'lastMonth':
            title = 'Last Month';
            break;
        default:
            title = '';
    }
    
    return (
        <>
            <div className={styling.header}>
                <h3>{title}</h3>
                
                <div className={styling.dropdown}>
                    <Dropdown selected={mode} items={timeFrames} changeHandler={dropdownHandler} />
                </div>
            </div>
            
            <PageViewsChart pageViews={pageViews} mode={mode} />
        </>
    );
};

export default Analytics;
