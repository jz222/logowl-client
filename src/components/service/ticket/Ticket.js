import React from 'react';
import { FiRadio } from 'react-icons/fi';

import Card, { Header } from 'components/UI/card/Card';

import styling from './Ticket.module.scss';

const Ticket = ({ ticket, serviceName }) => (
    <Card>
        <Header icon={<FiRadio />}>Service Ticket</Header>
        
        <div className={styling.ticket}>
            <span>{ticket}</span>
        </div>
        
        <p>
            Use this ticket to initialize your Log Owl adapter.
            All events sent with this ticket will be attached to {serviceName}.
        </p>
    </Card>
);

export default Ticket;