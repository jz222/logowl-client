import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import Nav from '../nav/Nav';
import Sidebar from '../sidebar/Sidebar';
import Spinner from 'components/UI/spinner/Spinner';

import { useStore } from 'context';
import fetchClient from 'fetchClient';
import utils from 'utils';

import styling from './Blueprint.module.scss';

const Blueprint = ({ children, history }) => {
    const [store, dispatch] = useStore();
    
    const [loading, setLoading] = useState(true);
    
    
    /**
     * Fetches the user's data.
     * @type {(...args: any[]) => any}
     */
    const fetchUserData = useCallback(async () => {
        try {
            const accessPass = localStorage.getItem('access-pass');
            const expirationTime = localStorage.getItem('expiration-time');
            
            if (!accessPass || !expirationTime || new Date(parseInt(expirationTime)) < new Date()) {
                history.push('/auth/signin');
                return;
            }
            
            const user = await fetchClient('getUser');
            
            utils.expirationHandler(history, +expirationTime);
            
            document.title = 'Loggy Dashboard | ' + user.organization.name;
            
            dispatch({ type: 'update', payload: user });
            setLoading(false);
            
        } catch (error) {
            console.error(error);
            localStorage.clear();
            history.push('/auth/signin');
        }
    }, [dispatch, history]);
    
    
    /**
     * Fetches the users's data if it's not available.
     */
    useEffect(() => {
        if (!store.id) {
            fetchUserData();
        }
    }, [fetchUserData, store.id]);
    
    
    // Spinner
    const spinner = (
        <div className={styling.spinner}>
            <Spinner invert />
        </div>
    );
    
    
    // Layout
    const blueprint = (
        <>
            <Sidebar />
            
            <div className={styling.content}>
                <Nav />
                
                <main>
                    {children}
                </main>
            </div>
        </>
    );
    
    
    return (loading && !store.id) ? spinner : blueprint;
};

export default withRouter(Blueprint);