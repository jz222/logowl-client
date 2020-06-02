import React from 'react';

import Checkbox from 'components/UI/checkbox/Checkbox';
import Button from 'components/UI/button/Button';

import config from 'config';

import styling from '../PaymentFlow.module.scss';

const Plans = ({ selectedPlan, selectHandler, confirmPlan }) => (
    <>
        <h2>Select your Plan</h2>
        
        
        <p className={styling.caption}>
            Please choose your plan below and you are good to go. <b>Prices are billed
            monthly.</b> You can change your plan at any time in the settings of your organization.
        </p>
        
        
        {config.availablePlans.map(plan => (
            <div className={styling.plan} key={plan.id}>
                <div>
                    <Checkbox
                        id={plan.id}
                        checked={selectedPlan === plan.id}
                        changeHandler={selectHandler}
                    />
                </div>
        
                <div className={selectedPlan === plan.id ? styling.selected : styling.description}>
                    <h6>{plan.name}</h6>
                    <p>{plan.description}</p>
                </div>
        
                <div className={styling.price}>{plan.price}</div>
            </div>
        ))}
        
        
        <div className={styling.controls}>
            <Button size='smaller' onClick={confirmPlan}>Confirm</Button>
        </div>
    </>
);

export default Plans;