import React, { useCallback, useState } from 'react';

import { ErrorMessage, SubscriptionSuccessMessage, UpdateSuccessMessage } from './messages/Messages';
import PaymentDetails from './paymentDetails/PaymentDetails';
import Modal from 'components/UI/modal/Modal';
import Plans from './plans/Plans';

import fetchClient from 'fetchClient';
import { useStore } from 'context';

const PaymentFlow = ({ open, endPaymentFlow, paidThroughPlan, updateCC, upgradePlan, isCancelAble }) => {
    const [, , setError] = useStore();
    
    const initState = {
        step: 1,
        selectedPlan: 'free',
        successfullySubscribed: false,
        successfullyUpdatedCC: false,
        errorMsg: ''
    };
    
    const [state, setState] = useState(initState);
    
    const { step, selectedPlan, successfullyUpdatedCC, successfullySubscribed, errorMsg } = state;
    
    
    /**
     * Updates the state.
     * @param update {object} updated keys
     */
    const updateState = useCallback((update) => {
        setState(prevState => ({ ...prevState, ...update }));
    }, []);
    
    
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
            endPaymentFlow();
            setError(error);
        }
    };
    
    
    const plans = (
        <Plans
            selectedPlan={selectedPlan}
            selectHandler={selectHandler}
            confirmPlan={confirmPlan}
            paidThroughPlan={paidThroughPlan}
            cancelHandler={endPaymentFlow}
            isCancelable={isCancelAble}
            upgradePlan={upgradePlan}
        />
    );
    
    const subscriptionSuccessMessage = (
        <SubscriptionSuccessMessage
            endPaymentFlow={endPaymentFlow}
            selectedPlan={selectedPlan}
        />
    );
    
    const updateSuccessMessage = (
        <UpdateSuccessMessage
            endPaymentFlow={endPaymentFlow}
        />
    );
    
    const errorMessage = (
        <ErrorMessage
            errorMsg={errorMsg}
            selectedPlan={selectedPlan}
            resetPaymentFlow={() => setState(initState)}
        />
    );
    
    const paymentDetails = (
        <PaymentDetails
            selectedPlan={selectedPlan}
            updateState={updateState}
            endPaymentFlow={endPaymentFlow}
            updateCC={updateCC}
            upgradePlan={upgradePlan}
        />
    );
    
    
    let component = plans;
    
    if (successfullySubscribed) {
        component = subscriptionSuccessMessage;
        
    } else if (successfullyUpdatedCC) {
        component = updateSuccessMessage;
        
    } else if (errorMsg) {
        component = errorMessage;
        
    } else if (step === 2 || updateCC) {
        component = paymentDetails;
    }
    
    
    return (
        <Modal open={open}>
            {component}
        </Modal>
    );
};

export default PaymentFlow;