import React, { useState } from 'react';

import Event from '../UI/event/Event';
import Title from '../UI/title/Title';
import Placeholder from '../UI/placeholder/Placeholder';

import styling from './Errors.module.scss';

const Errors = () => {
    const [{ logs }, setState] = useState({
        logs: []
    });
    
    const placeholder = (
        <Placeholder title='No errors available'></Placeholder>
    );
    
    const errors = (
        <ul className={styling.content}>
            {logs.map(log => (
                <Event key={log.id} />
            ))}
        </ul>
    );
    
    return (
        <>
            <Title>Errors</Title>
            
            {logs.length ? errors : placeholder}
        </>
    )
};

export default Errors;