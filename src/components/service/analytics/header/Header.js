import React, { useRef } from 'react';

import Dropdown from 'components/UI/dropdown/Dropdown';

import utils from 'utils';

import styling from './Header.module.scss';

const Header = ({ mode, timeframeStart, timeframeEnd, dropdownHandler }) => {
    const prevTimeframeStart = useRef(timeframeStart);
    const prevTimeframeEnd = useRef(timeframeEnd);
    const prevData = useRef(null);
    
    // If the mode has changed but the data hasn't been
    // received yet, return the unchanged component.
    if (timeframeStart === prevTimeframeStart.current && timeframeEnd === prevTimeframeEnd.current && prevData.current) {
        return prevData.current;
    }
    
    prevTimeframeStart.current = timeframeStart;
    prevTimeframeEnd.current = timeframeEnd;
    
    // Available dropdown options
    const timeFrames = [
        { key: 'Today', value: 'today', id: 'today' },
        { key: 'Last 7 Days', value: 'lastSevenDays', id: 'lastSevenDays' },
        { key: 'Last 14 Days', value: 'lastFourteenDays', id: 'lastFourteenDays' },
        { key: 'Last Month', value: 'lastMonth', id: 'lastMonth' }
    ];
    
    // Title and subtitle
    let title;
    let timeframe;
    
    switch (mode) {
        case 'today':
            title = 'Today';
            timeframe = utils.getDateWithWeekday(Date.now());
            break;
        case 'lastSevenDays':
            title = 'Last 7 Days';
            timeframe = utils.getDateWithWeekday(timeframeStart) + ' - ' + utils.getDateWithWeekday(timeframeEnd);
            break;
        case 'lastFourteenDays':
            title = 'Last 14 Days';
            timeframe = utils.getDateWithWeekday(timeframeStart) + ' - ' + utils.getDateWithWeekday(timeframeEnd);
            break;
        case 'lastMonth':
            title = 'Last Month';
            timeframe = utils.getDateWithWeekday(timeframeStart) + ' - ' + utils.getDateWithWeekday(timeframeEnd);
            break;
        default:
            title = '';
            timeframe = '';
    }
    
    // JSX elements
    const content = (
        <div className={styling.header}>
            <div>
                <h2>{title}</h2>
                <h5>{timeframe}</h5>
            </div>
            
            <div className={styling.dropdown}>
                <Dropdown selected={mode} items={timeFrames} changeHandler={dropdownHandler} />
            </div>
        </div>
    );
    
    prevData.current = content;
    
    return content;
};

export default Header;