import React from 'react';

import Button from '../button/Button';
import Modal from '../modal/Modal';

import styling from './Confirmation.module.scss';

const Confirmation = ({ open, title, message, confirmHandler, label = 'Confirm', cancelHandler, isLoading }) => (
    <Modal open={open} size='small'>
        <h3>{title}</h3>
        
        <p className={styling.message}>{message}</p>
        
        <div className={styling.controls}>
            <Button size='smaller' color='light' onClick={cancelHandler}>Cancel</Button>
            <Button size='smaller' onClick={confirmHandler} isLoading={isLoading}>{label}</Button>
        </div>
    </Modal>
);

export default Confirmation;