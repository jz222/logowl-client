import React, { useCallback, useEffect, useRef, useState } from 'react';

import { PrivacyPolicy, TermsAndConditions } from 'components/UI/links/Links';
import Checkbox from 'components/UI/checkbox/Checkbox';
import Spinner from 'components/UI/spinner/Spinner';
import Button from 'components/UI/button/Button';

import fetchClient from 'fetchClient';
import { useStore } from 'context';
import config from 'config';

import styling from './PaymentFlow.module.scss';

// PaymentFlow component
const PaymentFlow = ({ endPaymentFlow }) => {
    const [store, dispatch, setError] = useStore();
    
    const [state, setState] = useState({
        step: 1,
        selectedPlan: 'free',
        payload: null,
        successfullySubscribed: false,
        isCreatingSubscription: false,
        isLoading: true
    });
    
    const { step, selectedPlan, payload, successfullySubscribed, isCreatingSubscription, isLoading } = state;
    
    const dropInContainer = useRef({});
    const braintreeInstance = useRef({});
    
    
    /**
     * Renders the Braintree dropIn component
     * @returns {Promise<void>}
     */
    const renderBraintreeDropIn = useCallback(async () => {
        try {
            const res = await (await fetch(config.connectivity.paymentServer + '/logowl/setup')).json();
            
            braintreeInstance.current = await window.braintree.dropin.create({
                authorization: res.token,
                container: dropInContainer.current
            });
            
            dropInContainer.current.style.opacity = '1';
            setState(prevState => ({ ...prevState, isLoading: false }));
            
        } catch (error) {
            console.error(error);
        }
    }, []);
    
    
    /**
     * Requests the payment method and thereby
     * confirms the payment details.
     * @returns {Promise<void>}
     */
    const getConfirmation = async () => {
        try {
            const payload = await braintreeInstance.current.requestPaymentMethod();
            
            payload.firstName = store.firstName;
            payload.lastName = store.lastName;
            payload.email = store.email;
            payload.organizationId = store.organizationId;
            payload.plan = selectedPlan;
            
            setState(prevState => ({ ...prevState, step: 3, payload }));
        } catch (error) {
            console.error(error);
        }
    };
    
    
    /**
     * Creates a subscription.
     * @returns {Promise<void>}
     */
    const subscribe = async () => {
        try {
            setState(prevState => ({ ...prevState, isCreatingSubscription: true }));
            
            const endpoint = config.connectivity.paymentServer + '/logowl/subscribe';
            const opts = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            };
            
            const res = await (await fetch(endpoint, opts)).json();
            
            if (res.success) {
                setState(prevState => ({ ...prevState, successfullySubscribed: true }));
                
                const updatedUserData = await fetchClient('getUser');
                dispatch({ type: 'update', payload: updatedUserData });
            }
            
        } catch (error) {
            console.error(error);
        }
    };
    
    
    /**
     * Navigates to the previous step.
     * @returns {Promise<void>}
     */
    const navigateBack = async () => {
        try {
            await braintreeInstance.current.teardown();
            
            setState(prevState => ({ ...prevState, step: 1, isLoading: true, payload: null }));
            
        } catch (error) {
            console.error(error);
        }
    };
    
    
    /**
     * Handles checkbox selections.
     * @param target {object} the checkbox that was selected
     */
    const selectHandler = ({ target }) => {
        setState(prevState => ({ ...prevState, selectedPlan: target.getAttribute('data-id') }));
    };
    
    
    /**
     * Confirms the selected plan and ends the payment flow.
     * @returns {Promise<void>}
     */
    const confirmPlan = async () => {
        try {
            if (selectedPlan === 'free') {
                await fetchClient('updateOrganization', { isSetUp: true });
                
                endPaymentFlow();
                
            } else {
                setState(prevState => ({ ...prevState, step: 2 }));
            }
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };
    
    
    useEffect(() => {
        if (step === 2) {
            renderBraintreeDropIn();
        }
    }, [renderBraintreeDropIn, step]);
    
    
    // View that allows the user to select a plan
    const selectPlan = (
        <>
            <h2>Select your Plan</h2>
            
            <div className={styling.content}>
                <p>
                    Please choose your plan below and you are good to go. <b>Prices are billed
                    monthly.</b> You can change your plan at any time in the settings of your organization.
                </p>
                
                <div className={styling.card}>
                    <div>
                        <Checkbox
                            id='free'
                            checked={selectedPlan === 'free'}
                            changeHandler={selectHandler}
                        />
                    </div>
                    
                    <div className={selectedPlan === 'free' ? styling.selected : styling.description}>
                        <h6>Free Plan</h6>
                        <p>Includes 5000 requests/month and maximum one additional team member.</p>
                    </div>
                    
                    <div className={styling.price}>FREE</div>
                </div>
                
                <div className={styling.card}>
                    <div>
                        <Checkbox
                            id='business'
                            checked={selectedPlan === 'business'}
                            changeHandler={selectHandler}
                        />
                    </div>
                    
                    <div className={selectedPlan === 'business' ? styling.selected : styling.description}>
                        <h6>Business Plan</h6>
                        <p>Includes 5000 requests/month and maximum one additional team member.</p>
                    </div>
                    
                    <div className={styling.price}>15$</div>
                </div>
                
                <div className={styling.controls}>
                    <Button size='smaller' onClick={confirmPlan}>Confirm</Button>
                </div>
            </div>
        </>
    );
    
    
    // View that lets the user add their payment details
    const cancelLabel = step === 2 ? 'Back' : 'Cancel';
    const submitLabel = step === 2 ? 'Next' : 'Submit';
    const submitFunc = step === 2 ? getConfirmation : subscribe;
    
    const payment = (
        <>
            <h2>Place Payment</h2>
            
            <div className={styling.content}>
                <p>
                    Please enter your credit details below. This data never reaches our servers and will be securely
                    processes by our payment partner.
                </p>
                
                <p className={styling.selectedPlan}><b>Subscribing to:</b> Business Plan (15$ / month)</p>
                
                <div className={styling.paymentDetails} ref={dropInContainer} />
                
                <div className={styling.spinnerWrapper} hidden={!isLoading}>
                    <Spinner invert size='small' />
                </div>
                
                <p className={styling.notice} hidden={!payload}>
                    By creating a subscription you accept our <PrivacyPolicy /> and <TermsAndConditions />.
                </p>
            </div>
            
            <div className={styling.controls}>
                <Button size='smaller' color='light' onClick={navigateBack}>{cancelLabel}</Button>
                <Button size='smaller' onClick={submitFunc} disabled={isCreatingSubscription}>{submitLabel}</Button>
            </div>
        </>
    );
    
    
    // Success message shown if the subscription was created successfully
    const successMessage = (
        <>
            <h2>Subscription successful</h2>
            
            <div className={styling.successMessageWrapper}>
                <p>
                    Thank you for your trust in Log Owl. You can manage your subscription in the settings of your
                    organization. If you have any questions, please do not hesitate to contact us for further
                    assistance.
                </p>
            </div>
            
            <div className={styling.controls}>
                <Button size='smaller' onClick={endPaymentFlow}>Finish</Button>
            </div>
        </>
    );
    
    if (successfullySubscribed) {
        return successMessage;
    }
    
    return step < 2 ? selectPlan : payment;
};

export default PaymentFlow;