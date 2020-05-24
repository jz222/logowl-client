import React, { useState } from 'react';

import Checkbox from 'components/UI/checkbox/Checkbox';
import Button from 'components/UI/button/Button';

import { useStore } from 'context';
import fetchClient from 'fetchClient';

import styling from './PaymentFlow.module.scss';

const PaymentFlow = ({ endPaymentFlow }) => {
    const [, , setError] = useStore();
    const [selectedPlan, setSelectedPlan] = useState('freePlan');
    
    /**
     * Handles checkbox selections.
     * @param target {object} the checkbox that was selected
     */
    const selectHandler = ({ target }) => {
        setSelectedPlan(target.getAttribute('data-id'));
    };
    
    /**
     * Confirms the selected plan and ends the payment flow.
     * @returns {Promise<void>}
     */
    const confirmPlan = async () => {
        try {
            await fetchClient('updateOrganization', { isSetUp: true });
            endPaymentFlow();
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };
    
    return (
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
                            id='freePlan'
                            checked={selectedPlan === 'freePlan'}
                            changeHandler={selectHandler}
                        />
                    </div>
                    
                    <div className={selectedPlan === 'freePlan' ? styling.selected : styling.description}>
                        <h6>Free Plan</h6>
                        <p>Includes 5000 requests/month and maximum one additional team member.</p>
                    </div>
                    
                    <div className={styling.price}>FREE</div>
                </div>
            </div>
            
            <Button onClick={confirmPlan}>Confirm</Button>
        </>
    );
};

export default PaymentFlow;