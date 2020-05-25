import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import InputField from 'components/UI/inputField/InputField';
import { WideButton } from 'components/UI/button/Button';
import Spinner from 'components/UI/spinner/Spinner';
import Menu from 'components/layout/menu/Menu';

import fetchClient from 'fetchClient';
import { useStore } from 'context';
import config from 'config';
import etalon from 'etalon';
import utils from 'utils';

import styling from './Authentication.module.scss';

const Authentication = ({ history, location }) => {
    const { 1: dispatch } = useStore();
    
    const [{ mode, loading, email, password, passwordRepeat, inviteCode, error }, setState] = useState({
        mode: history.location.pathname.includes('signup') ? 'signUp' : 'signIn',
        loading: false,
        email: '',
        password: '',
        passwordRepeat: '',
        inviteCode: new URLSearchParams(history.location.search).get('code') || '',
        error: ''
    });
    
    const nav = useRef({});
    const box = useRef({});
    
    
    /**
     * Handles input field changes.
     * @param name {string} name of the input field
     * @param value {string} text that was typed in into the input field
     */
    const changeHandler = ({ target: { name, value } }) => {
        setState(prevState => ({ ...prevState, [name]: value }));
    };
    
    
    /**
     * Prevents submitting the form if enter was clicked but the provided data is invalid.
     * @param e
     */
    const enterHandler = (e) => {
        if (e.key === 'Enter' && ((mode === 'signIn' && !signInDataValid()) || (mode === 'signUp' && !signUpDataValid()))) {
            e.preventDefault();
        }
    };
    
    
    /**
     * Handles form submissions.
     * @param e {object} event object
     * @returns {Promise<void>}
     */
    const submit = async (e) => {
        try {
            e.persist();
            e.preventDefault();
            
            setState(prevState => ({ ...prevState, loading: true }));
            
            const payload = {
                email,
                password,
                ...(mode === 'signUp' && { inviteCode })
            };
            
            const res = await fetchClient(mode, payload);
            
            dispatch({ type: 'update', payload: res });
            
            localStorage.setItem('access-pass', res.accessPass);
            localStorage.setItem('expiration-time', res.expirationTime);
            
            utils.expirationHandler(history, res.expirationTime);
            
            box.current.classList.add(styling.boxExit);
            nav.current.classList.add(styling.navExit);
            
            document.title = 'Log Owl Dashboard | ' + res.organization.name;
            
            setTimeout(() => history.push('/services'), 1000);
            
        } catch (error) {
            setState(prevState => ({ ...prevState, loading: false, error: error.message }));
        }
    };
    
    
    /**
     * Toggles the mode between sign in and sign up.
     */
    const toggleMode = () => {
        const newMode = (mode === 'signUp') ? 'signIn' : 'signUp';
        
        setState(prevState => ({
            ...prevState,
            mode: newMode,
            email: '',
            password: '',
            passwordRepeat: '',
            error: ''
        }));
        
        history.push('/auth/' + newMode.toLowerCase());
    };
    
    
    /**
     * Validates the provided data for signing in.
     * @returns {boolean} if the provided data is valid
     */
    const signInDataValid = () => {
        return mode === 'signIn' && password.length > 4 && email.length > 4;
    };
    
    
    /**
     * Validates the provided data for signing up.
     * @returns {boolean|boolean} if the provided data is valid
     */
    const signUpDataValid = () => {
        const allDataProvided = email.length > 4 && password.length > 4 && passwordRepeat.length > 4 && inviteCode;
        const passwordIsValid = config.regex.password.test(password);
        const passwordsMatch = password === passwordRepeat;
        
        return allDataProvided && passwordIsValid && passwordsMatch;
    };
    
    
    /**
     * Validates is a password notice should be shown during sign up.
     * @returns {boolean} determines if the notice should be shown
     */
    const showPasswordNotice = () => {
        return mode === 'signUp' && email.length > 4 && !config.regex.password.test(password);
    };
    
    
    const accessPass = localStorage.getItem('access-pass');
    const expirationTime = localStorage.getItem('expiration-time');
    
    
    if (accessPass && expirationTime && new Date(parseInt(expirationTime)) > new Date()) {
        history.push('/services');
    }
    
    
    // Escape invalid characters in password
    // eslint-disable-next-line
    const passwordMatchRegex = password.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    
    
    return (
        <>
            <Menu reference={nav}>
                <ul>
                    <li onClick={toggleMode}>{mode === 'signIn' ? 'Sign Up' : 'Sign In'}</li>
                    <li><Link to='/auth/setup'>New Organization</Link></li>
                </ul>
            </Menu>
            
            <main>
                <div className={styling.box} ref={box}>
                    <h1>{mode === 'signIn' ? 'Sign In' : 'Sign Up'}</h1>
                    <h4>{mode === 'signIn' ? 'Sign in with your credentials below' : 'Sign up a new account'}</h4>
                    
                    <p className={styling.error} hidden={!error}>{error}</p>
                    
                    <p className={styling.sessionExpired} hidden={!location.expired}>
                        Your session has been expired. Sign in to continue.
                    </p>
                    
                    <motion.form layoutTransition={etalon.transition} onSubmit={submit}>
                        <InputField
                            key='email'
                            name='email'
                            autoComplete='off'
                            value={email}
                            onChange={changeHandler}
                            onKeyPress={enterHandler}
                            placeholder='Email'
                            test={mode === 'signUp' ? config.regex.email : ''}
                            autoFocus
                        />
                        
                        <InputField
                            key='password'
                            type='password'
                            name='password'
                            value={password}
                            onChange={changeHandler}
                            onKeyPress={enterHandler}
                            autoComplete='current-password'
                            placeholder='Password'
                            test={mode === 'signUp' ? config.regex.password : ''}
                            hidden={email.length < 4}
                        />
                        
                        <InputField
                            key='passwordRepeat'
                            name='passwordRepeat'
                            type='password'
                            value={passwordRepeat}
                            onChange={changeHandler}
                            onKeyPress={enterHandler}
                            autoComplete='current-password'
                            placeholder='Repeat Password'
                            test={new RegExp(passwordMatchRegex)}
                            hidden={mode !== 'signUp' || !config.regex.password.test(password)}
                        />
                        
                        <InputField
                            key='inviteCode'
                            name='inviteCode'
                            value={inviteCode}
                            onChange={changeHandler}
                            onKeyPress={enterHandler}
                            autoComplete='off'
                            placeholder='Invite Code'
                            hidden={mode !== 'signUp' || (mode === 'signUp' && (!password || password !== passwordRepeat))}
                        />
                        
                        <WideButton
                            key='signInSubmit'
                            type='submit'
                            disabled={loading}
                            hidden={!signInDataValid()}
                        >
                            <Spinner hidden={!loading} />
                            <span>{loading ? 'Please wait' : 'Sign In'}</span>
                        </WideButton>
                        
                        <WideButton
                            key='signUpSubmit'
                            type='submit'
                            disabled={loading}
                            hidden={!signUpDataValid()}
                        >
                            <Spinner hidden={!loading} />
                            <span>{loading ? 'Please wait' : 'Sign Up'}</span>
                        </WideButton>
                        
                        <span className={styling.passwordNotice} hidden={!showPasswordNotice()}>
                            12-20 lower case, upper case and special characters and numbers
                        </span>
                        
                        <div className={styling.resetPassword} hidden={mode === 'signUp'}>
                            <Link to='/auth/resetpassword'>Forgot your password?</Link>
                        </div>
                    </motion.form>
                </div>
            </main>
        </>
    );
};

export default Authentication;