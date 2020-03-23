import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/all';

import styling from './ErrorDetails.module.scss';

const ErrorDetails = ({ history, match }) => {
    const [state, setState] = useState({
        id: '',
        message: '',
        stacktrace: '',
        evolution: {},
        path: '',
        line: '',
        type: '',
        fingerprint: '',
        badges: {},
        snippet: {},
        logs: [],
        ticket: '',
        host: '',
        userAgent: '',
        clientIp: '',
        count: 0,
        timestamp: 0,
        createdAt: '',
        updatedAt: '',
        errorListPath: ''
    });
    
    const {
        id,
        message,
        stacktrace,
        evolution,
        path,
        line,
        type,
        fingerprint,
        badges,
        snippet,
        logs,
        ticket,
        host,
        userAgent,
        clientIp,
        count,
        timestamp,
        createdAt,
        updatedAt,
        errorListPath
    } = state;
    
    
    const fetchErrorDetails = useCallback(async () => {
        if (history.location.state && history.location.state.id) {
            setState(prevState => ({ ...prevState, ...history.location.state }));
        }
    }, [history.location.state]);
    
    
    const backHandler = () => history.push(errorListPath);
    
    
    useEffect(() => {
        fetchErrorDetails();
    }, [fetchErrorDetails]);
    
    return (
        <>
            <button className={styling.back} onClick={backHandler} disabled={!errorListPath}>
                <FiChevronLeft /> All errors
            </button>
            
            <section>
                <div></div>
            </section>
            
            <h2>{message}</h2>
            
            <hr />
        </>
    );
};

export default ErrorDetails;