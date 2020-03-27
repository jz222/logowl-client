import React, { useState } from 'react';

import Stepper from 'components/UI/stepper/Stepper';
import { Menu, Tab } from 'components/UI/menu/Menu';
import Info from './info/Info';

import { useStore } from 'context';

const Organization = () => {
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
            
            <h5>Settings</h5>
            <h1>{store.organization.name}</h1>
            
            <Menu>
                <Tab active={activeTab === 'info'} click={() => tabHandler('info')}>Info</Tab>
                <Tab active={activeTab === 'integrations'} click={() => tabHandler('integrations')}>Integrations</Tab>
                <Tab active={activeTab === 'delete'} click={() => tabHandler('delete')}>Delete</Tab>
            </Menu>
            
            {activeTab === 'info' && <Info organization={store.organization} />}
        </>
    );
};

export default Organization;