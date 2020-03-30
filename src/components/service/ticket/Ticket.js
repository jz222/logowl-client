import React from 'react';
import { FiRadio } from 'react-icons/fi';

import Card from 'components/UI/card/Card';

import styling from './Ticket.module.scss';

const Ticket = ({ ticket, serviceName }) => (
    <Card>
        <div className={styling.icon}>
            <FiRadio />
        </div>
        
        <h3>Service Ticket</h3>
        
        <div className={styling.ticket}>
            <span>{ticket}</span>
        </div>
        
        <p>
            Use this ticket to initialize your LOGGY adapter.
            All events sent with this ticket will be attached to {serviceName}.
        </p>
    </Card>
);

export default Ticket;