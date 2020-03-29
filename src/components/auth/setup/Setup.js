import React, { useState } from 'react';

import InputField from 'components/UI/inputField/InputField';
import Spinner from 'components/UI/spinner/Spinner';
import Button from 'components/UI/button/Button';

import fetchClient from 'fetchClient';
import config from 'config';

import styling from './Setup.module.scss';

const Setup = ({ history }) => {
    const [state, setState] = useState({
        currentStep: 0,
        organizationName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        isLoading: true,
        error: ''
    });
    
    const { currentStep, organizationName, firstName, lastName, email, password, isLoading, error } = state;
    
    const changeHandler = ({ target: { name, value } }) => {
        setState(prevState => ({ ...prevState, [name]: value }));
    };
    
    const setupHandler = async () => {
        try {
            const payload = {
                organization: {
                    name: organizationName
                },
                user: {
                    firstName,
                    lastName,
                    email,
                    password
                }
            };
            
            const res = await fetchClient('setup', payload);
            
            if (res.code !== 200) {
                setState(prevState => ({ ...prevState, isLoading: false, error: res.message }));
            } else {
                setState(prevState => ({ ...prevState, isLoading: false }));
            }
            
        } catch (error) {
            console.log(error);
            setState(prevState => ({ ...prevState, isLoading: false, error: error.message }));
        }
    };
    
    const stepHandler = (step) => {
        if (currentStep + step === 2) {
            setupHandler();
        }
        
        setState(prevState => ({ ...prevState, currentStep: prevState.currentStep + step }));
    };
    
    const stepIsValid = (
        (currentStep === 0 && config.regex.notEmpty.test(organizationName)) ||
        (currentStep === 1 &&
            config.regex.notEmpty.test(firstName) &&
            config.regex.notEmpty.test(lastName) &&
            config.regex.email.test(email) &&
            config.regex.password.test(password)
        )
    );
    
    const steps = ['Organization', 'User', 'Get Started'];
    
    const organization = (
        <div className={styling.organization}>
            <h2>Organization</h2>
            <h5>Please enter the name of your organization</h5>
            
            <InputField
                name='organizationName'
                onChange={changeHandler}
                value={organizationName}
                placeholder='Organization name'
                test={config.regex.notEmpty}
                autoFocus
            />
        </div>
    );
    
    const user = (
        <div className={styling.user}>
            <h2>User Account</h2>
            <h5>Please fill out the fields below</h5>
            
            <div className={styling.row}>
                <InputField
                    name='firstName'
                    onChange={changeHandler}
                    value={firstName}
                    placeholder='First name'
                    test={config.regex.notEmpty}
                />
                
                <InputField
                    name='lastName'
                    onChange={changeHandler}
                    value={lastName}
                    placeholder='Last name'
                    test={config.regex.notEmpty}
                />
            </div>
            
            <div className={styling.row}>
                <InputField
                    name='email'
                    onChange={changeHandler}
                    value={email}
                    placeholder='Email'
                    test={config.regex.email}
                />
                
                <div>
                    <InputField
                        name='password'
                        type='password'
                        onChange={changeHandler}
                        value={password}
                        placeholder='Password'
                        test={config.regex.password}
                    />
                    
                    <span>At least 12 upper and lower case characters and one of #?!@$%^&*-</span>
                </div>
            </div>
        </div>
    );
    
    const loading = (
        <div className={styling.loading}>
            <Spinner invert />
            <div>creating workspace</div>
        </div>
    );
    
    const success = (
        <div className={styling.success}>
            <h2>Ready to go!</h2>
            <h5>New workspace {organizationName} set up successfully</h5>
            
            <Button onClick={() => history.push('/errors')}>Get Started</Button>
        </div>
    );
    
    const failure = (
        <div className={styling.failure}>
            <h2>Something went wrong</h2>
            <h5>Failed to create a new organization</h5>
            
            <span>{error}</span>
        </div>
    );
    
    return (
        <div className={styling.wrapper}>
            <div className={styling.box}>
                <div className={styling.stepper}>
                    {steps.map((step, i) => {
                        const highlighted = (currentStep >= i) ? styling.highlighted : '';
                        
                        return (
                            <div className={styling.step} key={step}>
                                <div className={styling.bubble + ' ' + highlighted}>{i + 1}</div>
                                <div>{step}</div>
                            </div>
                        );
                    })}
                </div>
                
                <hr />
                
                {(currentStep === 0) && organization}
                {(currentStep === 1) && user}
                {(currentStep === 2 && isLoading) && loading}
                {(currentStep === 2 && !isLoading && !error) && success}
                {(currentStep === 2 && !isLoading && error) && failure}
                
                <div className={styling.navigation}>
                    <Button
                        color='light'
                        onClick={() => stepHandler(-1)}
                        hidden={currentStep !== 1}
                    >
                        Back
                    </Button>
                    
                    <Button
                        onClick={() => stepHandler(1)}
                        disabled={!stepIsValid}
                        hidden={currentStep === 2}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Setup;

