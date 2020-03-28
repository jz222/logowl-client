import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft, FiTrash2 } from 'react-icons/fi';

import { Action } from 'components/UI/button/Button';
import Stepper from 'components/UI/stepper/Stepper';
import Stacktrace from './stacktrace/Stacktrace';
import Header from './header/Header';
import Badges from './badges/Badges';
import Graph from './graph/Graph';
import Logs from './logs/Logs';

import fetchClient from 'fetchClient';
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
        updatedAt: ''
    });
    
    const {
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
    
    
    /**
     * Deletes an error with the given ID.
     * @returns {Promise<void>}
     */
    const deleteError = async () => {
        try {
            const url = '/event/' + match.params.serviceId + '/error/' + match.params.errorId;
            
            const res = await fetchClient('deleteError', null, url);
            
            if (res.ok) {
                history.push('/services/' + match.params.serviceId);
            }
            
        } catch (error) {
            console.error(error);
        }
    };
    
    
    /**
     * Toggles the status of an error with the given ID.
     */
    const resolveHandler = async () => {
        try {
            setState(prevState => ({ ...prevState, resolved: !prevState.resolved }));
            
            const url = '/event/' + match.params.serviceId + '/error/' + match.params.errorId;
            
            const res = await fetchClient('updateError', { resolved: !resolved }, url);
            
            if (!res.ok) {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    
    /**
     * Navigates to the service overview.
     * @returns {void|boolean|*|number}
     */
    const backHandler = () => history.push('/services/' + match.params.serviceId);
    
    
    useEffect(() => {
        fetchErrorDetails();
    }, [fetchErrorDetails]);
    
    
    const currentService = store.services.find(service => service.id === match.params.serviceId);
    
    
    return (
        <>
            <Stepper steps={['services', currentService.name, 'error']} />
            
            <div className={styling.bar}>
                <button className={styling.back} onClick={backHandler}>
                    <FiChevronLeft /> All errors
                </button>
                
                <div className={styling.actions}>
                    <Action icon={<FiTrash2 />} onClick={deleteError}>Delete</Action>
                </div>
            </div>
            
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
            
            <Graph data={evolution} firstSeen={timestamp} lastSeen={updatedAt} />
            
            <Stacktrace snippet={snippet} stacktrace={stacktrace} path={path} line={line} />
            
            <Logs logs={logs} />
        </>
    );
};

export default ErrorDetails;