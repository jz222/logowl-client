import React, { useState } from 'react';

import Errors from './errors/Errors';
import Ticket from './ticket/Ticket';
import { Menu, Tab } from 'components/UI/menu/Menu';

import { useStore } from 'context';

const Service = ({ history, match }) => {
    const [store] = useStore();
    
    const [{ activeTab }, setState] = useState({
        activeTab: 'errors'
    });
    
    const tabHandler = (tab) => {
        setState(prevState => ({ ...prevState, activeTab: tab }));
    };
    
    const selectedService = store.services.find(x => x.id === match.params.serviceId) || {};
    
    return (
        <>
            <Menu>
                <Tab active={activeTab === 'errors'} click={() => tabHandler('errors')}>Errors</Tab>
                <Tab active={activeTab === 'ticket'} click={() => tabHandler('ticket')}>Ticket</Tab>
            </Menu>
            
            {activeTab === 'errors' && <Errors serviceId={selectedService.id} history={history} />}
            {activeTab === 'ticket' && <Ticket serviceName={selectedService.name} ticket={selectedService.ticket} />}
        </>
    );
};

export default Service;