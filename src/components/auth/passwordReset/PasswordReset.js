import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import InputField from 'components/UI/inputField/InputField';
import { WideButton } from 'components/UI/button/Button';
import Menu from 'components/layout/menu/Menu';

import fetchClient from 'fetchClient';

import styling from './PasswordReset.module.scss';

const PasswordReset = ({ history }) => {
    const [{ mode, email, password, passwordRepeat, newPasswordSet, requestLinkSent }, setState] = useState({
        mode: history.location.pathname.includes('resetpassword') ? 'resetPassword' : 'setNewPassword',
        email: '',
        password: '',
        passwordRepeat: '',
        requestLinkSent: false,
        newPasswordSet: false
    });
    
    
    /**
     * Handles input field changes.
     * @param name {string} name of the input field
     * @param value {string} value that was entered into the input field
     */
    const changeHandler = ({ target: { name, value } }) => {
        setState(prevState => ({ ...prevState, [name]: value }));
    };
    
    
    /**
     * Sends a request to the server to generate a reset token.
     * @returns {Promise<void>}
     */
    const resetPassword = async () => {
        try {
            await fetchClient('resetPassword', { email });
            
            setState(prevState => ({ ...prevState, requestLinkSent: true }));
            
        } catch (error) {
            console.error(error);
        }
    };
    
    
    // Password reset content
    const resetPasswordContent = (
        <div className={styling.content}>
            <h1>Reset Password</h1>
            
            <h4>Enter your email address below.</h4>
            
            <div className={styling.success} hidden={!requestLinkSent}>Reset link was sent to your inbox</div>
            
            <InputField
                placeholder='Email'
                name='email'
                value={email}
                onChange={changeHandler}
            />
            
            <WideButton onClick={resetPassword} disabled={email === ''}>Send reset link</WideButton>
        </div>
    );
    
    
    // Set new password content
    const setNewPasswordContent = (
        <div className={styling.content}>
            <h1>Set new Password</h1>
            
            <h4>Enter and repeat new password</h4>
            
            <div className={styling.success} hidden={!newPasswordSet}>New password was set</div>
            
            <InputField
                placeholder='Password'
                name='password'
                value={password}
                onChange={changeHandler}
            />
            
            <InputField
                placeholder='Repeat Password'
                name='passwordRepeat'
                value={passwordRepeat}
                onChange={changeHandler}
            />
            
            <WideButton>Set new Password</WideButton>
        </div>
    );
    
    
    return (
        <>
            <Menu>
                <ul>
                    <li><Link to='/auth/signin'>Sign In</Link></li>
                    <li><Link to='/auth/setup'>New Organization</Link></li>
                </ul>
            </Menu>
            
            <main>
                {mode === 'resetPassword' ? resetPasswordContent : setNewPasswordContent}
            </main>
        </>
    );
};

export default PasswordReset;