import React from 'react';

import Stepper from 'components/UI/stepper/Stepper';
import Adapter from 'components/UI/adapter/Adapter';
import Button from 'components/UI/button/Button';
import Modal from 'components/UI/modal/Modal';

import { useStore } from 'context';

import styling from './Services.module.scss';

const Services = ({ history }) => {
    const [store] = useStore();
    
    return (
        <>
            <Stepper steps={['services']} />
            
            <section className={styling.header}>
                <div>
                    <h5>{store.organization.name}</h5>
                    <h1>All Services</h1>
                </div>
                
                <Button>New Service</Button>
            </section>
            
            <section className={styling.services}>
                {store.services.map(service => (
                    <div
                        key={service.id}
                        className={styling.service}
                        onClick={() => history.push('/services/' + service.id)}
                    >
                        <Adapter type={service.type} size='large' />
                        
                        <div>{service.name}</div>
                        
                        <p>{service.description}</p>
                    </div>
                ))}
            </section>
            
            <Modal></Modal>
        </>
    );
};

export default Services;