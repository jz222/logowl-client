import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';

import Spinner from 'components/UI/spinner/Spinner';
import Button from 'components/UI/button/Button';
import Modal from 'components/UI/modal/Modal';
import Card from 'components/UI/card/Card';

import fetchClient from 'fetchClient';

import styling from './Settings.module.scss';

const Settings = ({ history, serviceName, serviceId }) => {
    const [{ confirmVisibility, isLoading }, setState] = useState({
        confirmVisibility: false,
        isLoading: false
    });
    
    
    /**
     * Deletes a service with the given ID.
     * @returns {Promise<void>}
     */
    const deleteService = async () => {
        try {
            setState(prevState => ({ ...prevState, isLoading: true }));
            
            const res = await fetchClient('deleteService', null, '/service/' + serviceId);
            
            if (res.ok) {
                setTimeout(() => history.push('/services'), 1020);
            }
            
        } catch (error) {
            console.error(error);
        }
    };
    
    
    /**
     * Toggles the visibility of the confirm modal.
     */
    const toggleConfirmVisibility = () => {
        setState(prevState => ({ ...prevState, confirmVisibility: !prevState.confirmVisibility }));
    };
    
    
    const buttonContent = isLoading ? <div className={styling.deleteButton}><Spinner invert /> Deleting</div> : 'Delete';
    
    
    return (
        <>
            <Card>
                <div className={styling.icon}>
                    <FiSettings />
                </div>
                
                <h3>Service Settings</h3>
                
                <div className={styling.row}>
                    <div className={styling.description}>
                        <h6>Delete Service</h6>
                        <p>Delete this service and all its data</p>
                    </div>
                    
                    <Button onClick={toggleConfirmVisibility} size='smaller'>Delete</Button>
                </div>
            </Card>
            
            <Modal open={confirmVisibility} size='small'>
                <h3>Delete {serviceName}</h3>
                
                <p className={styling.caption}>
                    Please confirm that you want to delete the service {serviceName} and all its data.
                    Deleting a service is permanent and can not be undone.
                </p>
                
                <div className={styling.controls}>
                    <Button size='smaller' color='light' onClick={toggleConfirmVisibility}>Cancel</Button>
                    <Button size='smaller' onClick={deleteService} disabled={isLoading}>{buttonContent}</Button>
                </div>
            </Modal>
        </>
    );
};

export default Settings;