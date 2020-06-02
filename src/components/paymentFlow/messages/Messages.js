import React from 'react';

import PlanDetails from '../planDetails/PlanDetails';
import Button from 'components/UI/button/Button';

import styling from '../PaymentFlow.module.scss';

// Error message shown if the subscription failed
export const ErrorMessage = ({ errorMsg, resetPaymentFlow, selectedPlan }) => (
    <>
        <h2>Subscription failed</h2>
        
        <PlanDetails selectedPlan={selectedPlan} failure />
        
        <div className={styling.message}>
            <p>
                Something went wrong when processing the payment details you've provided. Please try again and make
                sure the data you provide is correct. If the problem persists, please contact our support.
            </p>
            
            <code>{errorMsg}</code>
        </div>
        
        <div className={styling.controls}>
            <Button size='smaller' onClick={resetPaymentFlow}>Cancel</Button>
        </div>
    </>
);


// Success message shown if the subscription was created successfully
export const SuccessMessage = ({ endPaymentFlow, selectedPlan }) => (
    <>
        <h2>Subscription successful</h2>
        
        <PlanDetails selectedPlan={selectedPlan} success />
        
        <div className={styling.message}>
            <p>
                Thank you for your trust in Log Owl. You can manage your subscription in the settings of your
                organization. If you have any questions, please do not hesitate to contact us for further
                assistance.
            </p>
        </div>
        
        <div className={styling.controls}>
            <Button size='smaller' onClick={endPaymentFlow}>Close</Button>
        </div>
    </>
);