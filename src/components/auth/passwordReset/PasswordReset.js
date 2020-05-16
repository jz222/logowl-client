import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import InputField from 'components/UI/inputField/InputField';
import { WideButton } from 'components/UI/button/Button';
import Menu from 'components/layout/menu/Menu';

import styling from './PasswordReset.module.scss';

const PasswordReset = () => {
    const [{ mode, email, requestLinkSent }, setState] = useState({
        mode: 'resetPassword',
        email: '',
        requestLinkSent: false
    });
    
    
    const changeHandler = ({ target: { name, value } }) => {
        setState(prevState => ({ ...prevState, [name]: value }));
    };
    
    
    const resetPassword = (
        <div className={styling.content}>
            <h1>Reset Password</h1>
            
            <h4>Enter your email address below.</h4>
            
            <div className={styling.success} hidden={!requestLinkSent}>Reset link was sent to your inbox</div>
            
            <InputField placeholder='Email' name='email' onChange={changeHandler} />
            
            <WideButton disabled={email === ''}>Send reset link</WideButton>
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
                {mode === 'resetPassword' ? resetPassword : null}
            </main>
        </>
    );
};

export default PasswordReset;