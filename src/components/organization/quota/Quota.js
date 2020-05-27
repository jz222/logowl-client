import React from 'react';

import Card from 'components/UI/card/Card';
import InputField from 'components/UI/inputField/InputField';

import styling from './Quota.module.scss';

const Quota = ({ activePlan = '', receivedRequests = {}, requestLimit = 0 }) => {
    const currentMonth = Object.keys(receivedRequests || {}).sort((a, b) => b - a)[0];
    
    const errorRequests = (receivedRequests[currentMonth] || {}).errors || 0;
    const analyticRequests = (receivedRequests[currentMonth] || {}).analytics || 0;
    
    return (
        <Card>
            <div className={styling.row}>
                <h6>Active Plan</h6>
                <InputField value={activePlan.toUpperCase()} disabled />
                <p>Active plan for this organization</p>
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
                <InputField value={requestLimit} disabled />
                <p>Total requests that are tracked per month</p>
            </div>
        </Card>
    );
};

export default Quota;