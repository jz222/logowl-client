import React, { useState } from 'react';

import Errors from './errors/Errors';
import { Menu, Tab } from 'components/UI/menu/Menu';

const Service = ({ match }) => {
    const [{ activeTab }, setState] = useState({
        activeTab: 'errors'
    });
    
    const tabHandler = (tab) => {
        setState(prevState => ({ ...prevState, activeTab: tab }));
    };
    
    return (
        <>
            <Menu>
                <Tab active={activeTab === 'errors'} click={() => tabHandler('errors')}>Errors</Tab>
            </Menu>
            
            {activeTab === 'errors' && <Errors id={match.params.id} />}
        </>
    );
};

export default Service;