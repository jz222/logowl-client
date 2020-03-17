import React, { useState } from 'react';

import styling from './Errors.module.scss';
import Event from '../UI/event/Event';

const Errors = () => {
    const [state, setState] = useState({
        logs: []
    });
    
    return (
        <>
            <ul className={styling.content}>
                {state.logs.map(log => (
                    <Event key={log.id} />
                ))}
            </ul>
        </>
    )
};

export default Errors;