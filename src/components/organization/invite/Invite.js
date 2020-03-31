import React, { useState } from 'react';

import InputField from 'components/UI/inputField/InputField';
import Dropdown from 'components/UI/dropdown/Dropdown';
import Button from 'components/UI/button/Button';
import Card from 'components/UI/card/Card';

import fetchClient from 'fetchClient';
import { useStore } from 'context';
import config from 'config';

import styling from './Invite.module.scss';

const Invite = ({ tabHandler }) => {
    const [store, dispatch] = useStore();
    
    const [{ firstName, lastName, email, role, isLoading, errorMessage }, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        isLoading: false,
        errorMessage: ''
    });
    
    
    /**
     * Invites a new user with the provided data.
     * @returns {Promise<void>}
     */
    const inviteUser = async () => {
        try {
            setState(prevState => ({ ...prevState, isLoading: true, errorMessage: '' }));
            
            const res = await fetchClient('inviteUser', { firstName, lastName, email, role });
            
            const updatedTeam = [...store.team, res];
            
            setTimeout(() => dispatch({ type: 'update', payload: { team: updatedTeam } }), 800);
            
            tabHandler('team');
            
        } catch (error) {
            console.error(error);
            setState(prevState => ({ ...prevState, isLoading: false, errorMessage: error.message }));
        }
    };
    
    
    /**
     * Handles input field changes.
     * @param name {string} name of the input field
     * @param value {string} text that was typed into the input field
     */
    const changeHandler = ({ target: { name, value } }) => {
        setState(prevState => ({ ...prevState, [name]: value }));
    };
    
    
    /**
     * Handles changes of the dropdown.
     * @param value {string} the selected value
     */
    const dropdownHandler = (value) => {
        setState(prevState => ({ ...prevState, role: value }));
    };
    
    
    const availableRoles = [{ key: 'User', value: 'user', id: 'user' }, { key: 'admin', value: 'admin', id: 'admin' }];
    
    const inputIsValid = firstName && lastName && role && config.regex.email.test(email);
    
    
    return (
        <Card>
            <div className={styling.error} hidden={!errorMessage}>{errorMessage}</div>
            
            <div className={styling.row}>
                <div className={styling.cell}>
                    <h6>First Name</h6>
                    
                    <InputField
                        name='firstName'
                        value={firstName}
                        onChange={changeHandler}
                        placeholder='First Name'
                        test={config.regex.notEmpty}
                        autoFocus
                    />
                </div>
                
                <div className={styling.cell}>
                    <h6>Last Name</h6>
                    
                    <InputField
                        name='lastName'
                        value={lastName}
                        onChange={changeHandler}
                        placeholder='Last Name'
                        test={config.regex.notEmpty}
                    />
                </div>
            </div>
            
            <div className={styling.row}>
                <div className={styling.cell}>
                    <h6>Email Address</h6>
                    
                    <InputField
                        name='email'
                        value={email}
                        onChange={changeHandler}
                        placeholder='Email Address'
                        test={config.regex.email}
                    />
                </div>
                
                <div className={styling.cell}>
                    <h6>Role</h6>
                    
                    <Dropdown
                        items={availableRoles}
                        selected={role}
                        label='Select Role'
                        changeHandler={dropdownHandler}
                        type='thin'
                    />
                </div>
            </div>
            
            <div className={styling.button}>
                <Button onClick={inviteUser} disabled={!inputIsValid || isLoading}>Invite</Button>
            </div>
        </Card>
    );
};

export default Invite;