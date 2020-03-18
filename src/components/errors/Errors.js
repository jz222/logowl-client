import React, { useState, useEffect } from 'react';

import Event from '../UI/event/Event';
import Title from '../UI/title/Title';
import Placeholder from '../UI/placeholder/Placeholder';

import fetchClient from 'fetchClient';

import styling from './Errors.module.scss';

const Errors = () => {
    const [{ logs }, setState] = useState({
        logs: []
    });
    
    const fetchLogs = async () => {
        try {
            const res = await fetchClient('getAllErrors');
            
            res.reverse();
            
            setState(prevState => ({...prevState, logs: [...res] }));
            
        } catch(error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchLogs();
        setInterval(() => fetchLogs(), 2500);
    }, []);
    
    const placeholder = (
        <Placeholder title='No errors available'></Placeholder>
    );
    
    const errors = (
        <ul className={styling.content}>
            {logs.map(log => (
                <Event key={log.fingerprint}>{log.message}</Event>
            ))}
        </ul>
    );
    
    return (
        <>
            <Title>Errors</Title>
            
            {logs.length ? errors : placeholder}
        </>
    )
};

export default Errors;