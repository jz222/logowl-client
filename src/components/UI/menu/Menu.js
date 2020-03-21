import React from 'react';

import styling from './Menu.module.scss';

const Tab = ({ children, active, click }) => (
    <div className={active ? styling.active : styling.tab} onClick={click}>{children}</div>
);

const Menu = ({ children }) => {
    return (
        <div className={styling.menu}>
            {children}
        </div>
    );
};

export { Menu, Tab };