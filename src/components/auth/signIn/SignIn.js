import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

import Spinner from 'components/UI/spinner/Spinner';
import InputField from 'components/UI/inputField/InputField';

import fetchClient from 'fetchClient';
import { useStore } from 'context';

import styling from './SignIn.module.scss';

const SignIn = ({ history }) => {
    const { 1: dispatch } = useStore();
    
    const [{ loading, email, password, error }, setState] = useState({
        loading: false,
        email: '',
        password: '',
        error: ''
    });
    
    const nav = useRef({});
    const box = useRef({});
    
    const changeHandler = ({ target: { name, value } }) => {
        setState(prevState => ({ ...prevState, [name]: value }));
    };
    
    const enterHandler = (e) => {
        if (e.key === 'Enter' && (email.length < 4 || password.length < 4)) {
            e.preventDefault();
        }
    };
    
    const signIn = async (e) => {
        try {
            e.persist();
            e.preventDefault();
            
            setState(prevState => ({ ...prevState, loading: true }));
            
            const res = await fetchClient('signIn', { email, password });
            
            if (!res.jwt) {
                setState(prevState => ({ ...prevState, loading: false, error: res.message }));
                return;
            }
            
            dispatch({ type: 'update', payload: res });
            
            localStorage.setItem('access-pass', res.jwt);
            localStorage.setItem('expiration-time', res.expirationTime);
            
            nav.current.classList.add(styling.navExit);
            box.current.classList.add(styling.boxExit);
            
            setTimeout(() => history.push('/services'), 1500);
            
        } catch (error) {
            setState(prevState => ({ ...prevState, loading: false, error: error.message }));
        }
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
                    <h1>Login</h1>
                    <h4>Login with your credentials below</h4>
                    
                    <p hidden={!error}>{error}</p>
                    
                    <motion.form layoutTransition={{ type: 'spring', damping: 25, stiffness: 500 }} onSubmit={signIn}>
                        <InputField
                            key='email'
                            name='email'
                            autoComplete='off'
                            autoFocus
                            value={email}
                            onChange={changeHandler}
                            onKeyPress={enterHandler}
                            placeholder='Email'
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
                            hidden={email.length < 4}
                        />
                        
                        <button
                            key='submit'
                            type='submit'
                            disabled={loading}
                            hidden={password.length < 4 || email.length < 4}
                        >
                            <Spinner hidden={!loading} />
                            <span>{loading ? 'Please wait' : 'Sign In'}</span>
                        </button>
                    </motion.form>
                </div>
            </main>
        </>
    );
};

export default SignIn;