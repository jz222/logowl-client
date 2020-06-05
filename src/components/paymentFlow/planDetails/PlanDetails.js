import React from 'react';

import logowlSuccess from 'assets/logos/log-owl-uni-green.svg';
import logowlFailure from 'assets/logos/log-owl-uni-red.svg';
import logowl from 'assets/logos/log-owl-uni-orange.svg';

import config from 'config';

import styling from './PlanDetails.module.scss';

const PlanDetails = ({ selectedPlan, success, failure, hidden }) => {
    const plan = config.availablePlans.find(x => x.id === selectedPlan) || {};
    
    let icon = logowl;
    let style = styling.wrapper;
    
    if (success) {
        icon = logowlSuccess;
        style = styling.success;
    }
    
    if (failure) {
        icon = logowlFailure;
        style = styling.failure;
    }
    
    return (
        <div className={style} hidden={hidden}>
            <div className={styling.icon}>
                <img src={icon} alt='logowl logo' />
            </div>
            
            <div className={styling.description}>
                <div>SELECTED PLAN</div>
                
                <h6>{plan.name}</h6>
                
                <p>You will be billed <b>{plan.price}</b> per month</p>
            </div>
        </div>
    );
};

export default PlanDetails;