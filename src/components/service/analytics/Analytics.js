import React, { useCallback, useEffect, useState } from 'react';

import PageViewsChart from './pageViewsChart/PageViewsChart';
import TotalNumbers from './totalNumbers/TotalNumbers';
import Header from './header/Header';

import fetchClient from 'fetchClient';

const Analytics = ({ serviceId = '' }) => {
    const [state, setState] = useState({
        mode: 'today',
        timeframeStart: Date.now(),
        timeframeEnd: Date.now(),
        totalVisits: 0,
        totalNewVisitors: 0,
        totalSessions: 0,
        pageViews: []
    });
    
    const {
        mode,
        timeframeStart,
        timeframeEnd,
        totalVisits,
        totalNewVisitors,
        totalSessions,
        pageViews
    } = state;
    
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
    
    return (
        <>
            <Header
                mode={mode}
                dropdownHandler={dropdownHandler}
                timeframeStart={timeframeStart}
                timeframeEnd={timeframeEnd}
            />
            
            <TotalNumbers
                visits={totalVisits}
                newVisitors={totalNewVisitors}
                sessions={totalSessions}
            />
            
            <PageViewsChart
                pageViews={pageViews}
                mode={mode}
            />
        </>
    );
};

export default Analytics;
