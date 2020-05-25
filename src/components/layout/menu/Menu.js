import React from 'react';
import { Link } from 'react-router-dom';

import logo from 'assets/logos/log-owl-logo-dark.svg';

import styling from './Menu.module.scss';

const Menu = ({ reference = null, children }) => (
    <nav className={styling.nav} ref={reference}>
        <div className={styling.content}>
            <Link to='/auth'>
                <img src={logo} alt='log owl logo' />
            </Link>
            
            {children}
        </div>
    </nav>
);

export default Menu;