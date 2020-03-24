import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

import Header from './header/Header';
import Graph from './graph/Graph';

import styling from './ErrorDetails.module.scss';

const ErrorDetails = ({ history }) => {
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
        resolved: false,
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
        resolved,
        createdAt,
        updatedAt,
        errorListPath
    } = state;
    
    
    const fetchErrorDetails = useCallback(async () => {
        if (history.location.state && history.location.state.id) {
            setState(prevState => ({ ...prevState, ...history.location.state }));
        }
    }, [history.location.state]);
    
    
    const resolveHandler = () => {
        setState(prevState => ({ ...prevState, resolved: !prevState.resolved }))
    };
    
    
    const backHandler = () => history.push(errorListPath);
    
    
    useEffect(() => {
        fetchErrorDetails();
    }, [fetchErrorDetails]);
    
    
    return (
        <>
            <button className={styling.back} onClick={backHandler} disabled={!errorListPath}>
                <FiChevronLeft /> All errors
            </button>
            
            <Header
                type={type}
                message={message}
                evolution={evolution}
                fingerprint={fingerprint}
                count={count}
                createdAt={createdAt}
                updatedAt={updatedAt}
                resolved={resolved}
                resolveHandler={resolveHandler}
            />
            
            <hr />
            
            <Graph data={evolution} />
        </>
    );
};

export default ErrorDetails;