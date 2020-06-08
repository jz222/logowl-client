import React, {useState} from 'react';

import PlanDetails from '../planDetails/PlanDetails';
import Button from 'components/UI/button/Button';

import {useStore} from 'context';
import config from 'config';

import styling from '../PaymentFlow.module.scss';

const UpgradePlan = ({ cancelHandler, updateState }) => {
    const [store] = useStore();
    const [isLoading, setIsLoading] = useState(false);
    
    /**
     * Upgrades the current plan.
     * @returns {Promise<void>}
     */
    const confirm = async () => {
        try {
            setIsLoading(true);
            
            const payload = {
                organizationId: store.organizationId,
                subscriptionId: store.organization.subscriptionId,
                upgradedPlanId: 'scaleup'
            };
            
            const opts = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            };
            
            const url = config.connectivity.paymentServer + '/upgrade';
            
            const res = await (await fetch(url, opts)).json();
            
            if (res.failed) {
                updateState({ errorMsg: res.message, selectedPlan: 'scaleup' });
                setIsLoading(false);
                return;
            }
            
            updateState({ successfullySubscribed: true, selectedPlan: 'scaleup' });
            setIsLoading(false);
            
        } catch (error) {
            console.error(error);
            updateState({ errorMsg: error.message, selectedPlan: 'scaleup' });
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <h2>Confirm Plan Upgrade</h2>
            
            <PlanDetails selectedPlan='scaleup' />
            
            <p className={styling.caption}>
                You are about to upgrade your existing plan to a greater one. You cannot downgrade again but you are
                able to cancel at any time and create a new subscription. The new plan will be charged on the same
                credit card as the existing subscription.
            </p>
            
            <div className={styling.controls}>
                <Button size='smaller' color='light' onClick={cancelHandler}>Cancel</Button>
                <Button size='smaller' onClick={confirm} isLoading={isLoading}>Confirm</Button>
            </div>
        </>
    );
};

export default UpgradePlan;