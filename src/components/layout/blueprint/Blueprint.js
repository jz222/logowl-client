import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import Nav from '../nav/Nav';
import Sidebar from '../sidebar/Sidebar';
import Spinner from 'components/UI/spinner/Spinner';

import { useStore } from 'context';
import fetchClient from 'fetchClient';

import styling from './Blueprint.module.scss';

const Blueprint = ({ children, history }) => {
    const [store, dispatch] = useStore();
    const [loading, setLoading] = useState(true);
    
    const fetchUserData = useCallback(async () => {
        try {
            const accessPass = localStorage.getItem('access-pass');
            const expirationTime = localStorage.getItem('expiration-time');
            
            if (!accessPass || !expirationTime || new Date(parseInt(expirationTime)) < new Date()) {
                history.push('/login');
                return;
            }
            
            const user = await fetchClient('getUser');
            
            dispatch({ type: 'update', payload: user });
            setLoading(false);
            
        } catch (error) {
            console.error(error);
            history.push('/login');
        }
    }, [dispatch, history]);
    
    useEffect(() => {
        if (!store.userId) {
            fetchUserData();
        }
    }, [fetchUserData, store.userId]);
    
    const spinner = (
        <div className={styling.spinner}>
            <Spinner invert />
        </div>
    );
    
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
    
    return (loading && !store.userId) ? spinner : blueprint;
};

export default withRouter(Blueprint);