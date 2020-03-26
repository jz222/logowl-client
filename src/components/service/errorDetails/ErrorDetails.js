import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

import Stepper from 'components/UI/stepper/Stepper';
import Header from './header/Header';
import Badges from './badges/Badges';
import Graph from './graph/Graph';

import { useStore } from 'context';

import styling from './ErrorDetails.module.scss';

const ErrorDetails = ({ history, match }) => {
    const [store] = useStore();
    
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
        resolved: history.location.state.resolved || false,
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
    
    
    const currentService = store.services.find(service => service.id === match.params.serviceId);
    
    
    return (
        <>
            <Stepper steps={['services', currentService.name, 'error']} />
            
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
            
            <Badges badges={badges} />
            
            <Graph data={evolution} />
        </>
    );
};

export default ErrorDetails;