import React, { useRef, useState } from 'react';
import { FiHelpCircle, FiPlusCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

import Spinner from 'components/UI/spinner/Spinner';
import InputField from 'components/UI/inputField/InputField';

import fetchClient from 'fetchClient';
import { useStore } from 'context';
import config from 'config';
import etalon from 'etalon';

import styling from './Authentication.module.scss';

const Authentication = ({ history }) => {
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
            
            if (!res.jwt) {
                setState(prevState => ({ ...prevState, loading: false, error: res.message }));
                return;
            }
            
            dispatch({ type: 'update', payload: res });
            
            localStorage.setItem('access-pass', res.jwt);
            localStorage.setItem('expiration-time', res.expirationTime);
            
            nav.current.classList.add(styling.navExit);
            box.current.classList.add(styling.boxExit);
            
            document.title = 'Loggy Dashboard | ' + res.organization.name;
            
            setTimeout(() => history.push('/services'), 1500);
            
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
     * Starts the setup process.
     */
    const navigateToSetup = () => {
        history.push('/auth/setup');
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
    
    
    return (
        <>
            <nav className={styling.nav} ref={nav}>
                <div>
                    <span>LOGGY</span>
                </div>
            </nav>
            
            <main>
                <div className={styling.box} ref={box}>
                    <h1>{mode === 'signIn' ? 'Sign In' : 'Sign Up'}</h1>
                    <h4>{mode === 'signIn' ? 'Sign in with your credentials below' : 'Sign up a new account'}</h4>
                    
                    <p hidden={!error}>{error}</p>
                    
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
                            test={new RegExp(password)}
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
                        
                        <button
                            key='signInSubmit'
                            type='submit'
                            disabled={loading}
                            hidden={!signInDataValid()}
                        >
                            <Spinner hidden={!loading} />
                            <span>{loading ? 'Please wait' : 'Sign In'}</span>
                        </button>
                        
                        <button
                            key='signUpSubmit'
                            type='submit'
                            disabled={loading}
                            hidden={!signUpDataValid()}
                        >
                            <Spinner hidden={!loading} />
                            <span>{loading ? 'Please wait' : 'Sign Up'}</span>
                        </button>
                        
                        <span className={styling.passwordNotice} hidden={!showPasswordNotice()}>
                            12-20 lower case, upper case and special characters and numbers
                        </span>
                        
                        <div key='switchMode' className={styling.label} onClick={toggleMode}>
                            <FiHelpCircle />
                            <span>{mode === 'signUp' ? 'Sign in with an existing account' : 'Sign up a new account'}</span>
                        </div>
                        
                        <div key='createOrganization' className={styling.label} onClick={navigateToSetup}>
                            <FiPlusCircle />
                            <span>Create an organization</span>
                        </div>
                    </motion.form>
                </div>
            </main>
        </>
    );
};

export default Authentication;