import React from 'react';

import styling from './Menu.module.scss';

const Menu = ({ reference = null, children }) => (
    <nav className={styling.nav} ref={reference}>
        <div className={styling.content}>
            <span>LOGGY</span>
            
            {children}
        </div>
    </nav>
);

export default Menu;