import React, { useState } from 'react';

import Stepper from 'components/UI/stepper/Stepper';
import { Menu, Tab } from 'components/UI/menu/Menu';
import Delete from './delete/Delete';
import Invite from './invite/Invite';
import Quota from './quota/Quota';
import Info from './info/Info';
import Team from './team/Team';

import { useStore } from 'context';

import styling from './Organization.module.scss';

const Organization = ({ history }) => {
    const [store] = useStore();
    
    const [activeTab, setActiveTab] = useState('info');
    
    const org = store.organization || {};
    const isAdmin = store.role === 'admin';
    
    return (
        <>
            <Stepper steps={['organization']} />
            
            <div className={styling.header}>
                <h5>Settings</h5>
                <h1>{store.organization.name}</h1>
            </div>
            
            <Menu>
                <Tab active={activeTab === 'info'} click={() => setActiveTab('info')}>Info</Tab>
                <Tab active={activeTab === 'team'} click={() => setActiveTab('team')}>Team</Tab>
                <Tab active={activeTab === 'invite'} click={() => setActiveTab('invite')} hidden={!isAdmin}>Invite</Tab>
                <Tab active={activeTab === 'quota'} click={() => setActiveTab('quota')}>Quota</Tab>
                <Tab active={activeTab === 'delete'} click={() => setActiveTab('delete')} hidden={!isAdmin}>Delete</Tab>
            </Menu>
            
            {activeTab === 'info' && <Info organization={org} />}
            {activeTab === 'team' && <Team team={store.team} userId={store.id} />}
            {activeTab === 'invite' && <Invite tabHandler={setActiveTab} />}
            {activeTab === 'quota' && <Quota org={org} />}
            {activeTab === 'delete' && <Delete name={org.name} history={history} hasActiveSubscription={org.plan !== 'free' && !org.paidThroughDate} />}
        </>
    );
};

export default Organization;