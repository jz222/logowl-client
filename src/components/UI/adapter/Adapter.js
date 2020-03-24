import React from 'react';

import nodejs from 'assets/logos/nodejs.png';

import styling from './Adapter.module.scss';

const Adapter = ({ type, size }) => {
    
    let logo = nodejs;
    
    return (
        <div className={styling[size]}>
            <img src={logo} alt={type} />
        </div>
    );
};

export default Adapter;