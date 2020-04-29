import React, { useEffect, useRef, useState } from 'react';
import { FiActivity, FiEye, FiUsers } from 'react-icons/fi';

import styling from './TotalNumbers.module.scss';

/**
 * Animates changes of a given number.
 * @param newNumber {int} the number that should be shown with a count animation
 * @returns {jsx} the animated number
 */
const Counter = ({ number: newNumber }) => {
    const [number, setNumber] = useState(0);
    
    const prevNumber = useRef(0);
    const timer = useRef(0);
    
    useEffect(() => {
        clearInterval(timer.current);
        
        const start = prevNumber.current;
        const end = newNumber;
        
        const range = end - start;
        const minTime = 0;
        const duration = 500;
        
        let stepTime = Math.abs(Math.floor(duration / range));
        
        stepTime = Math.max(stepTime, minTime);
        
        const startTime = new Date().getTime();
        const endTime = startTime + duration;
        
        const count = () => {
            const now = new Date().getTime();
            const remaining = Math.max((endTime - now) / duration, 0);
            const value = Math.round(end - (remaining * range));
            
            setNumber(value);
            
            if (value === end) {
                clearInterval(timer.current);
                prevNumber.current = newNumber;
            }
        };
        
        timer.current = setInterval(count, stepTime);
        count();
        
    }, [newNumber]);
    
    return <h3>{number}</h3>;
};

const TotalNumbers = ({ visits, newVisitors, sessions }) => (
    <div className={styling.totalNumbers}>
        <div className={styling.card}>
            <FiActivity />
            
            <div>
                <Counter number={visits} />
                <h5>Page Visits</h5>
            </div>
        </div>
        
        <div className={styling.card}>
            <FiUsers />
            
            <div>
                <Counter number={newVisitors} />
                <h5>New Visitors</h5>
            </div>
        </div>
        
        <div className={styling.card}>
            <FiEye />
            
            <div>
                <Counter number={sessions} />
                <h5>Sessions</h5>
            </div>
        </div>
    </div>
);

export default TotalNumbers;