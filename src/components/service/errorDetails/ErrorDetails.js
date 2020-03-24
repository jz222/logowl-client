import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

import Header from './header/Header';
import Graph from './graph/Graph';

import styling from './ErrorDetails.module.scss';

const ErrorDetails = ({ history, match }) => {
    const [state, setState] = useState({
        id: '',
        adapter: {},
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
        adapter,
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
        updatedAt
    } = state;
    
    
    const fetchErrorDetails = useCallback(async () => {
        if (history.location.state && history.location.state.id) {
            setState(prevState => ({ ...prevState, ...history.location.state }));
        }
    }, [history.location.state]);
    
    
    const resolveHandler = () => {
        setState(prevState => ({ ...prevState, resolved: !prevState.resolved }))
    };
    
    
    const backHandler = () => history.push('/services/' + match.params.serviceId);
    
    
    useEffect(() => {
        fetchErrorDetails();
    }, [fetchErrorDetails]);
    
    
    return (
        <>
            <button className={styling.back} onClick={backHandler}>
                <FiChevronLeft /> All errors
            </button>
            
            <Header
                type={type}
                adapter={adapter}
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