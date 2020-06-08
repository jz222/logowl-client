import React, { useCallback, useEffect, useState } from 'react';

import PlanDetails from '../planDetails/PlanDetails';
import Spinner from 'components/UI/spinner/Spinner';
import Button from 'components/UI/button/Button';

import getBraintreeOptions from './options';
import { useStore } from 'context';
import config from 'config';

import styling from '../PaymentFlow.module.scss';

const PaymentDetails = ({ selectedPlan, updateState, endPaymentFlow, updateCC }) => {
    const [store] = useStore();
    
    const [{ hostedFields, errorMsg, isLoading }, setState] = useState({
        hostedFields: undefined,
        errorMsg: '',
        isLoading: true
    });
    
    /**
     * Initializes the hosted fields.
     * @type {(...args: any[]) => any}
     */
    const initHostedFields = useCallback(async () => {
        try {
            const url = config.connectivity.paymentServer + '/setup';
            const res = await (await fetch(url)).json();
            
            const client = await window.braintree.client.create({
                authorization: res.token
            });
            
            const opts = getBraintreeOptions(client);
            const hostedFields = await window.braintree.hostedFields.create(opts);
            
            setState(prevState => ({ ...prevState, hostedFields, isLoading: false }));
            
        } catch (error) {
            console.error();
            
            updateState({ errorMsg: 'Payments are currently unavailable. Please contact our support.' });
        }
    }, [updateState]);
    
    
    /**
     * Returns to the first step of the payment flow.
     * @returns {*}
     */
    const backHandler = () => {
        if (updateCC) {
            endPaymentFlow();
        } else {
            updateState({ step: 1 });
        }
    };
    
    
    /**
     * Creates a subscription with the provided payment details.
     * @returns {Promise<void>}
     */
    const submitHandler = async () => {
        try {
            setState(prevState => ({ ...prevState, isLoading: true }));
            
            // Request body
            const payload = await hostedFields.tokenize();
            
            payload.firstName = store.firstName;
            payload.lastName = store.lastName;
            payload.email = store.email;
            payload.organizationId = store.organizationId;
            payload.plan = selectedPlan;
            payload.subscriptionId = store.organization.subscriptionId;
            
            // Determine endpoint
            let url = config.connectivity.paymentServer + '/subscribe';
            
            if (updateCC) {
                url = config.connectivity.paymentServer + '/update-cc';
            }
            
            // Request options
            const opts = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            };
            
            // Request
            const res = await (await fetch(url, opts)).json();
            
            if (res.failed) {
                updateState({ errorMsg: res.message });
            } else if (updateCC) {
                updateState({ successfullyUpdatedCC: true });
            } else {
                updateState({ successfullySubscribed: true });
            }
            
        } catch (error) {
            console.error(error);
            
            if (error.message.includes('input fields are invalid')) {
                error.message = 'Some payment details are invalid';
                setState(prevState => ({ ...prevState, errorMsg: error.message, isLoading: false }));
                
            } else if (error.message.includes('All fields are empty')) {
                error.message = 'All fields are empty. Please fill out all the fields above.';
                setState(prevState => ({ ...prevState, errorMsg: error.message, isLoading: false }));
                
            } else {
                updateState({ errorMsg: error.message });
            }
        }
    };
    
    
    /**
     * Initializes the hosted fields when the component has mounted.
     */
    useEffect(() => {
        initHostedFields();
    }, [initHostedFields]);
    
    
    /**
     * Removes the hosted fields when the component is unmounted.
     */
    useEffect(() => {
        return () => {
            if (hostedFields) {
                hostedFields.teardown();
            }
        };
    }, [hostedFields]);
    
    
    return (
        <div className={styling.paymentDetails}>
            <h2>Enter Credit Card Details</h2>
            
            <PlanDetails selectedPlan={selectedPlan} hidden={updateCC} />
            
            <p className={styling.caption}>
                Please enter your credit details below. This data never reaches our servers and will be securely
                processed by our payment partner. <b hidden={!updateCC}>This will override your existing
                card.</b>
            </p>
            
            <div className={styling.row}>
                <div className={styling.column}>
                    <h6>Card Number</h6>
                    <div id='braintree-card-number' className={styling.hostedField} />
                </div>
                
                <div className={styling.column}>
                    <h6>CVV</h6>
                    <div id='braintree-cvv' className={styling.hostedField} />
                </div>
            </div>
            
            <div className={styling.column}>
                <h6>Expiration Date</h6>
                <div id='braintree-expiration-date' className={styling.hostedField} />
            </div>
            
            <div className={styling.paymentDetailsError}>{errorMsg}</div>
            
            <div className={styling.controls}>
                <Button size='smaller' type='light' onClick={backHandler}>{updateCC ? 'Cancel' : 'Back'}</Button>
                <Button size='smaller' onClick={submitHandler}>Submit</Button>
            </div>
            
            <div className={styling.spinner} hidden={!isLoading}>
                <Spinner invert />
            </div>
        </div>
    );
};

export default PaymentDetails;