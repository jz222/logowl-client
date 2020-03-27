import React, {useState} from 'react';

import Button from 'components/UI/button/Button';
import Modal from 'components/UI/modal/Modal';
import Card from 'components/UI/card/Card';

import fetchClient from 'fetchClient';

import styling from './Delete.module.scss';

const Delete = ({ id, name }) => {
    const [confirmVisibility, setConfirmVisibility] = useState(false);
    
    const toggleConfirmVisibility = () => {
        setConfirmVisibility(prevState => !prevState);
    };
    
    const deleteOrganization = async () => {
        try {
        } catch(error) {}
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
                    <Button size='smaller'>Confirm</Button>
                </div>
            </Modal>
        </>
    );
};

export default Delete;