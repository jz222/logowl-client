import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { PrivacyPolicy, TermsAndConditions } from 'components/UI/links/Links';
import InputField from 'components/UI/inputField/InputField';
import Checkbox from 'components/UI/checkbox/Checkbox';
import Spinner from 'components/UI/spinner/Spinner';
import Button from 'components/UI/button/Button';
import Menu from 'components/layout/menu/Menu';

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
        givenConsent: config.environment.isSelfHosted,
        isLoading: true,
        error: ''
    });
    
    const { currentStep, organizationName, firstName, lastName, email, password, givenConsent, isLoading, error } = state;
    
    
    /**
     * Handles input field changes.
     * @param name {string} name of the input field
     * @param value {string} text that was typed in into the input field
     */
    const changeHandler = ({ target: { name, value } }) => {
        setState(prevState => ({ ...prevState, [name]: value }));
    };
    
    
    /**
     * Toggles the consent checkbox.
     */
    const consentToggle = () => {
        setState(prevState => ({ ...prevState, givenConsent: !prevState.givenConsent }));
    };
    
    
    /**
     * Creates a new organization.
     * @returns {Promise<void>}
     */
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
            
            await fetchClient('setup', payload);
            
            setState(prevState => ({ ...prevState, isLoading: false }));
            
        } catch (error) {
            console.log(error);
            setState(prevState => ({ ...prevState, isLoading: false, error: error.message }));
        }
    };
    
    
    /**
     * Handles step changes.
     * @param step
     */
    const stepHandler = (step) => {
        if (currentStep + step === 2) {
            setupHandler();
        }
        
        setState(prevState => ({ ...prevState, currentStep: prevState.currentStep + step }));
    };
    
    
    // Determines if the current step is valid.
    const stepIsValid = (
        (currentStep === 0 && config.regex.notEmpty.test(organizationName)) ||
        (currentStep === 1 &&
            config.regex.notEmpty.test(firstName) &&
            config.regex.notEmpty.test(lastName) &&
            config.regex.email.test(email) &&
            config.regex.password.test(password) &&
            givenConsent
        )
    );
    
    
    // Available steps
    const steps = ['Organization', 'User', 'Get Started'];
    
    
    // Organization step
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
    
    
    // User step
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
                    
                    <span className={config.regex.password.test(password) ? styling.passwordNoticeValid : styling.passwordNotice}>
                        Minimum 8-15 lower case, special characters and numbers
                    </span>
                </div>
            </div>
            
            <div className={styling.consent} hidden={config.environment.isSelfHosted}>
                <Checkbox id='consentBox' checked={givenConsent} changeHandler={consentToggle} />
                
                <p>
                    I confirm that I have read, understood and accepted the <PrivacyPolicy /> and <TermsAndConditions />.
                </p>
            </div>
        </div>
    );
    
    
    // Spinner
    const loading = (
        <div className={styling.loading}>
            <Spinner invert />
            <div>creating workspace</div>
        </div>
    );
    
    
    // Success message
    const success = (
        <div className={styling.success}>
            <h2>Ready to go!</h2>
            <h5>New workspace {organizationName} set up successfully</h5>
            
            <Button onClick={() => history.push('/errors')}>Get Started</Button>
        </div>
    );
    
    
    // Error message
    const failure = (
        <div className={styling.failure}>
            <h2>Something went wrong</h2>
            <h5>Failed to create a new organization</h5>
            
            <span>{error}</span>
        </div>
    );
    
    
    return (
        <>
            <Menu>
                <ul>
                    <li><Link to='/auth/signin'>Sign In</Link></li>
                </ul>
            </Menu>
            
            <main>
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
                        <Button color='light' onClick={() => stepHandler(-1)} hidden={currentStep !== 1}>
                            Back
                        </Button>
                        
                        <Button onClick={() => stepHandler(1)} disabled={!stepIsValid} hidden={currentStep === 2}>
                            Next
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Setup;

