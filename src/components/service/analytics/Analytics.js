import React, { useCallback, useEffect, useState } from 'react';

import PageViewsChart from './pageViewsChart/PageViewsChart';
import TotalNumbers from './totalNumbers/TotalNumbers';
import Header from './header/Header';

import fetchClient from 'fetchClient';
import utils from 'utils';

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
    
    /**
     * Handles dropdown changes.
     * @param selection {string} the selected dropdown option
     */
    const dropdownHandler = (selection) => {
        setState(prevState => ({ ...prevState, mode: selection }));
    };
    
    /**
     * Fetches analytic data for the selected mode.
     * @type {(...args: any[]) => any}
     */
    const fetchAnalyticData = useCallback(async () => {
        try {
            const url = '/event/' + serviceId + '/analytics';
            const queryParam = '?mode=' + mode;
            
            const res = await fetchClient('getAnalytics', null, url + queryParam);
            
            if (!res.pageViews || !Array.isArray(res.pageViews)) {
                console.error('failed to fetch data');
                return;
            }
            
            res.pageViews = res.pageViews.map(pageView => {
                pageView.unit = (mode === 'today') ? utils.getTime(pageView.unit, true) : utils.getDate(pageView.unit);
                
                return pageView;
            });
            
            setState(prevState => ({ ...prevState, ...(res || {}) }));
        } catch (error) {
            console.error(error);
        }
    }, [mode, serviceId]);
    
    /**
     * Fetch analytic data when fetchAnalyticData updates.
     */
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
