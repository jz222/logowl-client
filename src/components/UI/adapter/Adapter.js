import React from 'react';

import nodejs from 'assets/logos/nodejs.png';
import browser from 'assets/icons/browser.svg';

import styling from './Adapter.module.scss';

const Adapter = ({ type, size }) => {
    
    let logo = nodejs;
    
    if (type === 'browser') {
        logo = browser;
    }
    
    return (
        <div className={styling[size] + ' ' + styling[type]}>
            <img src={logo} alt={type} />
        </div>
    );
};

export default Adapter;