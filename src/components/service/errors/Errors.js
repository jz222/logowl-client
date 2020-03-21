import React, { useCallback, useEffect, useState } from 'react';

import Placeholder from 'components/UI/placeholder/Placeholder';
import Spinner from 'components/UI/spinner/Spinner';
import Button from 'components/UI/button/Button';
import Event from 'components/UI/event/Event';

import fetchClient from 'fetchClient';
import config from 'config';
import utils from 'utils';

import styling from './Errors.module.scss';

const Errors = ({ id }) => {
    const [state, setState] = useState({
        errors: [],
        loading: true,
        pageLoading: false,
        currentPage: 0,
        fetchError: '',
        fetchedAll: false
    });
    
    const { errors, loading, pageLoading, currentPage, fetchError, fetchedAll } = state;
    
    const fetchErrorsWithPointer = async () => {
        try {
            setState(prevState => ({ ...prevState, pageLoading: true }));
            
            const pointer = '/event/' + id + '/error/all/' + (currentPage + 1);
            
            const res = await fetchClient('getAllErrors', null, pointer);
            
            if (!Array.isArray(res) && res && res.message) {
                throw new Error((res && res.message) || 'failed to fetch errors');
            }
            
            if (res === null || res.length < 5) {
                setState(prevState => ({ ...prevState, pageLoading: false, fetchedAll: true }));
                return;
            }
            
            setState(prevState => ({
                ...prevState,
                errors: [...prevState.errors, ...res],
                pageLoading: false,
                currentPage: prevState.currentPage + 1
            }));
            
        } catch (error) {
            setState(prevState => ({ ...prevState, pageLoading: false, fetchError: error.message }));
        }
    };
    
    /**
     * Fetches all the latest logs for a given service.
     * @type {(...args: any[]) => any}
     */
    const fetchErrors = useCallback(async () => {
        try {
            setState(prevState => ({ ...prevState, loading: true }));
            
            const fetchingStart = new Date().getTime();
            
            const res = await fetchClient('getAllErrors', null, '/event/' + id + '/error/all');
            
            if (!Array.isArray(res)) {
                throw new Error((res && res.message) || 'failed to fetch errors');
            }
            
            const fetchingTime = new Date().getTime() - fetchingStart;
            
            if (fetchingTime < 800) {
                await utils.sleep(700);
            }
            
            setState(prevState => ({
                ...prevState,
                errors: res,
                loading: false,
                currentPage: 0
            }));
            
        } catch (error) {
            setState(prevState => ({ ...prevState, loading: false, fetchError: error.message }));
        }
    }, [id]);
    
    
    useEffect(() => {
        fetchErrors();
    }, [fetchErrors]);
    
    
    // Spinner for initial loading
    const spinner = (
        <div className={styling.spinner}>
            <Spinner invert />
            <h4>loading</h4>
        </div>
    );
    
    
    // Spinner shown when next page is loading
    const pageSpinner = <Spinner invert />;
    
    
    // Button to load next page
    const loadPage = <Button onClick={fetchErrorsWithPointer} hidden={fetchedAll}>Load more</Button>;
    
    
    // Placeholder if no errors available
    const placeholder = (
        <Placeholder title='No errors available'>
            <h4>Connect your Service</h4>
            
            <p>Install the NodeJS adapter to register errors</p>
            
            <Button
                onClick={() => window.open(config.links.loggyAdapterNodeJS, '_blank').focus()}
            >
                Get the Adapter
            </Button>
        </Placeholder>
    );
    
    
    // List of errors
    const errorList = (
        <ul>
            {errors.map(error => (
                <Event key={error.fingerprint}>
                    <div className={styling.error}>
                        <div className={styling.cell}>
                            <div>{error.message}</div>
                            <div>{error.type}</div>
                        </div>
                        
                        <div>
                            <div className={styling.cell}>
                                <div>{utils.getDate(error.createdAt)}</div>
                                <div>first seen</div>
                            </div>
                        </div>
                        
                        <div>
                            <div className={styling.cell}>
                                <div>{utils.getDate(error.updatedAt)}</div>
                                <div>last seen</div>
                            </div>
                        </div>
                        
                        <div>
                            <div className={styling.count}>
                                <div>{error.count}</div>
                                <div>occurrences</div>
                            </div>
                        </div>
                    </div>
                </Event>
            ))}
        </ul>
    );
    
    const content = errors.length ? errorList : placeholder;
    
    return (
        <>
            {loading && spinner}
            {!loading && content}
            
            <div className={styling.page} hidden={loading || !errors.length}>
                {pageLoading ? pageSpinner : loadPage}
            </div>
        </>
    );
};

export default Errors;