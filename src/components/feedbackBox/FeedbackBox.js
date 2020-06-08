import React, { useEffect, useRef, useState } from 'react';

import Button from 'components/UI/button/Button';

import { useStore } from 'context';
import config from 'config';

import styling from './FeedbackBox.module.scss';

const FeedbackBox = () => {
    // State
    const [store] = useStore();
    const [{ open, message }, setState] = useState({
        open: false,
        message: ''
    });
    
    // Ref
    const boxRef = useRef({});
    
    
    /**
     * Removes the feedback box.
     * @param tagName {string} name of the element that was clicked to remove the box
     */
    const close = ({ target: { tagName } }) => {
        boxRef.current.classList.add(styling.closed);
        
        if (tagName !== 'BUTTON') {
            localStorage.setItem('disable-feedback', 'true');
        }
        
        setTimeout(() => {
            setState(prevState => ({ ...prevState, open: false }));
        }, 2000);
    };
    
    
    /**
     * Handles input changes.
     * @param value {string} the text that was typed in into the text area
     */
    const changeHandler = ({ target: { value } }) => {
        setState(prevState => ({ ...prevState, message: value }));
    };
    
    
    /**
     * Submits the feedback
     * @returns {Promise<void>}
     */
    const submit = async () => {
        try {
            const opts = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            };
            
            await fetch(config.connectivity.feedbackURL, opts);
            
            localStorage.setItem('disable-feedback', 'true');
            
        } catch (error) {
            console.error(error);
        }
    };
    
    
    // Determines if the feedback box should be shown.
    useEffect(() => {
        const feedbackDisabled = localStorage.getItem('disable-feedback') !== null;
        
        if (store.organization.isSetUp && !feedbackDisabled) {
            setTimeout(() => {
                setState(prevState => ({ ...prevState, open: true }));
            }, 1000);
        }
    }, [store]);
    
    
    // Feedback box
    const box = (
        <div className={styling.box} ref={boxRef}>
            <h3>Anything missing?</h3>
            
            <p>Please let us know if you are missing something and we will try our best to make it happen!</p>
            
            <textarea
                placeholder='Enter your anonymous feedback...'
                onChange={changeHandler}
                value={message}
            />
            
            <div className={styling.controls}>
                <Button size='smaller' color='light' onClick={close}>Close</Button>
                <Button size='smaller' onClick={submit} disabled={!message}>Send</Button>
            </div>
            
            <span onClick={close}>never ask again</span>
        </div>
    );
    
    
    return open ? box : null;
};

export default FeedbackBox;