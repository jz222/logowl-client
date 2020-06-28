import React, { useCallback, useEffect, useState } from 'react';

import { LoadingSpinner } from 'components/UI/spinner/Spinner';
import Placeholder from 'components/UI/placeholder/Placeholder';
import PageViewsChart from './pageViewsChart/PageViewsChart';
import DoughnutChart from './doughnutChart/DoughnutChart';
import TotalNumbers from './totalNumbers/TotalNumbers';
import VisitedPages from './visitedPages/VisitedPages';
import TimeOnPage from './timeOnPage/TimeOnPage';
import Button from 'components/UI/button/Button';
import Header from './header/Header';

import { useStore } from 'context';
import fetchClient from 'fetchClient';
import config from 'config';
import utils from 'utils';

import styling from './Analytics.module.scss';

const Analytics = ({ serviceId = '' }) => {
    const [, , setError] = useStore();
    
    const [state, setState] = useState({
        mode: 'today',
        timeframeStart: Date.now(),
        timeframeEnd: Date.now(),
        totalVisits: 0,
        totalNewVisitors: 0,
        totalSessions: 0,
        pageViews: [],
        isLoading: true
    });
    
    const {
        mode,
        timeframeStart,
        timeframeEnd,
        totalVisits,
        totalNewVisitors,
        totalSessions,
        pageViews,
        isLoading
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
            setState(prevState => ({ ...prevState, isLoading: true }));
            
            const url = '/event/' + serviceId + '/analytics';
            const queryParam = '?mode=' + mode;
            
            const res = await fetchClient('getAnalytics', null, url + queryParam);
            
            if (!res.pageViews || !Array.isArray(res.pageViews)) {
                res.pageViews = [];
            }
            
            // If mode is today then format the hour timestamp.
            // For all other modes format the day timestamp.
            // This is necessary to have human readable labels
            // on the graph.
            res.pageViews = res.pageViews.map(pageView => {
                pageView.day = (mode === 'today') ? utils.getTime(pageView.hour, true) : utils.getDate(pageView.day);
                return pageView;
            });
            
            setState(prevState => ({ ...prevState, ...(res || {}), isLoading: false }));
            
        } catch (error) {
            console.error(error);
            setState(prevState => ({ ...prevState, isLoading: false }));
            setError(error);
        }
    }, [mode, serviceId, setError]);
    
    
    /**
     * Fetch analytic data when fetchAnalyticData updates.
     */
    useEffect(() => {
        fetchAnalyticData();
    }, [fetchAnalyticData]);
    
    
    if (isLoading) {
        return <LoadingSpinner />;
    }
    
    const placeholder = (
        <Placeholder>
            <h4>No analytic data available</h4>
            
            <p>Install and configure the adapter to use analytics</p>
            
            <Button onClick={() => window.open(config.links.adapters.browser, '_blank').focus()}>
                Get Started
            </Button>
        </Placeholder>
    );
    
    const analyticData = (
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
            
            <div className={styling.row}>
                <div className={styling.item}>
                    <DoughnutChart pageViews={pageViews} title='Browsers' type='browsers' />
                </div>
                
                <div className={styling.item}>
                    <DoughnutChart pageViews={pageViews} title='Referrer' type='referrer' />
                </div>
                
                <div className={styling.item}>
                    <DoughnutChart pageViews={pageViews} title='Devices' type='devices' />
                </div>
            </div>
            
            <VisitedPages pageViews={pageViews} />
            
            <TimeOnPage pageViews={pageViews} />
        </>
    );
    
    
    return pageViews.length ? analyticData : placeholder;
};

export default Analytics;
