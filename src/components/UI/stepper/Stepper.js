import React from 'react';

import styling from './Stepper.module.scss';

const Stepper = ({ steps = [] }) => (
    <div className={styling.stepper}>
        <div className={styling.bullet} />
        
        {steps.map((step, i) => (
            <div key={step}>
                <span>{step}</span>
                <span hidden={steps.length - 1 === i}>/</span>
            </div>
        ))}
    </div>
);

export default Stepper;