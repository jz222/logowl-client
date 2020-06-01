import React, { useState } from 'react';

import Confirmation from 'components/UI/confirmation/Confirmation';
import InputField from 'components/UI/inputField/InputField';
import Button from 'components/UI/button/Button';
import Card from 'components/UI/card/Card';

import config from 'config';

import styling from './Quota.module.scss';

const Quota = ({ org }) => {
    const [{ cancelConfirmationOpen }, setState] = useState({
        cancelConfirmationOpen: false,
    });
    
    // Deconstruct organization object
    const { id = '', plan = '', receivedRequests = {}, monthlyRequestLimit = 0, subscriptionId = '' } = org;
    
    /**
     * Cancels the active subscription.
     */
    const cancelSubscription = async () => {
        try {
            const url = config.connectivity.paymentServer + '/logowl/cancel';
            
            const opts = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ organizationId: id, subscriptionId })
            };
            
            await fetch(url, opts);
            
        } catch (error) {
            console.error(error);
        }
    };
    
    /**
     * Toggles the confirmation modal visibility.
     */
    const toggleConfirmationModal = () => {
        setState(prevState => ({ ...prevState, cancelConfirmationOpen: !prevState.cancelConfirmationOpen }));
    };
    
    // Get the current month
    const currentMonth = Object.keys(receivedRequests || {}).sort((a, b) => b - a)[0];
    
    // Determine received requests
    const errorRequests = (receivedRequests[currentMonth] || {}).errors || 0;
    const analyticRequests = (receivedRequests[currentMonth] || {}).analytics || 0;
    
    return (
        <>
            <Card>
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
                
                <div className={styling.row} hidden={!subscriptionId}>
                    <div className={styling.flexWrapper}>
                        <div>
                            <h6>Cancel Subscription</h6>
                            <p>Cancel your subscription and get downgraded to the free plan.</p>
                        </div>
                        
                        <Button size='smaller' onClick={toggleConfirmationModal}>Cancel</Button>
                    </div>
                </div>
            </Card>
            
            <Confirmation
                open={cancelConfirmationOpen}
                title='Cancel Subscription'
                message='Cancelling the subscription will downgrade your organization to the free plan and delete all your team members.'
                cancelHandler={toggleConfirmationModal}
                confirmHandler={cancelSubscription}
            />
        </>
    );
};

export default Quota;