import React, { useState } from 'react';

import Checkbox from 'components/UI/checkbox/Checkbox';
import Button from 'components/UI/button/Button';

import styling from './PaymentFlow.module.scss';

const PaymentFlow = () => {
    const [selectedPlan, setSelectedPlan] = useState('freePlan');
    
    const selectHandler = ({ target }) => {
        setSelectedPlan(target.getAttribute('data-id'));
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
            
            <Button>Confirm</Button>
        </>
    );
};

export default PaymentFlow;