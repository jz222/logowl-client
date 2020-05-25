import React from 'react';
import { withRouter } from 'react-router-dom';
import { AiOutlineHome, AiOutlineLogout, AiOutlineSetting, AiOutlineUnorderedList } from 'react-icons/ai';

import logo from 'assets/logos/log-owl.svg';

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
                <img src={logo} className={styling.logo} alt='log owl logo' />
                
                <ul className={styling.menu}>
                    <li className={getStyling('services')} onClick={() => history.push('/services')}>
                        <AiOutlineUnorderedList />
                    </li>
                    
                    <li className={getStyling('organization')} onClick={() => history.push('/organization')}>
                        <AiOutlineHome />
                    </li>
                    
                    <li className={getStyling('settings')} onClick={() => history.push('/settings')}>
                        <AiOutlineSetting />
                    </li>
                    
                    <li onClick={signOut}>
                        <AiOutlineLogout />
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default withRouter(Sidebar);