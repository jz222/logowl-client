import React, { useState, useEffect, useCallback, useRef } from 'react';

import styling from './Dropdown.module.scss';

const Dropdown = ({ items, selected, changeHandler, label, type }) => {
    const [visible, setVisible] = useState(false);
    
    const selection = useRef({});
    
    /**
     * Closes the dropdown if the target element
     * is not the dropdown itself.
     * @type {(...args: any[]) => any}
     */
    const close = useCallback(({ target }) => {
        if(target !== selection.current) {
            setVisible(false);
        }
    }, []);
    
    /**
     * Toggles the dropdown visibility.
     * @type {(...args: any[]) => any}
     */
    const toggle = useCallback(() => {
        setVisible(prevState => !prevState);
    }, []);
    
    /**
     * Register an event listener that closes the dropdown
     * if clicked anywhere outside the dropdown. It
     * unregisters the event listener if the component
     * is unmounted.
     */
    useEffect(() => {
        document.addEventListener('click', close);
        
        return () => document.removeEventListener('click', close);
    }, [close]);
    
    const selectedItem = items.find(x => x.value === selected) || {};
    
    const style = visible ? styling.open : styling.closed;
    
    return (
        <div className={styling.dropdown + ' ' + style + ' ' + (styling[type] || '')}>
            <div className={styling.selection} onClick={toggle} ref={selection}>{selectedItem.key || label}</div>
            
            <ul>
                {items.map(item => (
                    <li
                        key={item.id}
                        className={item.value === selected ? styling.active : styling.inactive}
                        onClick={() => changeHandler(item.value)}
                    >
                        {item.key}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dropdown;