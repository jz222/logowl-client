import React from 'react';
import { withRouter } from 'react-router-dom';
import { FiCompass, FiHome, FiLogOut, FiSettings } from 'react-icons/fi';

import styling from './Sidebar.module.scss';

const Sidebar = ({ history }) => {
    const signOut = () => {
        localStorage.removeItem('access-pass');
        localStorage.removeItem('expiration-time');
        
        history.push('/auth/signin');
    };
    
    const currentPath = history.location.pathname.split('/')[1];
    
    /**
     * Determines the styling for a given menu item.
     * @param path {string} the path represented by the menu item
     * @returns {*}
     */
    const getStyling = (path) => (currentPath === path) ? styling.active : '';
    
    return (
        <aside className={styling.sidebar}>
            <div className={styling.content}>
                <div className={styling.logo}>LOGGY</div>
                
                <ul className={styling.menu}>
                    <li className={getStyling('services')} onClick={() => history.push('/services')}>
                        <FiCompass />
                    </li>
                    
                    <li className={getStyling('organization')} onClick={() => history.push('/organization')}>
                        <FiHome />
                    </li>
                    
                    <li className={getStyling('settings')} onClick={() => history.push('/settings')}>
                        <FiSettings />
                    </li>
                    
                    <li onClick={signOut}>
                        <FiLogOut />
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default withRouter(Sidebar);