import React, { useState } from 'react';

import { Menu, Tab } from 'components/UI/menu/Menu';
import Stepper from 'components/UI/stepper/Stepper';
import Analytics from './analytics/Analytics';
import Settings from './settings/Settings';
import Integrations from './integrations/Integrations';
import Errors from './errors/Errors';
import Ticket from './ticket/Ticket';

import { useStore } from 'context';

const Service = ({ history, match }) => {
    const [store] = useStore();
    
    const [activeTab, setActiveTab] = useState('errors');
    
    const service = store.services.find(x => x.id === match.params.serviceId) || {};
    
    return (
        <>
            <Stepper steps={['services', service.name]} />
            
            <Menu>
                <Tab active={activeTab === 'errors'} click={() => setActiveTab('errors')}>Errors</Tab>
                <Tab active={activeTab === 'analytics'} click={() => setActiveTab('analytics')}>Analytics</Tab>
                <Tab active={activeTab === 'ticket'} click={() => setActiveTab('ticket')}>Ticket</Tab>
                <Tab active={activeTab === 'integrations'} click={() => setActiveTab('integrations')}>Integrations</Tab>
                <Tab active={activeTab === 'settings'} click={() => setActiveTab('settings')}>Settings</Tab>
            </Menu>
            
            {activeTab === 'errors' && <Errors serviceId={service.id} type={service.type} history={history} />}
            {activeTab === 'analytics' && <Analytics serviceId={service.id} />}
            {activeTab === 'ticket' && <Ticket serviceName={service.name} ticket={service.ticket} />}
            {activeTab === 'integrations' && <Integrations serviceId={service.id} slackWebhookURL={service.slackWebhookURL} webhookURL={service.webhookURL} />}
            {activeTab === 'settings' && <Settings history={history} serviceName={service.name} serviceId={service.id} />}
        </>
    );
};

export default Service;