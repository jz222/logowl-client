import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styling from './Modal.module.scss';

const modalRoot = document.getElementById('modal');

const Modal = ({ children, open }) => {
    const element = useRef(document.createElement('div'));
    const backdrop = useRef({});
    const modal = useRef({});
    
    
    /**
     * Closes the modal with an animation if it's mounted.
     */
    const exit = () => {
        if (element.current.parentElement !== modalRoot) {
            return;
        }
        
        backdrop.current.classList.add(styling.fadeout);
        modal.current.classList.add(styling.disappear);
        
        setTimeout(() => modalRoot.removeChild(element.current), 1000);
    };
    
    
    /**
     * Opens and closes the modal according to the open prop.
     */
    useEffect(() => {
        if (open) {
            modalRoot.appendChild(element.current);
        }
        
        return exit;
    }, [open]);
    
    
    const content = (
        <div className={styling.backdrop} ref={backdrop}>
            <div className={styling.modal} ref={modal}>
                {children}
            </div>
        </div>
    );
    
    
    return createPortal(content, element.current);
};

export default Modal;