import React, { useState } from 'react';

import Stepper from 'components/UI/stepper/Stepper';
import { Menu, Tab } from 'components/UI/menu/Menu';
import Delete from './delete/Delete';
import Info from './info/Info';
import Team from './team/Team';

import { useStore } from 'context';

import styling from './Organization.module.scss';

const Organization = ({ history }) => {
    const [store] = useStore();
    
    const [{ activeTab }, setState] = useState({
        activeTab: 'info'
    });
    
    const tabHandler = (tab) => {
        setState(prevState => ({ ...prevState, activeTab: tab }));
    };
    
    return (
        <>
            <Stepper steps={['organization']} />
            
            <div className={styling.header}>
                <h5>Settings</h5>
                <h1>{store.organization.name}</h1>
            </div>
            
            <Menu>
                <Tab active={activeTab === 'info'} click={() => tabHandler('info')}>Info</Tab>
                <Tab active={activeTab === 'team'} click={() => tabHandler('team')}>Team</Tab>
                <Tab active={activeTab === 'delete'} click={() => tabHandler('delete')}>Delete</Tab>
            </Menu>
            
            {(activeTab === 'info') && <Info organization={store.organization} />}
            {(activeTab === 'team') && <Team team={store.team} userId={store.id} />}
            {(activeTab === 'delete' && store.role === 'admin') && <Delete name={store.organization.name} history={history} />}
        </>
    );
};

export default Organization;