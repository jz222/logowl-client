import React, { useCallback, useState } from 'react';

import PaymentDetails from './paymentDetails/PaymentDetails';
import { ErrorMessage, SuccessMessage } from './messages/Messages';
import Plans from './plans/Plans';

import fetchClient from 'fetchClient';
import { useStore } from 'context';

const PaymentFlow = ({ endPaymentFlow }) => {
    const [, , setError] = useStore();
    
    const initState = {
        step: 1,
        selectedPlan: 'free',
        successfullySubscribed: false,
        errorMsg: ''
    };
    
    const [{ step, selectedPlan, successfullySubscribed, errorMsg }, setState] = useState(initState);
    
    
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
    
    if (successfullySubscribed) {
        return <SuccessMessage endPaymentFlow={endPaymentFlow} selectedPlan={selectedPlan} />
    }
    
    if (errorMsg) {
        return <ErrorMessage errorMsg={errorMsg} selectedPlan={selectedPlan} resetPaymentFlow={() => setState(initState)} />
    }
    
    if (step === 2) {
        return <PaymentDetails selectedPlan={selectedPlan} updateState={updateState} />
    }
    
    return (
        <Plans
            selectedPlan={selectedPlan}
            selectHandler={selectHandler}
            confirmPlan={confirmPlan}
        />
    );
};

export default PaymentFlow;