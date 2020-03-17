import React from 'react';
import { withRouter } from 'react-router-dom';

import { useStore } from 'context';

import styling from './Sidebar.module.scss';

const Sidebar = () => {
    const [store] = useStore();
    
    return (
        <aside>
            <div className={styling.sidebar}>hallo {store.firstName}</div>
        </aside>
    )
};

export default withRouter(Sidebar);