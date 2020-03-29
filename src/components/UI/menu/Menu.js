import React from 'react';

import styling from './Menu.module.scss';

const Tab = ({ children, active, click, hidden }) => (
    <div className={active ? styling.active : styling.tab} onClick={click} hidden={hidden}>{children}</div>
);

const Menu = ({ children }) => (
    <div className={styling.menu}>
        {children}
    </div>
);

export { Menu, Tab };