import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import PaymentFlow from 'components/paymentFlow/PaymentFlow';
import Spinner from 'components/UI/spinner/Spinner';
import Modal from 'components/UI/modal/Modal';
import Sidebar from '../sidebar/Sidebar';
import Nav from '../nav/Nav';

import { useStore } from 'context';
import fetchClient from 'fetchClient';
import utils from 'utils';

import styling from './Blueprint.module.scss';

const Blueprint = ({ children, history }) => {
    const [store, dispatch] = useStore();
    
    const [loading, setLoading] = useState(true);
    const [startPaymentFlow, setStartPaymentFlow] = useState(false);
    
    
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
            
            if (!user.organization.isSetUp) {
                setTimeout(() => setStartPaymentFlow(true), 1000);
            }
            
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
        } else if (!store.organization.isSetUp) {
            setTimeout(() => setStartPaymentFlow(true), 1000);
        }
    }, [fetchUserData, store.id, store.organization.isSetUp]);
    
    
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
            
            <Modal open={startPaymentFlow}>
                <PaymentFlow endPaymentFlow={() => setStartPaymentFlow(false)} />
            </Modal>
        </>
    );
    
    
    return (loading && !store.id) ? spinner : blueprint;
};

export default withRouter(Blueprint);