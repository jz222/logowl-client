import React, { useState } from 'react';

import Button from 'components/UI/button/Button';
import Modal from 'components/UI/modal/Modal';
import Card from 'components/UI/card/Card';

import fetchClient from 'fetchClient';

import styling from './Delete.module.scss';

const Delete = ({ isOrganizationOwner, history }) => {
    const [confirmVisibility, setConfirmVisibility] = useState(false);
    
    /**
     * Toggles the modal visibility.
     */
    const toggleConfirmVisibility = () => {
        setConfirmVisibility(prevState => !prevState);
    };
    
    /**
     * Deletes the current user.
     * @returns {Promise<void>}
     */
    const deleteUser = async () => {
        try {
            const res = await fetchClient('deleteUserAccount');
            
            if (res.ok) {
                localStorage.clear();
                history.push('/auth/signin');
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    const caption = isOrganizationOwner ? 'You can not delete your account as organization owner' : 'Delete your user account';
    
    return (
        <>
            <Card>
                <div className={styling.row}>
                    <div className={styling.description}>
                        <h6>Delete</h6>
                        <p>{caption}</p>
                    </div>
                    
                    <Button size='smaller' onClick={toggleConfirmVisibility} disabled={isOrganizationOwner}>Delete</Button>
                </div>
            </Card>
            
            <Modal open={confirmVisibility} size='small'>
                <h3>Delete your account</h3>
                
                <p className={styling.caption}>
                    Please confirm that you want to delete your user account and all your data.
                    Deleting your account is permanent and can not be undone.
                </p>
                
                <div className={styling.controls}>
                    <Button size='smaller' color='light' onClick={toggleConfirmVisibility}>Cancel</Button>
                    <Button size='smaller' onClick={deleteUser}>Confirm</Button>
                </div>
            </Modal>
        </>
    );
};

export default Delete;