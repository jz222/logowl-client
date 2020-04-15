import React, { useState } from 'react';

import { Menu, Tab } from 'components/UI/menu/Menu';
import Stepper from 'components/UI/stepper/Stepper';
import Settings from './settings/Settings';
import Errors from './errors/Errors';
import Ticket from './ticket/Ticket';

import { useStore } from 'context';

const Service = ({ history, match }) => {
    const [store] = useStore();
    
    const [activeTab, setActiveTab] = useState('errors');
    
    const selectedService = store.services.find(x => x.id === match.params.serviceId) || {};
    
    return (
        <>
            <Stepper steps={['services', selectedService.name]} />
            <Menu>
                <Tab active={activeTab === 'errors'} click={() => setActiveTab('errors')}>Errors</Tab>
                <Tab active={activeTab === 'ticket'} click={() => setActiveTab('ticket')}>Ticket</Tab>
                <Tab active={activeTab === 'settings'} click={() => setActiveTab('settings')}>Settings</Tab>
            </Menu>
            
            {activeTab === 'errors' && <Errors serviceId={selectedService.id} type={selectedService.type} history={history} />}
            {activeTab === 'ticket' && <Ticket serviceName={selectedService.name} ticket={selectedService.ticket} />}
            {activeTab === 'settings' && <Settings history={history} serviceName={selectedService.name} serviceId={selectedService.id} />}
        </>
    );
};

export default Service;