import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Placeholder from 'components/UI/placeholder/Placeholder';
import InputField from 'components/UI/inputField/InputField';
import Dropdown from 'components/UI/dropdown/Dropdown';
import Stepper from 'components/UI/stepper/Stepper';
import Adapter from 'components/UI/adapter/Adapter';
import Button from 'components/UI/button/Button';
import Modal from 'components/UI/modal/Modal';

import fetchClient from 'fetchClient';
import { useStore } from 'context';
import config from 'config';
import etalon from 'etalon';

import styling from './Services.module.scss';

const Services = ({ history }) => {
    const [store, dispatch, setError] = useStore();
    
    const [{ modalVisible, name, type, description }, setState] = useState({
        isLoading: false,
        modalVisible: false,
        name: '',
        type: '',
        description: ''
    });
    
    
    /**
     * Opens the modal.
     */
    const openModal = () => setState(prevState => ({ ...prevState, modalVisible: true }));
    
    
    /**
     * Closes the modal.
     */
    const closeModal = () => setState(prevState => ({
        ...prevState,
        modalVisible: false,
        name: '',
        type: '',
        description: ''
    }));
    
    
    /**
     * Handles input field changes.
     * @param name {string} name of the input field
     * @param value {string} value that was typed in into the input field
     */
    const changeHandler = ({ target: { name, value } }) => {
        setState(prevState => ({ ...prevState, [name]: value }));
    };
    
    
    /**
     * Handles dropdown changes.
     * @param value {string} selected type
     */
    const selectHandler = (value) => setState(prevState => ({ ...prevState, type: value }));
    
    
    /**
     * Creates a new service.
     * @returns {Promise<void>}
     */
    const createService = async () => {
        try {
            setState(prevState => ({ ...prevState, isLoading: true, modalVisible: false }));
            
            const res = await fetchClient('createService', { name, type, description });
            
            const services = [...store.services, res];
            
            setState(prevState => ({ ...prevState, isLoading: false }));
            dispatch({ type: 'update', payload: { services } });
            
        } catch (error) {
            console.error(error);
            setState(prevState => ({ ...prevState, isLoading: false }));
            setError(error);
        }
    };
    
    
    /**
     * Fetches all user data and updates global store.
     * @type {(...args: any[]) => any}
     */
    const fetchAllServices = useCallback(async () => {
        try {
            const res = await fetchClient('getUser');
            
            dispatch({ type: 'update', payload: res });
            
        } catch (error) {
            console.error(error);
            setError(error);
        }
    }, [dispatch, setError]);
    
    
    useEffect(() => {
        fetchAllServices();
    }, [fetchAllServices]);
    
    
    // All available types with icon
    const types = config.availableTypes.map(type => {
        const item = (
            <>
                <Adapter type={type.name} size='small' />
                {type.label}
            </>
        
        );
        
        return { key: item, value: type.name, id: type.name };
    });
    
    
    const inputIsValid = name && type && config.regex.description.test(description);
    
    
    // Reverse the order so that the latest services come first.
    const sortedServices = [...store.services].reverse();
    
    const services = (
        <section className={styling.services}>
            {sortedServices.map(service => (
                <motion.div
                    key={service.id}
                    className={styling.service}
                    onClick={() => history.push('/services/' + service.id)}
                    layoutTransition={etalon.transition}
                >
                    <Adapter type={service.type} size='large' />
                    
                    <div>{service.name}</div>
                    
                    <p>{service.description}</p>
                </motion.div>
            ))}
        </section>
    );
    
    
    const placeholder = (
        <Placeholder>
            <h4>You have no services yet</h4>
            
            <p>Create your first service and get started</p>
            
            <Button onClick={openModal}>New Service</Button>
        </Placeholder>
    );
    
    
    return (
        <>
            <Stepper steps={['services']} />
            
            <section className={styling.header}>
                <div>
                    <h5>{store.organization.name}</h5>
                    <h1>All Services</h1>
                </div>
                
                <Button onClick={openModal}>New Service</Button>
            </section>
            
            {!!store.services.length && services}
            {!store.services.length && placeholder}
            
            <Modal open={modalVisible}>
                <h3 className={styling.title}>Create a new Service</h3>
                
                <div className={styling.split}>
                    <div className={styling.cell}>
                        <h6 className={styling.label}>Name</h6>
                        
                        <InputField
                            name='name'
                            value={name}
                            placeholder='Service Name'
                            onChange={changeHandler}
                            test={config.regex.notEmpty}
                        />
                    </div>
                    
                    <div className={styling.cell}>
                        <h6 className={styling.label}>Type</h6>
                        
                        <Dropdown
                            items={types}
                            selected={type}
                            label='Select Type'
                            changeHandler={selectHandler}
                            type='thin'
                        />
                    </div>
                </div>
                
                <h6 className={styling.label}>Description</h6>
                <InputField
                    name='description'
                    value={description}
                    placeholder='Service Description'
                    onChange={changeHandler}
                    test={config.regex.description}
                />
                
                <div className={styling.controls}>
                    <Button size='smaller' color='light' onClick={closeModal}>Cancel</Button>
                    <Button size='smaller' onClick={createService} disabled={!inputIsValid}>Create</Button>
                </div>
            </Modal>
        </>
    );
};

export default Services;