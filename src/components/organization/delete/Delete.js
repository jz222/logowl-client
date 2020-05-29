import React, { useState } from 'react';

import Confirmation from 'components/UI/confirmation/Confirmation';
import Button from 'components/UI/button/Button';
import Card from 'components/UI/card/Card';

import { useStore } from 'context';
import fetchClient from 'fetchClient';

import styling from './Delete.module.scss';

const Delete = ({ name, history }) => {
    const [, , setError] = useStore();
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
            console.error(error);
            setError(error);
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
            
            <Confirmation
                open={confirmVisibility}
                title={'Delete ' + name}
                message={`Please confirm that you want to delete the organization ${name} and all its data. Deleting an organization is permanent and can not be undone.`}
                confirmHandler={deleteOrganization}
                cancelHandler={toggleConfirmVisibility}
            />
        </>
    );
};

export default Delete;