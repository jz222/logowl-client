import React, { useState } from 'react';

import { Menu, Tab } from 'components/UI/menu/Menu';
import Stepper from 'components/UI/stepper/Stepper';
import Personal from './personal/Personal';
import Delete from './delete/Delete';

import { useStore } from 'context';

import styling from './Settings.module.scss';

const Settings = ({ history }) => {
    const [store] = useStore();
    
    const [currentTab, setCurrentTab] = useState('personal');
    
    const personalTab = (
        <Personal
            firstName={store.firstName}
            lastName={store.lastName}
            email={store.email}
            role={store.role}
        />
    );
    
    return (
        <>
            <Stepper steps={['settings']} />
            
            <div className={styling.header}>
                <h5>Settings</h5>
                <h1>{store.firstName} {store.lastName}</h1>
            </div>
            
            <Menu>
                <Tab active={currentTab === 'personal'} click={() => setCurrentTab('personal')}>Personal</Tab>
                <Tab active={currentTab === 'delete'} click={() => setCurrentTab('delete')}>Delete</Tab>
            </Menu>
            
            {currentTab === 'personal' && personalTab}
            {currentTab === 'delete' && <Delete isOrganizationOwner={store.isOrganizationOwner} history={history} />}
        </>
    );
};

export default Settings;