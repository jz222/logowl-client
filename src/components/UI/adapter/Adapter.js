import React from 'react';

import nodejs from 'assets/logos/nodejs.png';
import browser from 'assets/icons/browser.svg';
import logowl from 'assets/logos/log-owl-uni.svg';

import styling from './Adapter.module.scss';

const Adapter = ({ type, size }) => {
    
    let logo = logowl;
    
    if (type === 'browser') {
        logo = browser;
    }
    
    if (type === 'nodejs') {
        logo = nodejs;
    }
    
    return (
        <div className={styling[size] + ' ' + styling[type]}>
            <img src={logo} alt={type} />
        </div>
    );
};

export default Adapter;