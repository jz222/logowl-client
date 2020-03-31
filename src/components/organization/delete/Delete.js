import React, { useState } from 'react';

import Button from 'components/UI/button/Button';
import Modal from 'components/UI/modal/Modal';
import Card from 'components/UI/card/Card';

import fetchClient from 'fetchClient';

import styling from './Delete.module.scss';

const Delete = ({ name, history }) => {
    const [confirmVisibility, setConfirmVisibility] = useState(false);
    
    /**
     * Toggles the modal visibility.
     */
    const toggleConfirmVisibility = () => {
        setConfirmVisibility(prevState => !prevState);
    };
    
    /**
     * Deletes an organization and all its data.
     * @returns {Promise<void>}
     */
    const deleteOrganization = async () => {
        try {
            await fetchClient('deleteOrganization');
            localStorage.clear();
            history.push('/auth/signin');
            
        } catch (error) {
            console.error(error)
        }
    };
    
    return (
        <>
            <Card>
                <div className={styling.row}>
                    <div className={styling.description}>
                        <h6>Delete Organization</h6>
                        <p>Delete this organization and all its data</p>
                    </div>
                    
                    <Button size='smaller' onClick={toggleConfirmVisibility}>Delete</Button>
                </div>
            </Card>
            
            <Modal open={confirmVisibility} size='small'>
                <h3>Delete {name}</h3>
                
                <p className={styling.caption}>
                    Please confirm that you want to delete the organization {name} and all its data.
                    Deleting an organization is permanent and can not be undone.
                </p>
                
                <div className={styling.controls}>
                    <Button size='smaller' color='light' onClick={toggleConfirmVisibility}>Cancel</Button>
                    <Button size='smaller' onClick={deleteOrganization}>Confirm</Button>
                </div>
            </Modal>
        </>
    );
};

export default Delete;