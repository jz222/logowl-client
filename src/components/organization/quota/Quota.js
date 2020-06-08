import React, { useState } from 'react';

import Confirmation from 'components/UI/confirmation/Confirmation';
import InputField from 'components/UI/inputField/InputField';
import PaymentFlow from 'components/paymentFlow/PaymentFlow';
import Button from 'components/UI/button/Button';
import Card from 'components/UI/card/Card';

import { useStore } from 'context';
import config from 'config';

import styling from './Quota.module.scss';

const Quota = ({ org }) => {
    const [, dispatch, setError] = useStore();
    
    const [{ mode, cancelConfirmationOpen, paymentFlowOpen, isLoading }, setState] = useState({
        mode: '',
        cancelConfirmationOpen: false,
        paymentFlowOpen: false,
        isLoading: false
    });
    
    // Deconstruct
    const { id = '', plan = '', receivedRequests = {}, monthlyRequestLimit = 0, subscriptionId = '', paidThroughDate = '' } = org;
    const { freePlanId, highPlanId } = config.availablePlans;
    
    /**
     * Toggles the confirmation modal visibility.
     */
    const toggleConfirmationModal = () => {
        setState(prevState => ({ ...prevState, cancelConfirmationOpen: !prevState.cancelConfirmationOpen }));
    };
    
    /**
     * Toggle the payment flow visibility
     */
    const togglePaymentFlow = (mode = '') => {
        setState(prevState => ({ ...prevState, paymentFlowOpen: !prevState.paymentFlowOpen, mode }));
    };
    
    /**
     * Cancels the active subscription.
     */
    const cancelSubscription = async () => {
        try {
            setState(prevState => ({ ...prevState, isLoading: true }));
            
            const url = config.connectivity.paymentServer + '/cancel';
            
            const opts = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ organizationId: id, subscriptionId })
            };
            
            const res = await (await fetch(url, opts)).json();
            
            dispatch({ type: 'updateOrganization', payload: { paidThroughDate: res.message.paidThroughDate } });
            setState(prevState => ({ ...prevState, isLoading: false }));
            toggleConfirmationModal();
            
        } catch (error) {
            console.error(error);
            setState(prevState => ({ ...prevState, isLoading: false }));
            setError(error);
            toggleConfirmationModal();
        }
    };
    
    
    // Get the current month
    const currentMonth = Object.keys(receivedRequests || {}).sort((a, b) => b - a)[0];
    
    // Determine received requests
    const errorRequests = (receivedRequests[currentMonth] || {}).errors || 0;
    const analyticRequests = (receivedRequests[currentMonth] || {}).analytics || 0;
    
    // Determine if user is in an active paid through period
    const activePaidThroughPeriod = paidThroughDate ? new Date(paidThroughDate) > Date.now() : false;
    
    
    const paymentFlow = (
        <PaymentFlow
            open={paymentFlowOpen}
            endPaymentFlow={togglePaymentFlow}
            paidThroughPlan={activePaidThroughPeriod ? plan : ''}
            updateCC={mode === 'updateCC'}
            upgradePlan={mode === 'upgradePlan'}
            isCancelAble
        />
    );
    
    return (
        <>
            <Card>
                <div className={styling.row} hidden={!activePaidThroughPeriod}>
                    <div className={styling.notice}>
                        <h6>Subscription Cancelled</h6>
                        <p>
                            The subscription has been cancelled. Your credit card will no longer be charged. You can use
                            the <span>{plan}</span> Plan until {paidThroughDate}. Afterwards, you will be downgraded to
                            the Free Plan. You can create a new subscription below to prevent being downgraded.
                        </p>
                    </div>
                </div>
                
                <div className={styling.row}>
                    <h6>Active Plan</h6>
                    <InputField value={plan.toUpperCase()} disabled />
                    <p>Active plan for this organization</p>
                </div>
                
                <div className={styling.row} hidden={!subscriptionId}>
                    <h6>Subscription ID</h6>
                    <InputField value={subscriptionId} disabled />
                    <p>The ID of your active subscription</p>
                </div>
                
                <div className={styling.row}>
                    <h6>Error requests in this period</h6>
                    <InputField value={errorRequests} disabled />
                    <p>Error requests received during the current period</p>
                </div>
                
                <div className={styling.row}>
                    <h6>Analytic requests in this period</h6>
                    <InputField value={analyticRequests} disabled />
                    <p>Analytic requests received during the current period</p>
                </div>
                
                <div className={styling.row}>
                    <h6>Total monthly request limit</h6>
                    <InputField value={monthlyRequestLimit} disabled />
                    <p>Total requests that are tracked per month</p>
                </div>
                
                <hr className={styling.dangerZone} />
                
                <div className={styling.row} hidden={!subscriptionId || activePaidThroughPeriod}>
                    <div className={styling.flexWrapper}>
                        <div>
                            <h6>Cancel Subscription</h6>
                            <p>Cancel your subscription and get downgraded to the free plan.</p>
                        </div>
                        
                        <Button size='smaller' onClick={toggleConfirmationModal}>Cancel</Button>
                    </div>
                </div>
                
                <div className={styling.row}
                     hidden={!activePaidThroughPeriod && plan !== freePlanId}>
                    <div className={styling.flexWrapper}>
                        <div>
                            <h6>Create a Subscription</h6>
                            <p>Create a new subscription and enjoy a higher quota.</p>
                        </div>
                        
                        <Button size='smaller' onClick={togglePaymentFlow}>Create</Button>
                    </div>
                </div>
                
                <div className={styling.row} hidden={!subscriptionId || activePaidThroughPeriod}>
                    <div className={styling.flexWrapper}>
                        <div>
                            <h6>Update Credit Card</h6>
                            <p>Update the credit card that is charged for the subscription.</p>
                        </div>
                        
                        <Button size='smaller' onClick={() => togglePaymentFlow('updateCC')}>Update</Button>
                    </div>
                </div>
                
                <div
                    className={styling.row}
                    hidden={plan === highPlanId || plan === freePlanId || paidThroughDate}
                >
                    <div className={styling.flexWrapper}>
                        <div>
                            <h6>Upgrade Plan</h6>
                            <p>Upgrade your current plan and enjoy a higher quota.</p>
                        </div>
                        
                        <Button size='smaller' onClick={() => togglePaymentFlow('upgradePlan')}>Upgrade</Button>
                    </div>
                </div>
            </Card>
            
            {paymentFlowOpen && paymentFlow}
            
            <Confirmation
                open={cancelConfirmationOpen}
                title='Cancel Subscription'
                message='Cancelling the subscription will downgrade your organization to the free plan and delete all your team members.'
                cancelHandler={toggleConfirmationModal}
                confirmHandler={cancelSubscription}
                isLoading={isLoading}
            />
        </>
    );
};

export default Quota;