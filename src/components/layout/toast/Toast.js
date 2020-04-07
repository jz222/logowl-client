import React, { useEffect, useRef } from 'react';
import { FiXCircle } from 'react-icons/fi';

import { useStore } from 'context';

import styling from './Toast.module.scss';

const Toast = () => {
    const [{ error }] = useStore();
    
    const toast = useRef({});
    
    useEffect(() => {
        if (error) {
            toast.current.classList.add(styling.open);
        } else {
            toast.current.classList.remove(styling.open);
        }
    }, [error]);
    
    return (
        <div className={styling.toast} ref={toast}>
            <FiXCircle />
            <span>Something went wrong</span>
        </div>
    );
};

export default Toast;